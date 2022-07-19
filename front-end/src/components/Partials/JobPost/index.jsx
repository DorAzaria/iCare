import React from 'react';

import AppKeys from '@shared/AppKeys';

import './index.css';

const KEY_DESCRIPTION = AppKeys['DESCRIPTION'];
const KEY_TIME_A = AppKeys['TIME_A'];
const KEY_TIME_B = AppKeys['TIME_B'];
const KEY_TITLE = AppKeys['TITLE'];

class PartialJobPost extends React.Component {

  render () {

    const { props } = this;

    const { job } = props;
    if ( job === null ) {
      return (<div></div>);
    }

    const {
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
      <div className="PartialJobPost_singleJob">
        <div className="PartialJobPost_singleJobTitle">
          <span className="Title_styleB">{ title }</span>
        </div>
        <div className="PartialJobPost_singleJobDescription">
          <span>{ description }</span>
        </div>
        <div className="PartialJobPost_singleJobTimeA">
          <span>{ labelTimeA }</span>
        </div>
        <div className="PartialJobPost_singleJobTimeB">
          <span>{ labelTimeB }</span>
        </div>
      </div>
    );

  }

}

export default PartialJobPost;