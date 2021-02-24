import React from 'react';
import { FileError } from 'react-dropzone';
import classNames from 'classnames';
import {
  faCheckCircle,
  faExclamationCircle,
  faSpinner,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import toHtmlId from '../../toHtmlId';

import './FileUploadProgressBar.scss';

interface FileProgressProps {
  errors?: Array<{ code: string; message: string }> | null;
  label: string;
  size: number;
  value: number;
}

const convertBytesToMegaBytes = (message: string): string => {
  const bytes = /\d+ bytes/.exec(message);
  if (bytes) {
    const size = parseInt(bytes[0].substr(0, 7), 10) / 100000;
    return message.replace(bytes[0], `${size}MB`);
  }
  return message;
};

const fileSize = (size: number): string => {
  if (size === 0) {
    return '0 Bytes';
  }

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(size) / Math.log(k));
  const finalSize = parseFloat((size / Math.pow(k, i)).toFixed(0));

  return `${finalSize}${sizes[i]}`;
};

const ErrorMessages = ({ errors }: { errors: FileError[] }): JSX.Element => {
  const error = errors[0];

  if (error.code === 'file-too-large') {
    error.message = convertBytesToMegaBytes(error.message);
  }

  return (
    <span key={error.code} className="vads-u-color--secondary-dark vads-u-margin-left--1">
      ({error.message})
    </span>
  );
};

const handleRemoveFile = (event: React.KeyboardEvent | React.MouseEvent): void => {
  event.preventDefault(); // dummy call to prevent TS from complaining
};

const handleKeyDown = (e: React.KeyboardEvent): void => {
  const KEY_ENTER = 13;
  const KEY_SPACE = 32;

  if (e.keyCode === KEY_ENTER || e.keyCode === KEY_SPACE) {
    e.preventDefault();
    e.stopPropagation();
    handleRemoveFile(e);
  }
};

export const FileUploadProgressBar = ({
  errors = null,
  label,
  size,
  value,
}: FileProgressProps): JSX.Element => {
  const id = `${toHtmlId(label)}`;
  const displayedSize = fileSize(size);
  const success = !errors;
  const loading = value < 100 && (!errors || !success);

  return (
    <div className="va-api-file-progress">
      <div className="va-api-file-progress__label">
        <div className="va-api-file-progress__status">
          {loading && (
            <FontAwesomeIcon
              className="vads-u-color--primary vads-u-margin-right--1p5"
              icon={faSpinner}
              spin
            />
          )}
          {!loading && success && (
            <FontAwesomeIcon
              className="vads-u-color--green vads-u-margin-right--1p5"
              icon={faCheckCircle}
            />
          )}
          {!loading && errors && (
            <FontAwesomeIcon
              className="va-api-file-progress--error vads-u-margin-right--1p5"
              icon={faExclamationCircle}
            />
          )}
          {label}
          {!loading && errors && <ErrorMessages errors={errors} />}
        </div>
        <div
          className={classNames('va-api-file-progress__control', {
            'va-api-file-progress--error': errors,
          })}
        >
          {displayedSize}
          <span
            className="va-api-file-progress__remove"
            onClick={(event): void => handleRemoveFile(event)}
            onKeyDown={(event): void => handleKeyDown(event)}
            role="button"
            tabIndex={0}
          >
            <FontAwesomeIcon icon={faTimes} />
          </span>
        </div>
      </div>
      <div
        className={classNames('va-api-file-progress__bar', {
          'vads-u-visibility--hidden': !loading,
        })}
        id={id}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label}
      >
        <div className="va-api-file-progress__bar-inner" style={{ width: `${value}%` }} />
      </div>
    </div>
  );
};
