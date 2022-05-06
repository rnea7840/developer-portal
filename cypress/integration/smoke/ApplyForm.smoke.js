/// <reference types="cypress" />

function basicFields(cy) {
  cy.get('#firstNameFormField').type('FirstNameTest');
  cy.get('#lastNameFormField').type('LastNameTest');
  cy.get('#emailFormField').type('test@test.com');
  cy.get('#organizationFormField').type('VA Developer Test');
  cy.get('#termsOfServiceFormField').click();
}

describe('Apply Form on Dev', () => {
  beforeEach(() => {
    cy.intercept({
      method: 'POST',
      url: '/internal/developer-portal/public/developer_application',
    }).as('submission');
    cy.intercept({
      method: 'POST',
      url: '/platform-backend/v0/consumers/applications',
    }).as('submissionLPB');

    cy.visit('https://dev-developer.va.gov/onboarding/request-sandbox-access');
  });

  it('Single apikey submission works', () => {
    basicFields(cy);
    cy.get('#apisFormFieldbenefits').click();

    cy.get('#main button[type="submit"]').click();

    cy.wait('@submission').then(interception => {
      assert.isNotNull(interception.response.body, 'Form submission has a response.');
      assert.equal(interception.response.body.email, 'test@test.com');
      assert.isNotEmpty(interception.response.body.kongUsername, 'Kong username is not empty');
      assert.isNotEmpty(interception.response.body.token, 'Token is not empty');
    });
    cy.wait('@submissionLPB').then(interception => {
      assert.isNotNull(interception.response.body, 'Form submission has a response.');
      assert.equal(interception.response.body.apis, 'benefits');
      assert.equal(interception.response.body.email, 'test@test.com');
      assert.isNotEmpty(interception.response.body.kongUsername, 'Kong username is not empty');
      assert.isNotEmpty(interception.response.body.token, 'Token is not empty');
    });
  });
});
