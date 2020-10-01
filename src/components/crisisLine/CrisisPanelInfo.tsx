import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import * as PropTypes from 'prop-types';
import * as React from 'react';

const CrisisPanelInfoPropTypes = {
  children: PropTypes.node.isRequired,
  id: PropTypes.string,
  target: PropTypes.string.isRequired,
};

interface CrisisPanelInfoProps extends PropTypes.InferProps<typeof CrisisPanelInfoPropTypes> {
  // left icon off because it was difficult to find the right PropTypes type
  icon: IconProp;
}

const CrisisPanelInfo: React.FunctionComponent<CrisisPanelInfoProps> = (
  props: CrisisPanelInfoProps,
): JSX.Element => (
  <li
    className={classNames(
      'vads-u-display--flex',
      'vads-u-flex-wrap--nowrap',
      'vads-u-align-items--center',
      'vads-u-border-bottom--1px',
      'vads-u-border-top--0',
      'vads-u-border-color--gray-lighter',
      'vads-u-margin-bottom--0',
    )}
  >
    <FontAwesomeIcon
      icon={props.icon}
      className={classNames('va-api-crisis-panel-icon', 'vads-u-margin-right--2')}
    />
    <a id={props.id || undefined} href={props.target} className="vads-u-padding-x--0p5">
      {props.children}
    </a>
  </li>
);

CrisisPanelInfo.propTypes = CrisisPanelInfoPropTypes;
export default CrisisPanelInfo;
