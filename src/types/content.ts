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
