import classNames from 'classnames';
import { useFormikContext } from 'formik';
import React, { FC } from 'react';
import Markdown from 'react-markdown';
import { TextField, CheckboxRadioField } from '../../../../components';
import { ContactUsFormState } from '../../../../types/contactUsForm';
import { ContactUsContent } from '../../../../types/content';

interface PublishingFormFieldsProps {
  content: ContactUsContent;
}

const titleClass = classNames(
  'vads-u-margin-top--4',
  'vads-u-margin-bottom--2p5',
  'vads-u-font-size--lg',
);

const PublishingFormFields: FC<PublishingFormFieldsProps> = ({ content }) => {
  const { values } = useFormikContext<ContactUsFormState>();
  return (
    <>
      <h2 className={titleClass}>Tell us about your API</h2>
      <TextField
        label={content.providerDescription}
        name="apiDetails"
        as="textarea"
        description={
          <Markdown>{content.providerDescriptionChecklist}</Markdown>
        }
        required
      />

      <h2 className={titleClass}>Description</h2>
      <TextField
        label={content.providerOpenAPISpec}
        name="apiDescription"
        as="textarea"
      />

      <fieldset className="vads-u-margin-top--4">
        <legend className={classNames('vads-u-font-size--lg', 'vads-u-margin-bottom--2p5')}>
          <h2 className={classNames('vads-u-font-size--lg', 'vads-u-margin-y--0')}>
            Do you have concerns about publishing your API for public use?
          </h2>
        </legend>
        <CheckboxRadioField type="radio" name="apiInternalOnly" value="yes" label="Yes" />

        {
          values.apiInternalOnly === 'yes' &&
          <div className={classNames('vads-u-margin-left--4', 'feature', 'vads-u-padding-top--2')}>
            <h3 className={classNames('vads-u-margin-top--0', 'vads-u-margin-bottom-2p5')}>Internal to VA only:</h3>
            <TextField
              label="Tell us more about why the API needs to be restricted to internal VA use."
              name="apiInternalOnlyDetails"
              as="textarea"
              required
              className={classNames()}
            />
          </div>
        }

        <CheckboxRadioField type="radio" name="apiInternalOnly" value="no" label="No" />
      </fieldset>

      <h2 className={titleClass}>Other information</h2>
      <TextField
        label={content.providerOtherInformation}
        name="apiOtherInfo"
        as="textarea"
      />
    </>
  );
};

export default PublishingFormFields;
