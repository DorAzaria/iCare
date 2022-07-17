import React from 'react';

import AppKeys from '@shared/AppKeys';

import './index.css';

const KEY_DESCRIPTION = AppKeys['DESCRIPTION']
const KEY_NAME_FROM = AppKeys['NAME_FROM']
const KEY_REPLYS = AppKeys['REPLYS']
const KEY_NUMBER_REPLY = AppKeys['NUMBER_REPLY']

class PartialComment extends React.Component {

  render () {

    const { props } = this;

    const { comment } = props;

    const {
      [KEY_NAME_FROM]: name_from,
      [KEY_DESCRIPTION]:description,
      [KEY_REPLYS]:replys
    } = comment;

    const makeReplyElement = (reply) => {
      const {
        [KEY_NUMBER_REPLY]:key,
        [KEY_NAME_FROM]: name_from,
        [KEY_DESCRIPTION]:description,
      } = reply;
      const reply_key = 'reply_' + key;
      return (
        <div key={ reply_key } style = {{marginLeft:20, border:'1px solid black'}}>
          <span style = {{color:'red'}}>Reply</span> <span> left by {name_from}</span>
          <p>{description}</p>
        </div>        
      );
    }

    const elementsReply = replys.map(makeReplyElement)


    return (
      <div style = {{width:'100%', border:'2px solid red'}}>
        <span style = {{color:'blue'}}>Comment</span> <span> left by {name_from}</span>
        <p>{description}</p>
        {elementsReply}
      </div>
    );
  };        
}

export default PartialComment;