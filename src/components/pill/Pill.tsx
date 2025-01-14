import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKey, faSearch, faTag, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import './Pill.scss';

type PillIconType = 'auth' | 'topic' | 'search';

interface PillIconProps {
  type: PillIconType | undefined;
}

const PillIcon = ({ type }: PillIconProps): JSX.Element | null => {
  switch (type) {
    case 'auth':
      return <FontAwesomeIcon className="vads-u-font-size--sm fa-rotate-270" icon={faKey} />;
    case 'topic':
      return <FontAwesomeIcon className="vads-u-font-size--sm" icon={faTag} />;
    case 'search':
      return <FontAwesomeIcon className="vads-u-font-size--sm" icon={faSearch} />;
    default:
      return null;
  }
};

interface PillProps {
  name: string;
  onClick: () => void;
  type?: PillIconType | undefined;
}
export const Pill = ({ name, onClick, type }: PillProps): JSX.Element => (
  <button
    aria-label={`${name} filter - Remove`}
    className={`va-api-filter-pill ${type as string}-filter-pill`}
    title={`${name} filter - Remove`}
    type="button"
    onClick={onClick}
  >
    <PillIcon type={type} />
    <span>{name}</span>
    <FontAwesomeIcon className="vads-u-font-size--lg" icon={faTimesCircle} />
  </button>
);
