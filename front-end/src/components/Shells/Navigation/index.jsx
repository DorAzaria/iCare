import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

import AppContext from '@contexts/App';

import './index.css';

class ShellNavigation extends React.Component {

  static contextType = AppContext;

  constructor(props) {
    super(props);
  }

  render () {

    const { props, context } = this;

    const { body } = props;

    const { strings } = context;

    const appTitle = strings['TITLE_APP'];

    return (
      <div className="ShellNavigation">
        <div className="ShellNavigation_head">
          <Link className="ShellNavigation_headTitle" to="/">{ appTitle }</Link>
        </div>
        <nav className="ShellNavigation_bar">
          <Link to="/"></Link>    
        </nav>
        <div className="ShellNavigation_body">{ body }</div>
      </div>
    );

  }

}

ShellNavigation.propTypes = {
  body: PropTypes.element.isRequired
};

export default ShellNavigation;
