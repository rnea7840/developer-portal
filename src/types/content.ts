export interface APICategoryContent {
  friendlyId: string;
  name: string;
  description: string;
  overview: string;
  consumerDocsLink: string;
  quickstart: string;
  veteranNotice: string;
}

export interface APIContent {
  friendlyId: string;
  name: string;
  description: string;
  releaseNotes: string;
  deactivationNotice?: string;
  deprecationNotice?: string;
  veteranNotice?: string;
}

/* SUPPORT */
export interface SupportOverviewContent {
  leadParagraph: string;
  veteranNotice: string;
  contactUsDescription: string;
  faqDescription: string;
}

export interface FAQQuestion {
  question: string;
  answer: string;
}

export interface FAQContent {
  leadParagraph: string;
  generalQuestions: FAQQuestion[];
  devQuestions: FAQQuestion[];
  troubleshootingQuestions: FAQQuestion[];
}

export interface ContactUsContent {
  leadParagraph: string;
  veteranNotice: string;
  contactInfoHeading: string;
  formTypeHeading: string;
  consumerOptionLabel: string;
  providerOptionLabel: string;

  // consumer form
  consumerDescription: string;

  // provider form
  providerDescription: string;
  providerDescriptionChecklist: string;
  providerOpenAPISpec: string;
  providerOtherInformation: string;
}
