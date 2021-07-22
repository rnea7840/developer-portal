import LoadingIndicator from '@department-of-veterans-affairs/component-library/LoadingIndicator';
import React, { useEffect, useState } from 'react';
import Helmet from 'react-helmet';
import Markdown from 'react-markdown';
import { loadFAQContent } from '../../content/loaders';
import { FAQContent } from '../../types/content';
import { AccordionPanelContent, GroupedAccordions, PageHeader } from '../../components';

interface SupportQuestionsProps {
  readonly title: string;
  readonly questions: SupportQuestion[];
}

interface SupportQuestion {
  readonly answer: string;
  readonly question: string;
}

const SupportQuestions = (props: SupportQuestionsProps): JSX.Element => {
  const content: AccordionPanelContent[] = props.questions.map((q: SupportQuestion) => ({
    body: <Markdown>{q.answer}</Markdown>,
    title: q.question,
  }));

  return <GroupedAccordions panelContents={content} title={props.title} />;
};

const SupportFAQ: () => JSX.Element = () => {
  const [content, setContent] = useState<FAQContent | null>(null);
  useEffect(() => {
    const loadContent = async (): Promise<void> => {
      const newContent = await loadFAQContent();
      setContent(newContent);
    };

    void loadContent();
  }, []);

  const headerProps = {
    description: content?.leadParagraph,
    halo: 'Support',
    header: 'FAQ',
  };

  return (
    <>
      <Helmet>
        <title>FAQ</title>
      </Helmet>
      <PageHeader {...headerProps} />
      {content ? (
        <div>
          <SupportQuestions title="General" questions={content.generalQuestions} />
          <SupportQuestions title="Development" questions={content.devQuestions} />
          <SupportQuestions title="Troubleshooting/Support" questions={content.troubleshootingQuestions} />
        </div>
      ) : (
        <LoadingIndicator message="Loading..." />
      )}
    </>
  );
};

export default SupportFAQ;
