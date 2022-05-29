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

  render () {

    const { context, state } = this;

    const { strings, user } = context;

    const { situation } = state;

    // render for parents
    const renderA = () => {

      const { applications } = state;

      const { strings } = context;

      const titleJobsAll = strings['TITLE_JOBS_ALL'];

      const makeApplicationElement = (job) => {

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

        this.loadApplications();

      };

      const elementsApplication = applications.map(makeApplicationElement);

      const body = (
        <div className="ViewRequestsBabysitter">
          <div className="ViewRequestsBabysitter_all">
            <button onClick={ actionRefresh }>REFRESH</button>
            <div className="ViewRequestsBabysitter_titleAll">
              <span className="Title_styleA">{ titleJobsAll }</span>
            </div>
            <div className="ViewRequestsBabysitter_listAll">
              { elementsApplication }
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

export default ViewRequests;
