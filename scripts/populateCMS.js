'use strict';

const http = require('http');
const axios = require('axios');
const { collapseTextChangeRangesAcrossMultipleVersions } = require('typescript');

const CMS_HOST = 'http://localhost:1337';
const USERNAME = 'mike.lumetta@adhocteam.us';
const PASSWORD = 'Password1';

function logError(error) {
  console.error(error.message);
  if (error.response) {
    console.error(JSON.stringify(error.response.data, { space: 2 }));
  }
}

async function getJWT() {
  try {
    const response = await axios.post(`${CMS_HOST}/auth/local`, {
      identifier: USERNAME,
      password: PASSWORD,
    });

    console.log(`Status: ${response.status} ${response.statusText}`)
    console.log(response.data);
  } catch (error) {
    logError(error);
  }
}

async function updateSingleTypeData(type, data) {
  try {
    const response = await axios.put(`${CMS_HOST}/${type}`, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log(`Successfully updated the ${type} type with ${response.status}.`);
  } catch (error) {
    console.log(`Failed to update the ${type} type.`);
    logError(error);
  }
}

const contactUs = {
  leadParagraph: 'If you have questions about APIs, development, or related topics – STUFF – use this form to send us a message.',
  contactInfoHeading: 'Who are you, why are you here?',
  formTypeHeading: 'Are you a consumer or a provider?',
  consumerDescription: 'Describe your question or issue in as much detail as you can. If your question is about an error, include steps you took to get it and any error messaging you received.',
  providerDescription: 'Include as much information about your API as possible',
  providerDescriptionChecklist: '- Your API’s background, purpose, target users, and functionality\n- Any current or future consumers, including estimated volume of calls\n- Key performance indicators and service level objectives\n- A desired go-live date\n- The business and technical points of contact for your API',
  providerOpenAPISpec: 'Send us your OpenAPI specification. Include a public-facing description of your API.',
  providerOtherInformation: 'Is there anything else we should know about your API, how it’s used, or what you need from us?',
  consumerOptionLabel: 'consumer',
  providerOptionLabel: 'provider',
  veteranNotice: 'Are you a Veteran? Contact your local VSO or visit [VA.gov](https://www.va.gov/) to get the help you need.',
};

const faq = {
  leadParagraph: "Welcome to support for the VA Lighthouse API program. You can visit our FAQ page for answers to common questions. For support or general feedback, use our 'Contact Us' form. Our customer support team is happy to help and will respond within one business day.",
  // generalQuestions: [
  //   {
  //     question: 'Is this where I apply for VA Benefits and access to my health records?',
  //     answer: 'No - this is a support page for software developers utilizing the Veterans Affairs (VA) Application Programming Interface (API). If you are a veteran seeking assistance, please visit the [US Department of Veterans Affairs website](http://www.va.gov/) to access and manage your VA benefits and health care. There are also helpful reference links and Q&A at the VA Inquiry Routing & Information System ([IRIS](https://iris.custhelp.va.gov/app/answers/list)).',
  //   },
  //   {
  //     question: 'Would I like using VA APIs?',
  //     answer: "Yes, it's probably a good time. I think you'd have fun.",
  //   },
  //   {
  //     question: 'What are the VA APIs? Why use the VA APIs?',
  //     answer: 'The APIs are the "front door" or "wall outlet" to VA health records, benefits eligibility, facility locations, and veteran status verification. Developers may create applications to securely access this information via mobile devices and web browsers, across a variety of platforms.',
  //   }
  // ],
  // devQuestions: [
  //   {
  //     question: 'What if I want to make an incredibly complicated application?',
  //     answer: 'You should make an application where the steering wheel does not fly off. It should be too small.',
  //   },
  //   {
  //     question: 'Where do I apply for dev access?',
  //     answer: 'Click to [Get Started](/apply) by applying for an API key. Note that you will need to provide your [OAuth](/oauth) Redirect URL if you are applying for a key to the Health, Claims, or Veteran Verification APIs. You are also required to agree to the [VA API Terms of Service](/terms-of-service) in order to obtain a key.',
  //   }
  // ],
  // troubleshootingQuestions: [
  //   {
  //     question: 'What if the website blows up and starts blinking?',
  //     answer: 'This is not a real thing. I am typing nonsense.',
  //   }
  // ],
};

const supportOverview = {
  leadParagraph: "Welcome to support for the VA Lighthouse API program. You can visit our FAQ page for answers to common questions. For support or general feedback, use our 'Contact Us' form. Our customer support team will hunt you down in the dark of the night.",
  veteranNotice: 'Are you a Veteran? Contact your local VSO or visit [VA.gov](https://www.va.gov/) to get the help you need.',
  faqDescription: 'Answers to the mysteries of life.',
  contactUsDescription: "Give us a shout and we'll get back to you before the next full moon.",
};

async function updateAPICategories(categories) {
  let getResponse;
  try {
    // get all existing categories
    // if this were for real we'd implement a Strapi controller method to get by friendlyId
    getResponse = await axios.get(`${CMS_HOST}/api-categories`);
  } catch (error) {
    console.error('Failed to get all API categories before update.');
    logError(error);
    return;
  }

  const existingCategories = getResponse.data.reduce((categoryMap, category) => {
    categoryMap[category.friendlyId] = category;
    return categoryMap;
  }, {});

  try {
    const responsePromises = categories.map(category => {
      if (existingCategories[category.friendlyId]) {
        return axios.put(
          `${CMS_HOST}/api-categories/${existingCategories[category.friendlyId].id}`,
          category,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );
      } else {
        return axios.post(`${CMS_HOST}/api-categories`, category, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
      }
    });

    await Promise.all(responsePromises);
    console.log('Successfully updated API categories.');
  } catch (error) {
    console.error('Failed to update API categories.');
    logError(error);
  }
}

const apiCategories = [
  {
    friendlyId: 'appeals',
    name: 'Appeals APIs',
    description: 'Enables managing benefit decision appeals on behalf of a Veteran.',
    overview: "## Allows internal VA users to manage Veterans’ decision review requests per the [Appeals Modernization Act (AMA)](https://benefits.va.gov/benefits/appeals.asp) or the legacy benefits appeals process. \n\nAllows you to submit, manage, or check the status of decision reviews (appeals) related to VA benefits claims. [Review the latest release notes](/release-notes/appeals).",
    consumerDocsLink: 'Read the consumer onboarding guide for getting production access',
  },
  {
    friendlyId: 'benefits',
    name: 'Benefitz APIs',
    description: 'Enables approved organizations to submit benefits-related PDFs and access information on a Veteran’s behalf.',
    overview: '## Enables electronic submission and status tracking of non-medical, VA-related benefit claims.\n\nOur benefits APIs allow you to submit and track electronic benefits claims, submit PDF claims and supplemental documentation, and more. Using these APIs allows you to speed up claims processing when compared to traditional mail or fax submissions. Read the API documentation to find out which claims these APIs handle. [Review the latest release notes](/release-notes/benefits).',
    consumerDocsLink: 'Read the consumer onboarding guide for getting production access',
    veteranNotice: 'Are you a Veteran? Check your [benefits or appeals claim status](https://www.va.gov/claim-or-appeal-status/).',
  },
  {
    friendlyId: 'facilities',
    name: 'FACILITIES API',
    description: 'Use the VA Facility API to find relevant information about a specific VA facility.',
    overview: '## Use the VA Facilities API to find information about a specific VA facility. \n\nThis API uses open data to return contact information, location, hours of operation and available services for VA facilities. For medical facilities only, we provide data on appointment wait times and patient satisfaction. [Review the latest release notes](/release-notes/facilities).',
    consumerDocsLink: 'Learn about getting production access using open data APIs',
    veteranNotice: "Are you a Veteran? [Find the facility that's right for you](https://www.va.gov/find-locations/).",
  },
  {
    friendlyId: 'health',
    name: 'Health APIs',
    description: 'Empowering Veterans to take control of their data and put it to work.',
    overview: '## Use our Health APIs to build tools that help Veterans manage their health, view their VA medical records, share their health information, and determine potential eligibility for community care. While these APIs allow greater access to health data, they do not currently allow submission of medical claims. \n\nVA’s Health APIs use [HL7’s Fast Healthcare Interoperability Resources (FHIR) framework](https://www.hl7.org/fhir/overview.html) for providing healthcare data in a standardized format. FHIR solutions are built from a set of modular components, called resources, which can be easily assembled into working systems that solve real world clinical and administrative problems. \n\nWhen you register for access to the Health APIs, you will be granted access to a synthetic set of data (provided by the MITRE Corporation) that mimics real Veteran demographics. The associated clinical resources include data generated from disease models covering up to a dozen of the most common Veteran afflictions. [Review the latest release notes](/release-notes/health).\n\n_VA is a supporter of the [CARIN Alliance](https://www.carinalliance.com/) Code of Conduct._',
    consumerDocsLink: 'Read the consumer onboarding guide for getting production access',
    quickstart: 'VA’s Health APIs allow a user/application to make queries that will return health records in FHIR format, without interacting with or understanding the inner workings of VA systems.\n\nThe database that powers the development environment is populated with synthetic Veteran data provided by MITRE Corporation. The data contains sample Veteran health records (both living and deceased) that mimic real Veteran demographics. The associated clinical resources include data generated from disease models covering up to a dozen of the most common Veteran afflictions.\n\nThe Community Care Eligibility API also allows a user/application to retrieve an array of different Veteran eligibilities from a synthetic dataset.\n\n## Development API access\n\nThe VA API Platform uses the [OpenID Connect](https://openid.net/specs/openid-connect-core-1_0.html) standard to allow Veterans to authorize third-party applications to access data on their behalf. Some Health APIs also use the [SMART on FHIR](http://docs.smarthealthit.org/) profile. Both OpenID Connect and SMART on FHIR are built on OAuth 2.\n\n### What is the criteria to be considered for Development API access?\n\nThe following basic information should be provided:\n\n * Your name\n * Email address\n * Organization name\n * OAuth Redirect URI\n\n### What happens after I am approved?\n\nYou will receive an email from the VA API team notifying you of your approval, and it will include a new Client ID and Secret for your application. The base URI for the Health API endpoints are:\n\n * https://api.va.gov/services/fhir/v0/argonaut/data-query/\n * https://api.va.gov/services/fhir/v0/dstu2/\n * https://api.va.gov/services/fhir/v0/r4/\n * https://api.va.gov/services/community-care/v0/eligibility\n\nAccordingly, the FHIR conformance statements can be retrieved from:\n\n * https://api.va.gov/services/fhir/v0/argonaut/data-query/metadata\n * https://api.va.gov/services/fhir/v0/dstu2/metadata\n * https://api.va.gov/services/fhir/v0/r4/metadata\n\nYou will also be provided with a set of test accounts to use that will allow you to access specific synthetic data patient records.\n\n## Developer Guidelines\n\nBelow are guidelines you should follow to be successful in your VA API integration.\n\n### Data Refresh\n\nThe APIs accessed via the Development environment are using the same underlying logic as VA’s production APIs; only the underlying data store is different. The synthetic data store is static and is not refreshed at the same intervals as production.\n\n### Usage\n\nAPI usage is not restricted within the Development environment.\n',
  },
  {
    friendlyId: 'vaForms',
    name: 'Forms API',
    description: 'Look up VA forms and check for new versions.',
    overview: '## Use this API to stay up-to-date on VA forms.\n\nThis API uses open data to make it easier to keep up with the ever-changing landscape of VA forms. This API indexes data sourced from [VA.gov](https://www.va.gov/vaforms/search_action.asp), creating unique hashes for each version of a form and allowing quick lookup. [Review the latest release notes](/release-notes/vaForms).',
    consumerDocsLink: 'Learn about getting production access using open data APIs',
    veteranNotice: 'Are you a Veteran? [Find the forms you need](https://www.va.gov/find-forms/).',
  },
  {
    friendlyId: 'verification',
    name: 'Veteran Verification API',
    description: 'Empowering Veterans to take control of their data and put it to work.',
    overview: '## These APIs allow verification of Veteran status and data. They return service history, confirm Veteran status, and validate address information. \n\nWe’re giving Veterans better control of and access to their information – including their service history, Veteran status, discharge information, and more by working with government agencies and industry partners to help Veterans put their information to work. [Review the latest release notes](/release-notes/verification).',
    consumerDocsLink: 'Read the consumer onboarding guide for getting production access'
  },
];

async function updateAPIs(apis) {
  let getResponse;
  try {
    // get all existing categories
    // if this were for real we'd implement a Strapi controller method to get by friendlyId
    getResponse = await axios.get(`${CMS_HOST}/apis`);
  } catch (error) {
    console.error('Failed to get all APIs before update.');
    logError(error);
    return;
  }

  const existingAPIs = getResponse.data.reduce((apiMap, api) => {
    apiMap[api.friendlyId] = api;
    return apiMap;
  }, {});

  try {
    const responsePromises = apis.map(api => {
      if (existingAPIs[api.friendlyId]) {
        return axios.put(
          `${CMS_HOST}/apis/${existingAPIs[api.friendlyId].id}`,
          api,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );
      } else {
        return axios.post(`${CMS_HOST}/apis`, api, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
      }
    });

    await Promise.all(responsePromises);
    console.log('Successfully updated APIs.');
  } catch (error) {
    console.error('Failed to update APIs.');
    logError(error);
  }
}

const apis = [
  {
    friendlyId: 'benefits',
    name: 'Benefits Intake API',
    description: 'Submit new PDF claims',
    releaseNotes: `
### May 24, 2021
(v1) We have turned back on the new Veteran first and last name field validations described in the May 17 release notes. In addition to these new validations, we will allow spaces in these fields, including leading and trailing spaces (white space). #6986

[#6986](https://github.com/department-of-veterans-affairs/vets-api/pull/6986)

---

### May 20, 2021
(v1) On May 17, we made changes to Veteran First and Last name field validations for the Benefits Intake API, which are described in a release note below. 

Based on the high number of errors being received, we are temporarily turning off these changes and reverting back to previous field requirements. We are working on updating the new validations to allow spaces and reduce the number of errors returned. 

When those changes are made, we will turn on the new validations, post an updated release note, and send a notification to all consumers. 
    `,
    veteranNotice: 'Are you a Veteran? Check your [benefits or appeals claim status](https://www.va.gov/claim-or-appeal-status/).',
  },
  {
    friendlyId: 'claims',
    name: 'Benefits Claims API',
    description: 'Submit and track claims',
    releaseNotes: `
### May 3, 2021

* (v0 & v1) Fixed documentation to properly define consentLimits for a POST 2122 submission [#6728](https://github.com/department-of-veterans-affairs/vets-api/pull/6728)

### April 22, 2021

* (v1) "/forms/2122/active" now returns current and previous POA regardless of prior submissions to Lighthouse Claims API [#6621](https://github.com/department-of-veterans-affairs/vets-api/pull/6621)
* (v0 & v1) Fixed bug where a Veteran was unable to submit a POA change for a previously used Representative [#6486](https://github.com/department-of-veterans-affairs/vets-api/pull/6486)
* (v0 & v1) Fixed bug where some service branch options within a disability claim submission were invalid [#6640](https://github.com/department-of-veterans-affairs/vets-api/pull/6640)
    `,
    veteranNotice: 'Are you a Veteran? Check your [benefits or appeals claim status](https://www.va.gov/claim-or-appeal-status/).',
  },
  {
    friendlyId: 'loan_guaranty',
    name: 'Loan Guaranty API',
    description: 'Manage VA Home Loans',
    releaseNotes: `
### March 10, 2020

Launch of the Loan Guaranty API
    `,
  },
  {
    friendlyId: 'appeals',
    name: 'Appeals Status API',
    description: 'Allows retrieval of all decision review request statuses (both legacy and AMA). Statuses are read only.',
    releaseNotes: `
### June 11, 2018
Implement VA-required headers to retrieve status [#2024](https://github.com/department-of-veterans-affairs/vets-api/pull/2024)

---

### May 23, 2018
Add appeals service API [#1961](https://github.com/department-of-veterans-affairs/vets-api/pull/1961)
    `,
  },
  {
    friendlyId: 'decision_reviews',
    name: 'Decisions, Reviewed API',
    description: 'Allows submission, management, and retrieval of decision review requests and details such as statuses in accordance with the AMA.',
    releaseNotes: `
### June 6, 2020
Initial release of the Decision Review API
    `,
  },
  {
    friendlyId: 'facilities',
    name: 'Places at the VA API',
    description: 'See VA Facilities',
    releaseNotes: `
### July 6, 2021
Time zone data has now been added to API repsonse   
* \`time_zone\` represents the corresponding IANA format time zone for the facility returned 
* Example value for Orlando VA Medical Center: "America/New_York"

[View the code change(s)](https://github.com/department-of-veterans-affairs/lighthouse-facilities/pull/226)

---

### April 15, 2021
We added a new meta section to the /nearby endpoint with a new \`band_version\` field.
* \`band_version\` represents the data set used in the distance calculation
* \`band_version\` value may be up to 6 weeks behind the current date
* Example value: "FEB2021" with a return date in March, 2021

[View the code change(s)](https://github.com/department-of-veterans-affairs/lighthouse-facilities/pull/209)
    `,
    veteranNotice: "Are you a Veteran? [Find the facility that's right for you](https://www.va.gov/find-locations/).",
  },
  {
    friendlyId: 'vaForms',
    name: 'Forms API',
    description: "Aren't forms fun??",
    releaseNotes: `
### July 6, 2021
(v0) We added a new searching algorithm that applies spell checking, full text search, and ranking based on popularity. These features allow users to more quickly find the forms they need. 
* [#7108](https://github.com/department-of-veterans-affairs/vets-api/pull/7108)
---

### May 11, 2021
(v0) We added a new property to the Show endpoint (created_at) which is for VA.gov internal use only. [#6818](https://github.com/department-of-veterans-affairs/vets-api/pull/6818)
* Example value: "created_at": "2021-03-30T16:28:30.333Z"
    `,
  },
  {
    friendlyId: 'community_care',
    name: 'Community Care Eligibility API',
    description: "VA's Community Care Eligibility API utilizes VA's Facility API, VA's Enrollment & Eligibility system and others to satisfy requirements found in the VA's MISSION Act of 2018.",
    releaseNotes: `
### June 10, 2020
The optional query parameter \`prompt\` has been added to the authorization flow.
- Supported prompts: login. If specified, the user will be forced to provide credentials regardless of session state. If omitted, an existing active session with the identity provider may not require the user to provide credentials.

[View code changes(s)](https://github.com/department-of-veterans-affairs/vets-saml-proxy/pull/111)

---

### July 30, 2019

Launch of the Community Care Eligibility API`,
  },
  {
    friendlyId: 'fhir',
    name: 'FHIR Health API',
    description: 'Use the OpenID Connect and SMART on FHIR standards to allow Veterans to authorize third-party applications to access data on their behalf.',
    releaseNotes: `
### August 7, 2020

We have updated the mock health records for test users in the Sandbox environment for the Veterans Health API \`Condition\` resource to list conditions from either SNOMED-CT or ICD-10 code sets.  Previously only SNOMED-CT codes were available.

---

### July 31, 2020
We are decreasing the data hold time for the Veterans Health API from 72 hours to 36 hours, effective July 31, 2020, based on an updated VHA policy.  When a physician enters or changes patient data, there is a holding period before the data is released and visible through other applications such as health apps. The holding period gives physicians time to contact their patients and discuss health data, such as sensitive diagnoses, before the patient sees this data elsewhere. This change applies only to real data entered into the production environment.
    `,
  },
  {
    friendlyId: 'urgent_care',
    name: 'Urgent Care API',
    description: "The VA's Health Urgent Care Eligibility API supports industry standards (e.g., Fast Healthcare Interoperability Resources [FHIR]) and provides access to a Veteran's urgent care eligibility status.",
    releaseNotes: `
### July 21, 2020

Our Urgent Care Eligibility API was deactivated on July 21, 2020. The API and related documentation is no longer accessible. For more information, [contact us](https://developer.va.gov/support/contact-us) or visit our [Google Developer Forum](https://groups.google.com/forum/m/#!forum/va-lighthouse)

---

### July 13, 2020

The Urgent Care Eligibility API is deprecated and scheduled for deactivation in the 3rd quarter of 2020.
    `,
  },
  {
    friendlyId: 'veteran_confirmation',
    name: 'Confirmation API',
    description: 'Confirm Veteran status for a given person with an api key.',
    releaseNotes: `
### January 13, 2020
Launched Veteran Confirmation API with a status endpoint
- \`/status\`: Allows third-parties to request confirmation from the VA of an individual's Veteran status after providing a valid API key and identifying attributes for the individual.

[View code change(s)](https://github.com/department-of-veterans-affairs/vets-api/pull/3676)`,
  },
  {
    friendlyId: 'veteran_verification',
    name: 'Verification API',
    description: 'Confirm Veteran status for a given person, or get a Veteran’s service history or disability rating.',
    releaseNotes: `
### April 15, 2020
Added Veteran First & Last Name to service_history endpoint.
- \`/service_history\`: Adds \`first_name\` and \`last_name\` fields to responses.

[View code change(s)](https://github.com/department-of-veterans-affairs/vets-api/pull/4121)

---

### March 18, 2020
Added pay grade information to service_history endpoint.
- \`/service_history\`: Adds \`pay_grade_code\` and \`separation_reason\` fields to responses.

[View code change(s)](https://github.com/department-of-veterans-affairs/vets-api/pull/4016)
    `,
  }
];

// getJWT();
async function updateSingleTypes() {
  await updateSingleTypeData('contact-us', contactUs);
  await updateSingleTypeData('faq', faq);
  await updateSingleTypeData('support-overview', supportOverview);
}

async function updateCollectionTypes() {
  await updateAPICategories(apiCategories);
  await updateAPIs(apis);
}

async function run() {
  console.log('Updating Strapi CMS with new content...');
  await updateSingleTypes();
  await updateCollectionTypes();
  console.log('All content updated successfully.');
}

run();
