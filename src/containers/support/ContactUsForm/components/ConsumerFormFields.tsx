import classNames from 'classnames';
import React, { FC } from 'react';
import { ContactUsContent } from '../../../../types/content';
import { TextField } from '../../../../components';

interface ConsumerFormFieldsProps {
  content: ContactUsContent;
}

const ConsumerFormFields: FC<ConsumerFormFieldsProps> = ({ content }) => (
  <>
    <legend>
      <h2
        className={classNames(
          'vads-u-margin-top--4',
          'vads-u-margin-bottom--0',
          'vads-u-font-size--lg',
        )}
      >
        Description
      </h2>
    </legend>
    <TextField
      label={content.consumerDescription}
      name="description"
      as="textarea"
      required
      className="vads-u-margin-top--4"
    />
  </>
);

export default ConsumerFormFields;
