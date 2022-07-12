import React from 'react';

import { Link, Navigate } from 'react-router-dom';

import AppContext from '@contexts/App';

import ShellNavigation from '@components/Shells/Navigation';
import PartialChatRequest from '@components/Partials/ChatRequest';
import PartialJobPost from '@components/Partials/JobPost';

import DatabaseDriver from '@database/Driver';

import AppKeys from '@shared/AppKeys';
import ErrorCodes from '@shared/ErrorCodes';
import Links from '@shared/Links';

import './index.css';

const KEY_APPLICATIONS = AppKeys['APPLICATIONS'];
const KEY_COVER_LETTER = AppKeys['COVER_LETTER'];
const KEY_DESCRIPTION = AppKeys['DESCRIPTION'];
const KEY_ERROR_CODE = AppKeys['ERROR_CODE'];
const KEY_FIRST_NAME = AppKeys['FIRST_NAME'];
const KEY_LAST_NAME = AppKeys['LAST_NAME'];
const KEY_JOB = AppKeys['JOB'];
const KEY_SESSION = AppKeys['SESSION'];
const KEY_NUMBER_APPLICATION = AppKeys['NUMBER_APPLICATION'];
const KEY_NUMBER_CHAT = AppKeys['NUMBER_CHAT'];
const KEY_NUMBER_USER =  AppKeys['NUMBER_USER'];
const KEY_NUMBER_JOB = AppKeys['NUMBER_JOB'];
const KEY_REGISTRATION_TYPE = AppKeys['REGISTRATION_TYPE'];
const KEY_TIME_A = AppKeys['TIME_A'];
const KEY_TIME_B = AppKeys['TIME_B'];
const KEY_TITLE = AppKeys['TITLE'];
const KEY_APPLIED_JOBS = AppKeys['APPLIED_JOBS']
const KEY_POSTED_JOBS = AppKeys['POSTED_JOBS']

const MAP_LINKS = Links['MAP_LINKS'];

class ViewRequests extends React.Component {

  static contextType = AppContext;

  constructor(props) {
    super(props);

    this.state = {
      title: '',
      description: '',
      timeA: 0,
      timeB: 0,
      situation: '',
      posted_jobs: [],
      applied_jobs:[]
    };

  }

  componentDidMount() {

    this.loadApplications();

  }

  loadApplications () {

    const { context } = this;

    const { user } = context;

    const { number, type } = user;

    const parameters = {
      [KEY_NUMBER_USER]: number,
      [KEY_REGISTRATION_TYPE]: type,
    };

    DatabaseDriver.loadApplications(parameters)
      .then((data) => {
        console.log ( data)
        this.setState({ applied_jobs: data[KEY_APPLIED_JOBS] });
        this.setState({ posted_jobs: data[KEY_POSTED_JOBS] });
      })
      .catch((error) => {


      });

  }

