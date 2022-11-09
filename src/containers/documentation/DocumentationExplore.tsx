import * as React from 'react';
import { Helmet } from 'react-helmet';
import Fuse from 'fuse.js';
import { getActiveApis } from '../../apiDefs/query';
import { CardLink, PageHeader } from '../../components';
import { defaultFlexContainer } from '../../styles/vadsUtils';
import ApisLoader from '../../components/apisLoader/ApisLoader';
import { APIDescription } from '../../apiDefs/schema';

const DocumentationExplore = (): JSX.Element => {
  const [search, setSearch] = React.useState('');
  const allApis = getActiveApis();

  const options = {
    // isCaseSensitive: false,
    // includeScore: false,
    // shouldSort: true,
    // includeMatches: false,
    // findAllMatches: false,
    // minMatchCharLength: 1,
    // location: 0,
    // threshold: 0.6,
    // distance: 100,
    // useExtendedSearch: false,
    // ignoreLocation: false,
    // ignoreFieldNorm: false,
    // fieldNormWeight: 1,
    keys: ['name', 'description', 'releaseNotes', 'urlFragment'],
  };
  const fuse = new Fuse(allApis, options);

  const filteredApisList = fuse.search<APIDescription>(search);
  return (
    <div className="documentation-overview-wrapper">
      <Helmet>
        <title>Documentation</title>
      </Helmet>
      <PageHeader
        header="Fuzzy Search Demo"
        description="Use search box to filter APIs in real time."
      />
      <input
        value={search}
        onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setSearch(e.target.value)}
      />
      <ApisLoader>
        <div className={defaultFlexContainer()}>
          {search
            ? filteredApisList.map((api: Fuse.FuseResult<APIDescription>) => {
                const { name, categoryUrlFragment, description, urlFragment } = api.item;
                return (
                  <CardLink
                    key={urlFragment}
                    name={name}
                    url={`/explore/${categoryUrlFragment}/docs/${urlFragment}`}
                    callToAction={`View the ${name}`}
                  >
                    {description}
                  </CardLink>
                );
              })
            : allApis.map((api: APIDescription) => {
                const { name, categoryUrlFragment, description, urlFragment } = api;
                return (
                  <CardLink
                    key={urlFragment}
                    name={name}
                    url={`/explore/${categoryUrlFragment}/docs/${urlFragment}`}
                    callToAction={`View the ${name}`}
                  >
                    {description}
                  </CardLink>
                );
              })}
        </div>
      </ApisLoader>
    </div>
  );
};

export default DocumentationExplore;
