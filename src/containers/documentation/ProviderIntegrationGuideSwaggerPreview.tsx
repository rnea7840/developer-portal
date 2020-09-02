import * as React from 'react';

import { RouteComponentProps } from 'react-router';
import PageHeader from 'src/components/PageHeader';

export default class ProviderIntegrationGuideSwaggerPreview extends React.Component<
  RouteComponentProps
> {
  public render() {
    return (
      <section className="vads-u-padding-y--5">
        <div className="vads-l-grid-container">
          <PageHeader id="api-documentation" header="This is a Swagger Preview page" />
        </div>
      </section>
    );
  }
}
