import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { useFormikContext } from 'formik';
import { LPB_LOGO_UPLOAD_POLICY_URL } from '../../../types/constants';
import { Values } from '../../../containers/consumerOnboarding/ProductionAccess';
import './LogoUploadField.scss';

interface AwsSigv4UploadEntity {
  acl: string;
  bucketName: string;
  contentType: string;
  key: string;
  logoUrls: string[];
  policy: string;
  resizeTriggerUrls: string[];
  s3RegionEndpoint: string;
  xAmzAlgorithm: string;
  xAmzCredential: string;
  xAmzDate: string;
  xAmzExpires: string;
  xAmzSecurityToken: string;
  xAmzSignature: string;
}

export interface LogoUploadProps {
  className?: string;
}

export const LogoUploadField = ({ className }: LogoUploadProps): JSX.Element => {
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoData, setLogoData] = useState<string | null>(null);
  const fileInput = useRef<HTMLInputElement>(null);
  const formik = useFormikContext<Values>();

  useEffect(() => {
    if (logoFile) {
      const reader = new FileReader();
      reader.onloadend = (): void => {
        setLogoData(reader.result as string);
      };
      reader.readAsDataURL(logoFile);
    }
  }, [logoFile]);

  const getUploadEntity = async (
    fileName: string,
    fileType: string,
  ): Promise<AwsSigv4UploadEntity> => {
    const response = await fetch(LPB_LOGO_UPLOAD_POLICY_URL, {
      body: JSON.stringify({ fileName, fileType }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return (await response.json()) as Promise<AwsSigv4UploadEntity>;
  };

  const uploadToS3 = async (file: File, uploadEntity: AwsSigv4UploadEntity): Promise<void> => {
    const formData = new FormData();
    formData.append('acl', uploadEntity.acl);
    formData.append('Content-Type', uploadEntity.contentType);
    formData.append('key', uploadEntity.key);
    formData.append('Policy', uploadEntity.policy);
    formData.append('X-Amz-Algorithm', uploadEntity.xAmzAlgorithm);
    formData.append('X-Amz-Credential', uploadEntity.xAmzCredential);
    formData.append('X-Amz-Date', uploadEntity.xAmzDate);
    formData.append('X-Amz-Expires', uploadEntity.xAmzExpires);
    formData.append('X-Amz-Security-Token', uploadEntity.xAmzSecurityToken);
    formData.append('X-Amz-Signature', uploadEntity.xAmzSignature);
    formData.append('file', file);

    try {
      const response = await fetch(
        `https://${uploadEntity.bucketName}.${uploadEntity.s3RegionEndpoint}`,
        {
          body: formData,
          method: 'POST',
        },
      );

      if (!response.ok) {
        throw new Error('Upload to S3 failed');
      }

      setUploadStatus('Upload successful');
    } catch (error: unknown) {
      setUploadStatus('Upload failed');
    }
  };

  const handleFileChange = async (): Promise<void> => {
    if (fileInput.current?.files?.length) {
      const file = fileInput.current.files[0];

      setUploadStatus('Uploading...');

      try {
        const uploadEntity = await getUploadEntity(file.name, file.type);
        await uploadToS3(file, uploadEntity);
        await formik.setFieldValue('logoIcon', uploadEntity.logoUrls[0]);
        await formik.setFieldValue('logoLarge', uploadEntity.logoUrls[1]);
      } catch (error: unknown) {
        await formik.setFieldValue('logoIcon', '');
        await formik.setFieldValue('logoLarge', '');
        setUploadStatus('Upload failed');
      }

      // Set the logo file so we can preview it
      setLogoFile(file);
    }
  };

  return (
    <div
      className={classNames(
        'vads-u-background-color--gray-lightest vads-u-padding--2 vads-u-margin-top--4 medium-screen:vads-l-col--10',
        { 'vads-u-margin-bottom--9': !logoData },
        className,
      )}
    >
      <div>
        <label className="vads-u-margin--0 upload-button" htmlFor="logo_upload">
          Upload logo
        </label>

        <input
          className="vads-u-display--none"
          type="file"
          id="logo_upload"
          name="logo_upload"
          accept="image/png, image/jpeg"
          ref={fileInput}
          onChange={handleFileChange}
        />

        <p className="vads-u-color--gray vads-u-margin--0 vads-u-margin-bottom--2">
          Supported file types: PNG, JPEG; 10 MB max
        </p>
      </div>

      {logoData ? <img src={logoData} alt="Logo preview" /> : null}
      {uploadStatus ? <span>{uploadStatus}</span> : null}
    </div>
  );
};
