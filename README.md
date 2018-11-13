# Developer Portal

The developer portal serves documentation for the VA API platform at https://developer.va.gov/ and allows developers to request an API key.

## Local setup

The developer portal was bootstrapped with [create-react-app](https://github.com/facebook/create-react-app) and depends on `npm`.

First install the dependencies:
```
npm install
```

Next, before running the app, create a `.env` file with the following contents:
```
PORT=3001
REACT_APP_VETSGOV_SWAGGER_API=http://localhost:3000
REACT_APP_DEVELOPER_PORTAL_SELF_SERVICE_URL=https://dev-api.vets.gov
REACT_APP_SALESFORCE_ENV=VICDEV
``` 

## Running the app
```
npm start
```

This will start the app on port 3001 as well as the webpack dev server to automatically rebuild and display your changes in the browser.

Swagger docs will not display without also running [vets-api](https://github.com/department-of-veterans-affairs/vets-api) at localhost:3000

## Deployments

The developer portal is automatically deployed to both [dev](https://dev-developer.va.gov/) and [staging](https://staging-developer.va.gov/) whenever changes are made to the master branch.

Deploys to production are done manually in Jenkins.


