import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

import AppContext from '@contexts/App';

import './index.css';

// This is the shell for users that are not logged-in.
// Because they are not logged-in, they're outside at the main gate.
class ShellMainGate extends React.Component {

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
      <div className="ShellMainGate">
        <div className="ShellMainGate_head">
          <Link className="ShellMainGate_headTitle" to="/">{ appTitle }</Link>
        </div>
        <div className="ShellMainGate_body">{ body }</div>
      </div>
    );

  }

}

ShellMainGate.propTypes = {
  body: PropTypes.element.isRequired
};

export default ShellMainGate;
