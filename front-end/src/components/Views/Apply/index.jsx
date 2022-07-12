import React from 'react';

import { Link, Navigate } from 'react-router-dom';

import AppContext from '@contexts/App';

import ShellNavigation from '@components/Shells/Navigation';
import PartialJobPost from '@components/Partials/JobPost';
import ComponentHelpers from '@components/Helpers';

import DatabaseDriver from '@database/Driver';

import AppKeys from '@shared/AppKeys';
import ErrorCodes from '@shared/ErrorCodes';
import Links from '@shared/Links';

import './index.css';

const { withSearchParams } = ComponentHelpers;

const KEY_COVER_LETTER = AppKeys['COVER_LETTER'];
const KEY_DESCRIPTION = AppKeys['DESCRIPTION'];
const KEY_ERROR_CODE = AppKeys['ERROR_CODE'];
const KEY_NUMBER_JOB = AppKeys['NUMBER_JOB'];
const KEY_NUMBER_USER = AppKeys['NUMBER_USER'];
const KEY_TIME_A = AppKeys['TIME_A'];
const KEY_TIME_B = AppKeys['TIME_B'];
const KEY_TITLE = AppKeys['TITLE'];

const MAP_LINKS = Links['MAP_LINKS'];

class ViewApply extends React.Component {

  static contextType = AppContext;

  constructor(props) {
    super(props);

    this.state = {
      job: null,
      situation: '',
      coverLetter: '',
    };

  }

  componentDidMount() {

    const { context } = this;

    const { user } = context;

    if (user) {

      this.loadJob();

    }

  }

  loadJob () {

    const { context, props } = this;

    const { searchParams } = props;

    const { user } = context;

    const { type } = user;

    if (type !== 'babysitter') {

      return;

    }

    const key = searchParams.get(KEY_NUMBER_JOB);

    if (!key) {

      return;

    }

    const parameters = {
      [KEY_NUMBER_JOB]: key,
    };

    DatabaseDriver.loadJobs(parameters)
      .then((job) => {

        this.setState({ job: job });

      })
      .catch((error) => {


      });

  }

  render () {

    const { context, props, state } = this;

    const { strings, user } = context;

    const { job, situation } = state;

    // render for babysitters
    const renderB = () => {

      // the job is not loaded yet, show nothing
      if (!job) {

        return null;

      }

      const situationFail = strings['MESSAGE_APPLY_FAIL'];
      const situationSuccess = strings['MESSAGE_APPLY_SUCCESS'];
      const situationTry = strings['MESSAGE_APPLY_TRY'];

      const actionSubmit = () => {

        const { coverLetter } = state;

        const { number: numberUser } = user;

        const { [KEY_NUMBER_JOB]: numberJob } = job;
  
        const request = {
          [KEY_NUMBER_USER]: numberUser,
          [KEY_NUMBER_JOB]: numberJob,
          [KEY_COVER_LETTER]: coverLetter,
        };
  
        const applyFail = () => {
  
          this.setState({ situation: situationFail });
  
        };
  
        const applySuccess = () => {
  
          this.setState({ situation: situationSuccess });
  
        };
  
        const applyTry = () => {
  
          DatabaseDriver.applyUser(request)
            .then((response) => {
  
              const errorCode = response[KEY_ERROR_CODE];
  
              if (errorCode !== ErrorCodes['ERROR_NONE']) {
  
                applyFail();
  
              } else {
  
                applySuccess();
  
              }
  
            }).catch((error) => {
  
              applyFail();
  
            });
  
        };
  
        this.setState({ situation: situationTry }, applyTry);
  
      };

      const setValue = (key) => (event) => {

        const element = event.target;
        const value = element.value;
        this.setState({ [key]: value });
  
      };

      const body = (
        <div className="ViewApplyBabysitter">
          <div className="ViewApplyBabysitter_jobEntry">
            <PartialJobPost job={ job }/>
          </div>
          <div className="ViewApplyBabysitter_application">
            <h3>APPLICATION</h3>
            <div>
              <textarea onChange={ setValue('coverLetter') } rows={ 3 } cols={ 60 }></textarea>
            </div>
            <button onClick={ actionSubmit }>SUBMIT</button>
          </div>
          <div>{ situation }</div>
        </div>
      );

      const links = MAP_LINKS[type];

      return (<ShellNavigation body={ body } links={ links }/>);

    };

    // render redirection if the user is not logged in
    if (!user) {

      return (<Navigate to="/"/>);

    }

    const { type } = user;

    switch (type) {

      case 'parent': {

        return renderB();

      }

      case 'babysitter': {

        return renderB();

      }

    }

  }

}

export default withSearchParams(ViewApply);
