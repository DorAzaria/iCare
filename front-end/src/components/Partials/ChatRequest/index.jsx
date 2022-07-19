import React from 'react';

import AppKeys from '@shared/AppKeys';

import './index.css';

const KEY_FIRST_NAME = AppKeys['FIRST_NAME'];
const KEY_LAST_NAME = AppKeys['LAST_NAME'];
const KEY_COVER_LETTER = AppKeys['COVER_LETTER'];

class PartialChatRequest extends React.Component {

  render () {

    const { props } = this;

    const { application } = props;

    const {
      [KEY_FIRST_NAME]: firstName,
      [KEY_LAST_NAME]: lastName,
      [KEY_COVER_LETTER]: coverLetter,
    } = application;

    return (
      <div className="PartialChatRequest">
        <div className="PartialChatRequest_firstName">{ firstName }</div>
        <div className="PartialChatRequest_lastName">{ lastName }</div>
        <div className="PartialChatRequest_coverLetter">{ coverLetter }</div>
      </div>
    );

  }

}

export default PartialChatRequest;