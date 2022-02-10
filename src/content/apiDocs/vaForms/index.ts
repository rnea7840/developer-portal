import { APICategoryContent } from '../../../apiDefs/schema';
import VAFormsReleaseNotes from './vaFormsReleaseNotes.mdx';

const vaFormsContent: APICategoryContent = {
  consumerDocsLinkText: 'Learn about getting production access using open data APIs',
  overview: '',
  shortDescription: 'Look up VA forms and check for new versions.',
  veteranRedirect: {
    linkText: 'Find the forms you need',
    linkUrl: 'https://www.va.gov/find-forms/',
    message: 'Are you a Veteran?',
  },
};

export { vaFormsContent, VAFormsReleaseNotes };
