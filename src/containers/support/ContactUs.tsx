import AlertBox from '@department-of-veterans-affairs/component-library/AlertBox';
import LoadingIndicator from '@department-of-veterans-affairs/component-library/LoadingIndicator';
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router';
import Helmet from 'react-helmet';
import Markdown from 'react-markdown';
import SupportConfirmation from '../../content/supportConfirmation.mdx';
import { FormType } from '../../types/contactUsForm';
import { ContactUsContent } from '../../types/content';
import { loadContent } from '../../content/loaders';
import { PageHeader } from '../../components';
import ContactUsForm from './ContactUsForm';

const ContactUs = (): JSX.Element => {
  const [content, setContent] = useState<ContactUsContent | null>(null);
  useEffect(() => {
    const loadFAQContent = async (): Promise<void> => {
      const newContent = await loadContent<ContactUsContent>('contact-us');
      setContent(newContent);
    };

    void loadFAQContent();
  }, []);

  const [sent, setSent] = React.useState(false);
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  let type = FormType.CONSUMER;
  if (query.get('type') === 'publishing') {
    type = FormType.PUBLISHING;
  }

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
          {content ? (
            <>
              <Markdown>{content.leadParagraph}</Markdown>
              <AlertBox status="info" className="vads-u-margin-bottom--2 vads-u-padding-y--1">
                <Markdown>{content.veteranNotice}</Markdown>
              </AlertBox>
              <ContactUsForm onSuccess={onSuccess} defaultType={type} content={content} />
            </>
          ) : (
            <LoadingIndicator message="Loading..." />
          )}
        </>
      )}
    </>
  );
};

export default ContactUs;
