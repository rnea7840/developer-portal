import * as React from 'react';
import VersionSelect from './VersionSelect';
import { System } from './index';

// These two props are handed in via swagger-ui
// getSystem allows access to the swagger-ui state
// getComponent just allows a helper function to get the base layout
// see: https://github.com/swagger-api/swagger-ui/blob/master/docs/customization/custom-layout.md
export interface IExtendedLayoutProps {
  getSystem: () => System;
  getComponent: (componentName: string, container: boolean) => React.ComponentType;
}

export default class ExtendedLayout extends React.Component<IExtendedLayoutProps> {
  public constructor(props: IExtendedLayoutProps) {
    super(props);
  }

  public render(): JSX.Element {
    const { getComponent, getSystem } = this.props;
    const apiMetadata = getSystem().versionSelectors.apiMetadata();
    /* eslint-disable @typescript-eslint/no-non-null-assertion */
    const BaseLayout: React.ComponentType = getComponent('BaseLayout', true)!;
    /* eslint-enable @typescript-eslint/no-non-null-assertion */
    return (
      <div>
        {apiMetadata && apiMetadata.meta.versions.length > 1 && (
          <VersionSelect getSystem={getSystem} />
        )}
        <BaseLayout />
      </div>
    );
  }
}
