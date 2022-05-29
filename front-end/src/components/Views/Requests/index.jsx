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
const KEY_NUMBER_JOB = AppKeys['NUMBER_JOB'];
const KEY_TIME_A = AppKeys['TIME_A'];
const KEY_TIME_B = AppKeys['TIME_B'];
const KEY_TITLE = AppKeys['TITLE'];

const MAP_LINKS = Links['MAP_LINKS'];

class ViewRequests extends React.Component {

  static contextType = AppContext;

  constructor(props) {
    super(props);

    this.state = {
<<<<<<< HEAD
      situation: '',
      applications: [],
=======
      title: '',
      description: '',
      timeA: 0,
      timeB: 0,
      situation: '',
      jobs: [],
>>>>>>> f90934e74bea4c80cdfc1ca59ce3985dc9d34365
    };

  }

  componentDidMount() {

<<<<<<< HEAD
    this.loadApplications();

  }

  loadApplications () {
=======
    this.loadJobs();

  }

  loadJobs () {
>>>>>>> f90934e74bea4c80cdfc1ca59ce3985dc9d34365

    const { context } = this;

    const { user } = context;

    const { number, type } = user;

    let parameters;

    if (type == 'parent') {

      parameters = {
        [KEY_NUMBER_PARENT]: number,
      };

    }

<<<<<<< HEAD
    DatabaseDriver.loadApplications(parameters)
      .then((applications) => {

        this.setState({ applications: applications });
=======
    DatabaseDriver.loadJobs(parameters)
      .then((jobs) => {

        this.setState({ jobs: jobs });
>>>>>>> f90934e74bea4c80cdfc1ca59ce3985dc9d34365

      })
      .catch((error) => {


      });

  }

  render () {

    const { context, state } = this;

    const { strings, user } = context;

    const { situation } = state;

    // render for parents
    const renderA = () => {

<<<<<<< HEAD
      const { applications } = state;
=======
      const { title, description, timeA, timeB, situation, jobs } = state;

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

      const makeJobElement = (job) => {

        const {
          [KEY_NUMBER_JOB]: key,
          [KEY_TITLE]: title,
          [KEY_DESCRIPTION]: description,
          [KEY_TIME_A]: timeA,
          [KEY_TIME_B]: timeB,
        } = job;

        const dateA = new Date(timeA);
        const dateB = new Date(timeB);

        const labelTimeA = dateA.toISOString();
        const labelTimeB = dateB.toISOString();

        return (
          <div key={ key } className="ViewRequestsParent_singleJob">
            <div className="ViewRequestsParent_singleJobTitle">
              <span className="Title_styleB">{ title }</span>
            </div>
            <div className="ViewRequestsParent_singleJobDescription">
              <span>{ description }</span>
            </div>
            <div className="ViewRequestsParent_singleJobTimeA">
              <span>{ labelTimeA }</span>
            </div>
            <div className="ViewRequestsParent_singleJobTimeB">
              <span>{ labelTimeB }</span>
            </div>
          </div>
        );

      };

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

      const elementsJob = jobs.map(makeJobElement);

      const body = (
        <div className="ViewRequestsParent">
          <div className="ViewRequestsParent_all">
            <div className="ViewRequestsParent_titleAll">
              <span className="Title_styleA">{ titleJobsAll }</span>
            </div>
            <div className="ViewRequestsParent_listAll">
              { elementsJob }
            </div>
          </div>
          <div className="ViewRequestsParent_new Layout_lateralColumn">
            <div className="ViewRequestsParent_titleNew">
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
                <input type="datetime-local" onChange={ setTime('timeA') } />
              </div>
            </div>
            <div className="Layout_labeledInput">
              <div className="Layout_inputLabel">
                <span>{ labelScheduleEnd }</span>
              </div>
              <div className="Layout_inputField">
                <input type="datetime-local" onNChange={ setTime('timeB') }/>
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

      const { jobs } = state;
>>>>>>> f90934e74bea4c80cdfc1ca59ce3985dc9d34365

      const { strings } = context;

      const titleJobsAll = strings['TITLE_JOBS_ALL'];

<<<<<<< HEAD
      const makeApplicationElement = (job) => {
=======
      const makeJobElement = (job) => {
>>>>>>> f90934e74bea4c80cdfc1ca59ce3985dc9d34365

        const {
          [KEY_NUMBER_JOB]: key,
          [KEY_TITLE]: title,
          [KEY_DESCRIPTION]: description,
          [KEY_TIME_A]: timeA,
          [KEY_TIME_B]: timeB,
        } = job;

        const dateA = new Date(timeA);
        const dateB = new Date(timeB);

        const labelTimeA = dateA.toISOString();
        const labelTimeB = dateB.toISOString();

        const applyLink = `/apply?${ KEY_NUMBER_JOB }=${ key }`;

        return (
          <div key={ key } className="ViewRequestsBabysitter_singleJob">
            <div className="ViewRequestsBabysitter_singleJobTitle">
              <span className="Title_styleB">{ title }</span>
            </div>
            <div className="ViewRequestsBabysitter_singleJobDescription">
              <span>{ description }</span>
            </div>
            <div className="ViewRequestsBabysitter_singleJobTimeA">
              <span>{ labelTimeA }</span>
            </div>
            <div className="ViewRequestsBabysitter_singleJobTimeB">
              <span>{ labelTimeB }</span>
            </div>
            <Link to={ applyLink } className="Button_navigation">APPLY</Link>
          </div>
        );

      };

      const actionRefresh = () => {

<<<<<<< HEAD
        this.loadApplications();

      };

      const elementsApplication = applications.map(makeApplicationElement);
=======
        this.loadJobs();

      };

      const elementsJob = jobs.map(makeJobElement);
>>>>>>> f90934e74bea4c80cdfc1ca59ce3985dc9d34365

      const body = (
        <div className="ViewRequestsBabysitter">
          <div className="ViewRequestsBabysitter_all">
            <button onClick={ actionRefresh }>REFRESH</button>
            <div className="ViewRequestsBabysitter_titleAll">
              <span className="Title_styleA">{ titleJobsAll }</span>
            </div>
            <div className="ViewRequestsBabysitter_listAll">
<<<<<<< HEAD
              { elementsApplication }
=======
              { elementsJob }
>>>>>>> f90934e74bea4c80cdfc1ca59ce3985dc9d34365
            </div>
          </div>
        </div>
      );

      const links = MAP_LINKS[type];

      return (<ShellNavigation body={ body } links={ links }/>);

    };

<<<<<<< HEAD
    // render for babysitters
    const renderB = () => {

    };

=======
>>>>>>> f90934e74bea4c80cdfc1ca59ce3985dc9d34365
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

export default ViewRequests;
