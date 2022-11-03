declare module '@department-of-veterans-affairs/component-library';
declare module '@department-of-veterans-affairs/component-library/dist/react-bindings';
declare module '@department-of-veterans-affairs/component-library/AlertBox';
declare module '@department-of-veterans-affairs/component-library/Modal';
declare module '@department-of-veterans-affairs/component-library/SegmentedProgressBar';
declare module '@department-of-veterans-affairs/component-library/LoadingIndicator';

interface VaAccordionProps {
  bordered?: boolean;
  children: JSX.Element | JSX.Element[];
  disableAnalytics?: boolean;
  openSingle?: boolean;
}
interface VaAccordionItemProps {
  header: string;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  open?: boolean;
  subheader?: string;
}

interface VaAlertProps {
  ['background-only']?: boolean;
  ['close-btn-aria-label']?: string;
  ['disable-analytics']?: boolean;
  ['full-width']?: boolean;
  ['show-icon']?: boolean;
  children: JSX.Element | JSX.Element[] | string;
  closeable?: boolean;
  status: 'info' | 'success' | 'error' | 'warning' | 'continue';
  visible: boolean;
  className?: string;
  key?: string;
}

declare namespace JSX {
  interface IntrinsicElements {
    'va-accordion': VaAccordionProps;
    'va-accordion-item': unknown;
    'va-alert': VaAlertProps;
    defaultLoadingSpinner: unknown;
  }
}
