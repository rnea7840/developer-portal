import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as React from "react";
import PageHeader from "../../components/PageHeader";
import SupportConfirmation from '../../content/supportConfirmation.mdx';

import SupportContactUsForm from './SupportContactUsForm';

const GitHubSnippet = () => {
  return (
    <div className="vads-u-margin-y--2">
      <h3>Submit an Issue via GitHub</h3>
      <a className="usa-button" href="https://github.com/department-of-veterans-affairs/vets-api-clients/issues/new/choose">
        <FontAwesomeIcon icon={faGithub} /> Submit an Issue
      </a>
    </div>
  );
};

interface ISupportContactUsState {
  sent: boolean;
}

export default class SupportContactUs extends React.Component<{}, ISupportContactUsState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      sent: false,
    };

    this.onSuccess = this.onSuccess.bind(this);
  }

  public render() {
    const headerProps = {
      description: "If you have questions about the VA Lighthouse APIs that are not answered by reviewing our FAQs, please use the Contact Us form below and we will get back to you within one business day.",
      halo: "Support",
      header: "Contact Us",
    };

    if (this.state.sent) {
      return <SupportConfirmation />;
    } else {
      return (
        <section role="region" aria-label="Support Overview">
          <PageHeader {...headerProps} />
          <GitHubSnippet />
          <SupportContactUsForm onSuccess={this.onSuccess}/>
        </section>
      );
    }
  }

  private onSuccess(): void {
    this.setState({sent: true});
  }
}
