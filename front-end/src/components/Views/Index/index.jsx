import React from 'react';

import { Link, Navigate } from 'react-router-dom';

import AppContext from '@contexts/App';

import ShellMainGate from '@components/Shells/MainGate';
import ShellNavigation from '@components/Shells/Navigation';

import Links from '@shared/Links';

import './index.css';

const MAP_LINKS = Links['MAP_LINKS'];

class ViewIndex extends React.Component {

  static contextType = AppContext;

  render () {

    const { context } = this;

    const { strings, user } = context;

    // render for when the user is logged in.
    const renderA = () => {

      const { type } = user;

      const body = (
        <div></div>
      );

      const links = MAP_LINKS[type];

      return (<ShellNavigation body={ body } links={ links }/>);

    };

    // render for when the user is not logged in.
    const renderB = () => {

      const warning = strings['WARNING_NOT_LOGGED'];
      const labelRegister = strings['LABEL_REGISTER'];
      const labelLogIn = strings['LABEL_LOG_IN'];

      const body = (
        <div className="ViewIndexMainGate">
          <span className="ViewIndexMainGate_warning">{ warning }</span>
          <nav className="ViewIndexMainGate_navigation Layout_centralColumn">
            <Link className="Button_navigation" to="/register">{ labelRegister }</Link>
            <Link className="Button_navigation" to="/log-in">{ labelLogIn }</Link>
          </nav>
        </div>
      );

      return (<ShellMainGate body={ body }/>);

    };

    if (user) { // logged-in

      return renderA();

    } else { // not logged-in

      return renderB();

    }

  }

}

export default ViewIndex;
