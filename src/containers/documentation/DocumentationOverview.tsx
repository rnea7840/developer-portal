/* eslint-disable no-console */
import * as React from 'react';
import { Helmet } from 'react-helmet';
import IsoTopeGrid from 'react-isotope';
import { CardLink, ContentWithNav, PageHeader } from '../../components';
import { defaultFlexContainer } from '../../styles/vadsUtils';

interface FilterItem {
  isChecked: boolean;
  label: string;
}
const filtersDefault = [
  { isChecked: true, label: 'all' },
  { isChecked: false, label: 'appeals' },
  { isChecked: false, label: 'benefits' },
  { isChecked: false, label: 'facilities' },
  { isChecked: false, label: 'vaForms' },
  { isChecked: false, label: 'health' },
  { isChecked: false, label: 'loanGuaranty' },
  { isChecked: false, label: 'verification' },
];

const cardsLayout = [
  {
    col: 0,
    filter: ['appeals'],
    h: 1,
    id: 'a1',
    name: 'Appeals Status',
    row: 0,
    url: '/explore/appeals/docs/appeals',
    w: 1,
  },
  {
    col: 0,
    filter: ['appeals'],
    h: 1,
    id: 'a2',
    name: 'Decision Reviews',
    row: 0,
    url: '/explore/appeals/docs/decision_reviews',
    w: 1,
  },
  {
    col: 1,
    filter: ['benefits'],
    h: 1,
    id: 'b1',
    name: 'Benefits Claims',
    row: 0,
    url: '/explore/benefits/docs/claims',
    w: 1,
  },
  {
    col: 1,
    filter: ['benefits'],
    h: 1,
    id: 'b2',
    name: 'Benefits Intake',
    row: 0,
    url: '/explore/benefits/docs/benefits',
    w: 1,
  },
  {
    col: 1,
    filter: ['benefits'],
    h: 1,
    id: 'b3',
    name: 'Benefits Reference Data',
    row: 0,
    url: '/explore/benefits/docs/benefits_reference_data',
    w: 1,
  },
  {
    col: 3,
    filter: ['facilities'],
    h: 1,
    id: 'c',
    name: 'VA Facilities',
    row: 0,
    url: '/explore/facilities/docs/facilities',
    w: 1,
  },
  {
    col: 0,
    filter: ['vaForms'],
    h: 1,
    id: 'd',
    name: 'VA Forms',
    row: 1,
    url: '/explore/vaForms/docs/vaForms',
    w: 1,
  },
  {
    col: 1,
    filter: ['health'],
    h: 1,
    id: 'e1',
    name: 'Clinical Health',
    row: 1,
    url: '/explore/health/docs/clinical_health',
    w: 1,
  },
  {
    col: 1,
    filter: ['health'],
    h: 1,
    id: 'e2',
    name: 'Community Care Eligibility',
    row: 1,
    url: '/explore/health/docs/community_care',
    w: 1,
  },
  {
    col: 1,
    filter: ['health'],
    h: 1,
    id: 'e3',
    name: 'Veterans Health',
    row: 1,
    url: '/explore/health/docs/fhir',
    w: 1,
  },
  {
    col: 2,
    filter: ['loanGuaranty'],
    h: 1,
    id: 'f',
    name: 'Loan Guaranty',
    row: 1,
    url: '/explore/loanGuaranty/docs/loan_guaranty',
    w: 1,
  },
  {
    col: 0,
    filter: ['verification'],
    h: 1,
    id: 'h1',
    name: 'Address Validation',
    row: 2,
    url: '/explore/verification/docs/address_validation',
    w: 1,
  },
  {
    col: 0,
    filter: ['verification'],
    h: 1,
    id: 'h2',
    name: 'Veteran Confirmation',
    row: 2,
    url: '/explore/verification/docs/veteran_confirmation',
    w: 1,
  },
  {
    col: 0,
    filter: ['verification'],
    h: 1,
    id: 'h3',
    name: 'Veteran Verification',
    row: 2,
    url: '/explore/verification/docs/veteran_verification',
    w: 1,
  },
];

const DocumentationOverview = (): JSX.Element => {
  const [filters, updateFilters] = React.useState(filtersDefault);

  // Filter change handler
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const onFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { checked, value },
    } = event;
    console.log(event);

    updateFilters(state =>
      state.map(f => {
        if (f.label === value) {
          return {
            ...f,
            isChecked: checked,
          };
        } else if (checked && value !== 'all' && f.label === 'all') {
          return {
            ...f,
            isChecked: false,
          };
        }

        return f;
      }),
    );
  };

  return (
    <ContentWithNav
      fullWidth
      nav={
        <div className="documentation-filters-sidebar">
          <h2>Filters</h2>
          {filters.map((f: FilterItem) => (
            <div className="filter" key={`${f.label}_key`}>
              <input
                id={f.label}
                type="checkbox"
                value={f.label}
                onChange={onFilter}
                checked={f.isChecked}
              />
              <label htmlFor={f.label}>{f.label}</label>
            </div>
          ))}
        </div>
      }
      navAriaLabel="Documentation API Filters sidebar"
      content={
        <div className="documentation-overview-wrapper">
          <Helmet>
            <title>Documentation</title>
          </Helmet>
          <PageHeader
            header="Documentation"
            description="Explore usage policies and technical details about VA's API offerings."
          />
          <div className={defaultFlexContainer()}>
            <IsoTopeGrid
              gridLayout={cardsLayout}
              unitWidth={0}
              unitHeight={0}
              noOfCols={0}
              filters={filters}
            >
              {cardsLayout
                .sort((a, b) => a.name.localeCompare(b.name))
                .map(card => (
                  <CardLink
                    key={card.id}
                    name={card.name}
                    url={card.url}
                    callToAction={`View the ${card.name} API`}
                  >
                    {card.name} API
                  </CardLink>
                ))}
            </IsoTopeGrid>
          </div>
        </div>
      }
    />
  );
};

export default DocumentationOverview;
