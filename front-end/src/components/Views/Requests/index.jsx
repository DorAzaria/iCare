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

const MAP_LINKS = Links['MAP_LINKS'];

class ViewRequests extends React.Component {

  static contextType = AppContext;

  constructor(props) {
    super(props);

    this.state = {
      situation: '',
      applications: [],
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
      .then((applications) => {

        this.setState({ applications: applications });

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

      const { applications } = state;

      const { strings } = context;

      const titleJobsAll = strings['TITLE_JOBS_ALL'];

      const makeApplicationElement = (application) => {

        const {
          [KEY_NUMBER_APPLICATION]: numberApplication,
        } = application;

        const chatLink = `/chat?application=${ numberApplication }`;

        return (
          <div key={ numberApplication }>
            <PartialChatRequest application={ application }/>
            <Link to={ chatLink } className="Button_navigation">CHAT</Link>
          </div>
        );

      };

      const makeJobApplicationsElement = (jobApplication) => {

        const {
          [KEY_NUMBER_APPLICATION]: key,
          [KEY_APPLICATIONS]: applications,
        } = jobApplication;

        const elementsApplication = applications.map(makeApplicationElement);

        return (
          <div key={ key } className="ViewRequestsParent_singleApplication">
            <PartialJobPost job={ jobApplication }/>
            <div className="ViewRequestsParent_applications">
              { elementsApplication }
            </div>
          </div>
        );

      };

      const actionRefresh = () => {

        this.loadApplications();

      };

      const elementsJobApplication = applications.map(makeJobApplicationsElement);

      const body = (
        <div className="ViewRequestsParent">
          <div className="ViewRequestsParent_all">
            <button onClick={ actionRefresh }>REFRESH</button>
            <div className="ViewRequestsParent_titleAll">
              <span className="Title_styleA">{ titleJobsAll }</span>
            </div>
            <div className="ViewRequestsParent_listAll">
              { elementsJobApplication }
            </div>
          </div>
        </div>
      );

      const links = MAP_LINKS[type];

      return (<ShellNavigation body={ body } links={ links }/>);

    };

    // render for babysitters
    const renderB = () => {

      const { applications } = state;

      const { strings } = context;

      const titleJobsAll = strings['TITLE_JOBS_ALL'];

      const makeJobApplicationElement = (jobApplication) => {

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

        return (
          <div key={ key } className="ViewRequestsBabysitter_singleApplication">
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

      const elementsJobApplication = applications.map(makeJobApplicationElement);

      const body = (
        <div className="ViewRequestsBabysitter">
          <div className="ViewRequestsBabysitter_all">
            <button onClick={ actionRefresh }>REFRESH</button>
            <div className="ViewRequestsBabysitter_titleAll">
              <span className="Title_styleA">{ titleJobsAll }</span>
            </div>
            <div className="ViewRequestsBabysitter_listAll">
              { elementsJobApplication }
            </div>
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

        return renderB();

      }

    }

  }

}

export default ViewRequests;
