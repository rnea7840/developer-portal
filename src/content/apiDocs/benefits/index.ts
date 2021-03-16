import { APICategoryContent } from '../../../apiDefs/schema';
import BenefitsIntakeReleaseNotes from './benefitsIntakeReleaseNotes.mdx';
import BenefitsIntakeAPIIntro from './benefitsIntakeAPIIntro.mdx';
import BenefitsIntro from './benefitsIntro.mdx';
import BenefitsOverview from './benefitsOverview.mdx';
import ClaimsAPIIntro from './claimsAPIIntro.mdx';
import ClaimsReleaseNotes from './claimsReleaseNotes.mdx';
import LoanGuarantyReleaseNotes from './loanGuarantyReleaseNotes.mdx';
import ClaimsAttributesReleaseNotes from './claimsAttributesReleaseNotes.mdx';

const benefitsContent: APICategoryContent = {
  intro: BenefitsIntro,
  overview: BenefitsOverview,
  placardText: 'Build tools to electronically submit and track the status of benefit claims.',
  shortDescription:
    'Develop applications that enable Veterans and approved organizations to electronically submit and track the status of benefit claims.',
};

export {
  benefitsContent,
  BenefitsIntakeAPIIntro,
  BenefitsIntakeReleaseNotes,
  ClaimsAPIIntro,
  ClaimsReleaseNotes,
  LoanGuarantyReleaseNotes,
  ClaimsAttributesReleaseNotes,
};
