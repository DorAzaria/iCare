import React from 'react';

import { Link, Navigate } from 'react-router-dom';

import AppContext from '@contexts/App';

import ShellNavigation from '@components/Shells/Navigation';

import PartialSitter from '@components/Partials/Sitter';

import DatabaseDriver from '@database/Driver';

import AppKeys from '@shared/AppKeys';
import Links from '@shared/Links';

import './index.css';

const KEY_NUMBER_USER = AppKeys['NUMBER_USER']
const KEY_NUMBER_FROM = AppKeys['NUMBER_FROM'];

const MAP_LINKS = Links['MAP_LINKS'];

class ViewWatches extends React.Component {


    static contextType = AppContext;

    constructor(props) {
      super(props);
  
      this.state = {
        title: '',
        description: '',
        timeA: 0,
        timeB: 0,
        situation: '',
        sitters: [],
      };
  
    }
  
    componentDidMount() {
  
      this.loadWatches();
  
    }
  
    loadWatches () {
  
      const { context } = this;
  
      const { user } = context;
      console.log ( user);
      
      if ( user != null ) {
        const parameters = {
          [KEY_NUMBER_FROM]: user['number'],
        };
  
  
  
      DatabaseDriver.loadWatches(parameters)
        .then((sitters) => {
          console.log ( sitters);
          this.setState({ sitters: sitters });
  
        })
        .catch((error) => {
  
  
        });  
      }
    }

  render () {

    const { context, state } = this;

    const { user } = context;

    // render for babysitters
    const renderA = () => {

      const { sitters } = state;

      const { strings } = context;

      const labelProfile = strings['LABEL_PROFILE'];

      const makeSitterElement = (sitter) => {

        const {
          [KEY_NUMBER_USER]: key,
        } = sitter;

        const sitterProfileLink = `/sitter-profile?${ KEY_NUMBER_USER }=${ key }`;

        return (
          <div key={ key } className="ViewJobsBabysitter_jobEntry">
            <PartialSitter sitter={ sitter }/>
            <Link to={ sitterProfileLink } className="Button_navigation">{labelProfile}</Link>
          </div>
        );

      };

      const elementsSitter= sitters.map(makeSitterElement);
      
      const body = (
        <div className="ViewJobsBabysitter">
          <div className="ViewJobsBabysitter_all">
            <div className="ViewJobsBabysitter_titleAll">
              <span className="Title_styleA">My Watch List</span>
            </div>
            <div className="ViewJobsBabysitter_listAll">
              { elementsSitter }
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

        return (<Navigate to="/"/>);

      }

      default:{
        return (<Navigate to="/"/>);
      }

    }

  }

}

export default ViewWatches;
