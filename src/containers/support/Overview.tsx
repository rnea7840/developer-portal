import AlertBox from '@department-of-veterans-affairs/component-library/AlertBox';
import LoadingIndicator from '@department-of-veterans-affairs/component-library/LoadingIndicator';
import camelCase from 'lodash.camelcase';
import React, { useEffect, useState } from 'react';
import Helmet from 'react-helmet';
import Markdown from 'react-markdown';
import { loadSupportOverviewContent } from '../../content/loaders';
import { CardLink, PageHeader } from '../../components';
import { defaultFlexContainer } from '../../styles/vadsUtils';
import { SupportOverviewContent } from '../../types/content';
import { SupportSection } from './Support';

interface SupportOverviewProps {
  readonly sections: SupportSection[];
}

const SupportOverview: React.FunctionComponent<SupportOverviewProps> = (
  props: SupportOverviewProps,
): JSX.Element => {
  const [content, setContent] = useState<SupportOverviewContent | null>(null);
  useEffect(() => {
    const loadContent = async (): Promise<void> => {
      const newContent = await loadSupportOverviewContent();
      setContent(newContent);
    };

    void loadContent();
  }, []);

  const headerProps = {
    description: content?.leadParagraph,
    header: 'Support',
  };

  return (
    <>
      <Helmet>
        <title>Support</title>
      </Helmet>
      <PageHeader {...headerProps} />
      {content ? (
        <>
          <AlertBox status="info" className="vads-u-margin-bottom--2 vads-u-padding-y--1">
            <Markdown>{content.veteranNotice}</Markdown>
          </AlertBox>
          <div className={defaultFlexContainer()}>
            {props.sections.map((section: SupportSection) => (
              <CardLink
                name={section.name}
                url={`/support/${section.id}`}
                key={section.id}
                callToAction={section.callToAction}
              >
                {content[`${camelCase(section.id)}Description`]}
              </CardLink>
            ))}
          </div>
        </>
      ) : (
        <LoadingIndicator message="Loading..." />
      )}
    </>
  );
};

export default SupportOverview;
