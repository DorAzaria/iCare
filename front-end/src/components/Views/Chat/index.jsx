import React from 'react';

import { Link, Navigate } from 'react-router-dom';

import AppContext from '@contexts/App';

import ShellNavigation from '@components/Shells/Navigation';
import PartialChatRequest from '@components/Partials/ChatRequest';

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
const KEY_SESSION = AppKeys['SESSION'];
const KEY_NUMBER_APPLICATION = AppKeys['NUMBER_APPLICATION'];
const KEY_NUMBER_PARENT = AppKeys['NUMBER_PARENT'];
const KEY_NUMBER_JOB = AppKeys['NUMBER_JOB'];
const KEY_TIME_A = AppKeys['TIME_A'];
const KEY_TIME_B = AppKeys['TIME_B'];
const KEY_TITLE = AppKeys['TITLE'];

const MAP_LINKS = Links['MAP_LINKS'];

class ViewChat extends React.Component {

  static contextType = AppContext;

  constructor(props) {
    super(props);

    this.state = {
      situation: '',
      applications: [],
    };

  }

  componentDidMount() {

    // this.loadApplications();

  }

  loadApplications () {

    const { context } = this;

    const { user } = context;

    const { number, type } = user;

    let parameters;

    if (type == 'parent') {

      parameters = {
        [KEY_NUMBER_PARENT]: number,
      };

    }

    DatabaseDriver.loadApplications(parameters)
      .then((applications) => {

        this.setState({ applications: applications });

      })
      .catch((error) => {


      });

  }

  render () { return (<div>CHAT PAGE</div>);

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
          [KEY_NUMBER_JOB]: key,
          [KEY_TITLE]: title,
          [KEY_DESCRIPTION]: description,
          [KEY_TIME_A]: timeA,
          [KEY_TIME_B]: timeB,
          [KEY_APPLICATIONS]: applications,
        } = jobApplication;

        const dateA = new Date(timeA);
        const dateB = new Date(timeB);

        const labelTimeA = dateA.toISOString();
        const labelTimeB = dateB.toISOString();

        const elementsApplication = applications.map(makeApplicationElement);

        return (
          <div key={ key } className="ViewChatParent_singleJob">
            <div className="ViewChatParent_singleJobTitle">
              <span className="Title_styleB">{ title }</span>
            </div>
            <div className="ViewChatParent_singleJobDescription">
              <span>{ description }</span>
            </div>
            <div className="ViewChatParent_singleJobTimeA">
              <span>{ labelTimeA }</span>
            </div>
            <div className="ViewChatParent_singleJobTimeB">
              <span>{ labelTimeB }</span>
            </div>
            <div className="ViewChatParent_applications">
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
        <div className="ViewChatParent">
          <div className="ViewChatParent_all">
            <button onClick={ actionRefresh }>REFRESH</button>
            <div className="ViewChatParent_titleAll">
              <span className="Title_styleA">{ titleJobsAll }</span>
            </div>
            <div className="ViewChatParent_listAll">
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

export default ViewChat;
