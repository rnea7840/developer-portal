import * as React from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';
import { PageHeader } from '../../components';
import SupportConfirmation from '../../content/supportConfirmation.mdx';
import SupportContactUsForm from './SupportContactUsForm';

const SupportContactUs = (): JSX.Element => {
  const [sent, setSent] = React.useState(false);

  const onSuccess = (): void => {
    setSent(true);
  };

  /**
   * RENDER
   */
  return (
    <>
      {sent && <SupportConfirmation />}
      {!sent && (
        <>
          <Helmet>
            <title>Contact Us</title>
          </Helmet>
          <PageHeader halo="Support" header="Contact Us" />
          <p>
            From this page, developers can ask us questions and get help. You can also find answers to
            many common questions on <Link to="/support/faq">our FAQ page</Link>.
          </p>
          <p>
            <strong>Note:</strong> If you are a Veteran seeking help with claims, health records, or
            other information, visit <a href="https://www.va.gov/">VA.gov</a> or contact your local
            VSO for assistance.
          </p>
          <SupportContactUsForm onSuccess={onSuccess} />
        </>
      )}
    </>
  );
};

export default SupportContactUs;
