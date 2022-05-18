import React from 'react';

import { Link, Navigate } from 'react-router-dom';

import AppContext from '@contexts/App';

import ShellNavigation from '@components/Shells/Navigation';

import DatabaseDriver from '@database/Driver';

import AppKeys from '@shared/AppKeys';
import ErrorCodes from '@shared/ErrorCodes';
import Links from '@shared/Links';

import './index.css';

const KEY_DESCRIPTION = AppKeys['DESCRIPTION'];
const KEY_ERROR_CODE = AppKeys['ERROR_CODE'];
const KEY_SESSION = AppKeys['SESSION'];
const KEY_NUMBER_PARENT = AppKeys['NUMBER_PARENT'];
const KEY_TIME_A = AppKeys['TIME_A'];
const KEY_TIME_B = AppKeys['TIME_B'];
const KEY_TITLE = AppKeys['TITLE'];

const MAP_LINKS = Links['MAP_LINKS'];

class ViewJobs extends React.Component {

  static contextType = AppContext;

  constructor(props) {
    super(props);

    this.state = {
      title: '',
      description: '',
      timeA: 0,
      timeB: 0,
      situation: '',
      jobs: [],
    };

    this.loadJobs();

  }

  loadJobs () {

    const { context } = this;

    const { user } = context;

    const { number } = user;

    const parameters = {
      [KEY_NUMBER_PARENT]: number,
    };

    DatabaseDriver.loadJobs(parameters)
      .then((jobs) => { console.log('jobs: ', jobs);

        this.setState({ jobs: jobs });

      })
      .catch((error) => { console.log('error: ', error);


      });

  }

  render () {

    const { context, state } = this;

    const { strings, user } = context;

    const { situation } = state;

    // render for parents
    const renderA = () => {

      const { title, description, timeA, timeB, situation } = state;

      const { session } = user;

      const titleJobsAll = strings['TITLE_JOBS_ALL'];
      const titleJobsNew = strings['TITLE_JOBS_NEW'];

      const labelDescription = strings['LABEL_DESCRIPTION'];
      const labelScheduleStart = strings['LABEL_SCHEDULE_START'];
      const labelScheduleEnd = strings['LABEL_SCHEDULE_END'];
      const labelSubmit = strings['LABEL_SUBMIT'];
      const labelTitle = strings['LABEL_TITLE'];

      const situationFail = strings['MESSAGE_JOBS_FAIL'];
      const situationSuccess = strings['MESSAGE_JOBS_SUCCESS'];
      const situationTry = strings['MESSAGE_JOBS_TRY'];

      const setValue = (key) => (event) => {

        const element = event.target;
        const value = element.value;
        this.setState({ [key]: value });
  
      };

      const setTime = (key) => (event) => {

        const element = event.target;
        const date = element.valueAsDate;

        if (date) {

          const time = date.getTime();
          this.setState({ [key]: time });

        }

      };

      const actionSubmit = () => {

        const request = {
          [KEY_SESSION]: session,
          [KEY_TITLE]: title,
          [KEY_DESCRIPTION]: description,
          [KEY_TIME_A]: timeA,
          [KEY_TIME_B]: timeB,
        };
  
        const jobsFail = () => {
  
          this.setState({ situation: situationFail });
  
        };
  
        const jobsSuccess = (response) => {
  
          this.setState({ situation: situationSuccess });

          // reload jobs to refresh "all jobs" list
          this.loadJobs();
  
        };
  
        const jobsTry = () => {
  
          DatabaseDriver.saveJob(request)
            .then((response) => {
  
              const errorCode = response[KEY_ERROR_CODE];
  
              if (errorCode !== ErrorCodes['ERROR_NONE']) {
  
                jobsFail();
  
              } else {
  
                jobsSuccess(response);
  
              }
  
            }).catch((error) => {
  
              jobsFail();
  
            });
  
        };
  
        this.setState({ situation: situationTry }, jobsTry);

      };

      const body = (
        <div className="ViewJobs">
          <div className="ViewJobs_all">
            <div className="ViewJobs_titleAll">
              <span className="Title_styleA">{ titleJobsAll }</span>
            </div>
          </div>
          <div className="ViewJobs_new Layout_lateralColumn">
            <div className="ViewJobs_titleNew">
              <span className="Title_styleA">{ titleJobsNew }</span>
            </div>
            <div className="Layout_labeledInput">
              <div className="Layout_inputLabel">
                <span>{ labelTitle }</span>
              </div>
              <div className="Layout_inputField">
                <input type="text" onChange={ setValue('title') } />
              </div>
            </div>
            <div className="Layout_labeledInput">
              <div className="Layout_inputLabel">
                <span>{ labelDescription }</span>
              </div>
              <div className="Layout_inputField">
                <textarea onChange={ setValue('description') }></textarea>
              </div>
            </div>
            <div className="Layout_labeledInput">
              <div className="Layout_inputLabel">
                <span>{ labelScheduleStart }</span>
              </div>
              <div className="Layout_inputField">
                <input type="date" onChange={ setTime('timeA') } />
              </div>
            </div>
            <div className="Layout_labeledInput">
              <div className="Layout_inputLabel">
                <span>{ labelScheduleEnd }</span>
              </div>
              <div className="Layout_inputField">
                <input type="date" onNChange={ setTime('timeB') }/>
              </div>
            </div>
            <button className="Button_navigation" onClick={ actionSubmit }>{ labelSubmit }</button>
            <div class="Layout_alwaysFilled">{ situation }</div>
          </div>
        </div>
      );

      const links = MAP_LINKS[type];

      return (<ShellNavigation body={ body } links={ links }/>);

    };

    // render for babysitters
    const renderB = () => {

      return (<div>TODO: babysitter</div>);

    };

    // render redirection if the user is not logged in
    if (!user) {

      return (<Navigate to="/"/>);

    }

    const { type } = user;

    switch (type) {

      case 'parent': {

        return renderA();

      }

      case 'babysitter': {

        return renderB();

      }

    }

  }

}

export default ViewJobs;