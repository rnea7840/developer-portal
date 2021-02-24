import React from 'react';
import { DropzoneOptions, FileError, FileWithPath, useDropzone } from 'react-dropzone';
import { FileUploadProgressBar } from './FileUploadProgressBar';
import './DragAndDrop.scss';

export interface DragAndDropProps {
  label: string;
  name: string;
  acceptedFileTypes?: string | string[];
  maxFileSize?: number;
  multiple?: boolean;
  required?: boolean;
}

const activeStyle = { backgroundColor: '#e1f3f8' };
const acceptStyle = { backgroundColor: '#e1f3f8' };
const rejectStyle = { backgroundColor: '#e59393' };

const setDropzoneOptions = (options = {}): DropzoneOptions => {
  const defaultOptions = {
    accept: '',
    maxSize: Infinity,
    minSize: 0,
  };

  const { accept, maxSize, minSize } = {
    ...defaultOptions,
    ...options,
  };

  return {
    accept,
    maxSize,
    minSize,
  };
};

const DragAndDrop = ({
  label,
  name,
  acceptedFileTypes,
  maxFileSize,
  multiple = true,
  required = false,
}: DragAndDropProps): JSX.Element => {
  const dropzoneOptions = setDropzoneOptions({ accept: acceptedFileTypes, maxSize: maxFileSize });

  const {
    acceptedFiles,
    fileRejections,
    getRootProps,
    getInputProps,
    isDragAccept,
    isDragActive,
    isDragReject,
  } = useDropzone({ ...dropzoneOptions });

  const [progress, setProgress] = React.useState(0);
  const fileAcceptedItems = (acceptedFiles as FileWithPath[]).map(({ path, size }) => (
    <FileUploadProgressBar key={path} label={path as string} size={size} value={progress} />
  ));

  const fileRejectionItems = fileRejections.map(
    ({ file, errors }: { file: FileWithPath; errors: FileError[] }) => (
      <FileUploadProgressBar
        key={file.path}
        errors={errors}
        label={file.path as string}
        size={file.size}
        value={progress}
      />
    ),
  );

  const style: React.CSSProperties = React.useMemo(
    () => ({
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragActive, isDragReject, isDragAccept],
  );

  React.useEffect(() => {
    if (progress < 100) {
      setTimeout(() => {
        setProgress(progress + 2);
      }, 100);
    }
  }, [progress]);

  return (
    <div className="va-api-form-group">
      <div className="va-api-file-input">
        <h3 className="vads-u-margin-top--4 vads-u-margin-bottom--2p5">Description</h3>
        <label className="vads-u-margin-top--2p5" htmlFor={`drag-and-drop-${name}`}>
          {label}
        </label>
        <div className="vads-u-margin-top--2p5" id={`drag-and-drop-${name}-hint`}>
          Send us your OpenAPI specification. Include a public-facing description of your API.
        </div>
        <div {...getRootProps({ className: 'va-api-file-input__target', style })}>
          <div className="va-api-file-input__instructions" aria-hidden="true">
            <p>
              <span className="va-api-file-input__drag-text">Drag and drop files here or </span>
              <span className="va-api-file-input__choose">choose from folder</span>
            </p>
            <p className="vads-u-display--flex vads-u-flex-direction--column">
              <span>Max file upload 15MB and files can be</span>
              <span>.pdf, .docx, .odt, .json, .xml, or .yaml</span>
            </p>
          </div>
          <div className="va-api-file-input__box" />
          <input
            id={`drag-and-drop-${name}`}
            className="va-api-file-input__input"
            type="file"
            name={name}
            aria-describedby={`drag-and-drop-${name}-hint`}
            multiple={multiple}
            required={required}
            {...getInputProps()}
          />
        </div>
        <aside className="va-api-file-input__file-list vads-u-margin-top--2p5">
          {fileAcceptedItems}
          {fileRejectionItems}
          <FileUploadProgressBar label="input.txt" size={7591740} value={progress} />
        </aside>
      </div>
    </div>
  );
};

export { DragAndDrop };
