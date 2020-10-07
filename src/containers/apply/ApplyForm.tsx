import * as React from 'react';

import classNames from 'classnames';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { ThunkDispatch } from 'redux-thunk';

import AlertBox from '@department-of-veterans-affairs/formation-react/AlertBox';
import ErrorableCheckbox from '@department-of-veterans-affairs/formation-react/ErrorableCheckbox';
import ErrorableTextArea from '@department-of-veterans-affairs/formation-react/ErrorableTextArea';
import ProgressButton from '@department-of-veterans-affairs/formation-react/ProgressButton';

import * as actions from '../../actions';
import { includesOauthAPI } from '../../apiDefs/query';
import { IApplication, IErrorableInput, IRootState } from '../../types';
import { APPLY_FIELDS_TO_URL_FRAGMENTS, PAGE_HEADER_ID } from '../../types/constants';
import ApplyHeader from './ApplyHeader';
import DeveloperInfo from './DeveloperInfo';
import OAuthAppInfo from './OAuthAppInfo';
import SelectedApis from './SelectedApis';

interface IApplyProps extends IApplication {
  submitForm: () => void;
  toggleAcceptTos: () => void;
  updateDescription: (value: IErrorableInput) => void;
}

type ApplicationDispatch = ThunkDispatch<
IRootState,
undefined,
actions.SubmitFormAction | actions.UpdateApplicationAction
>;

const mapDispatchToProps = (dispatch: ApplicationDispatch) => ({
  submitForm: () => {
    dispatch(actions.submitForm());
  },
  toggleAcceptTos: () => {
    dispatch(actions.toggleAcceptTos());
  },
  updateDescription: (value: IErrorableInput) => {
    dispatch(actions.updateApplicationDescription(value));
  },
});

const mapStateToProps = (state: IRootState) => ({
  ...state.application,
});

const renderError = (props: any) => {
  const assistanceTrailer = (
    <span>
      Need assistance? Create an issue through our <Link to="/support">Support page</Link>
    </span>
  );

  if (props.errorStatus) {
    return (
      <AlertBox
        status="error"
        headline={'We encountered a server error while saving your form. Please try again later.'}
        content={assistanceTrailer}
      />
    );
  }
  return null;
};

const selectedApis = (props: any) => {
  const apis = props.inputs.apis;
  return Object.keys(apis).filter(apiName => apis[apiName]);
};

const anyOAuthApisSelected = (props: any) => {
  const apiIdsByField = selectedApis(props).flatMap(
    formField => APPLY_FIELDS_TO_URL_FRAGMENTS[formField],
  );
  return includesOauthAPI(apiIdsByField);
};

const anyApiSelected = (props: any) => {
  const numSelected = selectedApis(props).length;
  return numSelected > 0;
};

const allBioFieldsComplete = (props: any) => {
  const bioFieldNames = ['email', 'firstName', 'lastName', 'organization'];
  const incompleteFields = bioFieldNames.filter(fieldName => !props.inputs[fieldName].value);
  return incompleteFields.length === 0;
};

const readyToSubmit = (props: any) => {
  const { inputs: { oAuthApplicationType, oAuthRedirectURI, termsOfService }} = props;
  let applicationTypeComplete = true;
  let redirectURIComplete = true;
  if (anyOAuthApisSelected(props)) {
    applicationTypeComplete = oAuthApplicationType.value.length !== 0;
    redirectURIComplete =
      oAuthRedirectURI.value.length !== 0 && oAuthRedirectURI.validation === undefined;
  }
  return (
    allBioFieldsComplete(props) &&
    anyApiSelected(props) &&
    termsOfService &&
    applicationTypeComplete &&
    redirectURIComplete
  );
};

const ApplyForm = (props: IApplyProps) => {
  const applyClasses = classNames('vads-l-grid-container', 'vads-u-padding--4');

  return (
    <div role="region" aria-labelledby={PAGE_HEADER_ID} className={applyClasses}>
      <ApplyHeader />
      <div className="vads-l-row">
        <div
          className={classNames(
            'vads-l-col--12',
            'medium-screen:vads-l-col--8',
            'vads-u-padding-x--2p5',
          )}
        >
          <form className="usa-form">
            <h2>Application</h2>
            <DeveloperInfo />
            <SelectedApis />
            {anyOAuthApisSelected(props) && <OAuthAppInfo />}

            <ErrorableTextArea
              errorMessage={null}
              label="Briefly describe how your organization will use VA APIs:"
              onValueChange={props.updateDescription}
              name="description"
              field={props.inputs.description}
            />

            <ErrorableCheckbox
              checked={props.inputs.termsOfService}
              label={
                <span>
                    I agree to the <Link to="/terms-of-service">Terms of Service</Link>
                </span>
              }
              onValueChange={props.toggleAcceptTos}
              required={true}
            />

            <ProgressButton
              buttonText={props.sending ? 'Sending...' : 'Submit'}
              disabled={!readyToSubmit(props) || props.sending}
              onButtonClick={props.submitForm}
              buttonClass="usa-button-primary"
            />
          </form>
          {renderError(props)}
        </div>
        <div
          className={classNames(
            'vads-l-col--12',
            'medium-screen:vads-l-col--4',
            'vads-u-padding-x--2p5',
          )}
        >
          <div className="feature">
            <h3>Stay In Touch</h3>
            <p>
                Want to get news and updates about VA API Program? Sign up to receive email updates.
            </p>
            <a className="usa-button" href="https://public.govdelivery.com/accounts/USVAOIT/subscriber/new?topic_id=USVAOIT_20">
                Sign Up
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ApplyForm);