  render () {

    const { context, state } = this;

    const { strings, user } = context;

    const { title, description, timeA, timeB, situation } = state;

    const { session } = user;

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
            console.log ( 'Saving Job Response');
            console.log ( response);
            const errorCode = response[KEY_ERROR_CODE];

            if (errorCode === ErrorCodes['ERROR_NONE']) {

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

    const addNewJobDiv = 
      <div className="ViewRequests_addNewJob">
        <div className="ViewJobsParent_titleNew">
          <span className="Title_styleA">{ titleJobsNew }</span>
        </div>
        <div>
          <div className="Layout_inputLabel">
            <span style = {{color:'blue'}}>{ labelTitle }: </span>
            <input style = {{width:'100%'}} type="text" onChange={ setValue('title') } />
          </div>
        </div>
        <div>
          <div className="Layout_inputLabel">
            <span style = {{color:'blue'}} >{ labelDescription }: </span>
          </div>
          <textarea style = {{width:'100%'}}onChange={ setValue('description') }></textarea>
        </div>
        <div>
          <div className="Layout_inputLabel">
            <span style = {{color:'blue'}}>{ labelScheduleStart }: </span>
            <input style = {{width:'100%'}} type="datetime-local" onChange={ setTime('timeA') } />
          </div>
        </div>
        <div>
          <div className="Layout_inputLabel">
            <span style = {{color:'blue'}}>{ labelScheduleEnd }: </span>
            <input style = {{width:'100%'}}type="datetime-local" onChange={ setTime('timeB') }/>
          </div>
        </div>
        <button className="Button_navigation" onClick={ actionSubmit }>{ labelSubmit }</button>
        <div className="Layout_alwaysFilled">{ situation }</div>
      </div>

    // render for parents
    const renderA = () => {

      const { posted_jobs, applied_jobs } = state;

      const { strings } = context;

      const titlePostedJobs = strings['TITLE_POSTED_JOBS'];
      const titleAppliedJobs = strings['TITLE_APPLIED_JOBS'];

      const makePostedJobElement = (application) => {

        const {
          [KEY_NUMBER_APPLICATION]: numberApplication,
        } = posted_jobs;

        const chatLink = `/chat?application=${ numberApplication }`;
        const posted_key = 'posted_job_' + numberApplication;
        return (
          <div key={ posted_key }>
            <PartialChatRequest application={ application }/>
            <Link to={ chatLink } className="Button_navigation">CHAT</Link>
          </div>
        );

      };

      const makePostedJobsElement = (jobApplication) => {

        const {
          [KEY_NUMBER_APPLICATION]: key,
          [KEY_APPLICATIONS]: applications,
        } = jobApplication;

        const elementsApplication = applications.map(makePostedJobElement);
        const application_key = 'application_' + key;
        return (
          <div key={ application_key } className="ViewRequestsParent_singleApplication">
            <PartialJobPost job={ jobApplication }/>
            <div className="ViewRequestsParent_applications">
              { elementsApplication }
            </div>
          </div>
        );

      };

      const makeAppliedJobElement = (jobApplication) => {

        const {
          [KEY_JOB]: job,
          [KEY_NUMBER_APPLICATION]: key,
          [KEY_NUMBER_CHAT]: numberChat,
        } = jobApplication;

        let chatLink = null;

        if (numberChat) {

          const link = `/chat?application=${ key }`;
          chatLink = (<Link to={ link } className="Button_navigation">CHAT</Link>);

        } else {

          chatLink = (<button className="Button_disabled">NO CHAT YET</button>);

        }
        const applied_job_key = 'applied_job_' + key;

        return (
          <div key={ applied_job_key } className="ViewRequestsBabysitter_singleApplication">
            <PartialJobPost job={ job }/>
            <div className="ViewRequestsBabysitter_applications">
              <PartialChatRequest application={ jobApplication }/>
              { chatLink }
            </div>
          </div>
        );

      };      

      const actionRefresh = () => {

        this.loadApplications();

      };
      console.log ( posted_jobs)
      const elementsPostedJob = posted_jobs.map(makePostedJobsElement);
      const elementsAppliedJob = applied_jobs.map(makeAppliedJobElement);

      const body = (
        <div className="ViewRequestsParent">
          {addNewJobDiv}
          <button onClick={ actionRefresh }>REFRESH</button>
          <div className="ViewRequestsParent_titleAll">
            <span className="Title_styleA">{ titlePostedJobs }</span>
          </div>
          <div className="ViewRequestsParent_listAll">
            { elementsPostedJob }
          </div>
          <div className="ViewRequestsBabysitter_titleAll">
              <span className="Title_styleA">{ titleAppliedJobs }</span>
          </div>
          <div className="ViewRequestsBabysitter_listAll">
            { elementsAppliedJob }
          </div>          
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

        return renderA();

      }

      case 'babysitter': {

        return renderA();

      }

    }

  }

}

export default ViewRequests;
