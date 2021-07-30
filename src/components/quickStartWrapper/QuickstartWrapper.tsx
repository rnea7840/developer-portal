import * as React from 'react';
import { Helmet } from 'react-helmet';
import Markdown from 'react-markdown';
import { PageHeader } from '..';

interface QuickstartWrapperProps {
  categoryName: string;
  quickstartContent: string;
}

const QuickstartWrapper: React.FunctionComponent<QuickstartWrapperProps> = (
  props: QuickstartWrapperProps,
) => {
  const { categoryName, quickstartContent } = props;

  return (
    <>
      <Helmet>
        <title>{categoryName} Quickstart</title>
      </Helmet>
      <PageHeader halo={categoryName} header="Quickstart" />
      <Markdown>{quickstartContent}</Markdown>
    </>
  );
};

export { QuickstartWrapper };
