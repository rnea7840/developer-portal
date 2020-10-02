import * as PropTypes from 'prop-types';
import * as React from 'react';
import TrustedPartnerOnlyTag from './TrustedPartnerOnlyTag';
import VAInternalOnlyTag from './VAInternalOnlyTag';

const OnlyTagsPropTypes = {
  trustedPartnerOnly: PropTypes.bool.isRequired,
  vaInternalOnly: PropTypes.bool.isRequired,
};

type OnlyTagsProps = PropTypes.InferProps<typeof OnlyTagsPropTypes>;

const OnlyTags: React.FunctionComponent<OnlyTagsProps> = ({
  vaInternalOnly,
  trustedPartnerOnly,
}: OnlyTagsProps): JSX.Element => (
  <>
    {vaInternalOnly ? <VAInternalOnlyTag /> : null}
    {trustedPartnerOnly ? <TrustedPartnerOnlyTag /> : null}
  </>
);

OnlyTags.propTypes = OnlyTagsPropTypes;
export default OnlyTags;
