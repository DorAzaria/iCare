import React from 'react';

import AppKeys from '@shared/AppKeys';

import './index.css';

const KEY_NUMBER_USER = AppKeys['NUMBER_USER'];
const KEY_USERNAME = AppKeys['USERNAME']
const KEY_NUM_OF_CHILDREN = AppKeys['NUM_OF_CHILDREN']
const KEY_SHORT_INFO = AppKeys['SHORT_INFO']
const KEY_LOC = AppKeys['LOC']

class PartialParentProfile extends React.Component {

  render () {
    const { props } = this;

    const { sitter } = props;
    if ( sitter === null ) {
      return (<div></div>);
    }
    const {
      [KEY_NUMBER_USER]: key,
      [KEY_USERNAME]: username,
      [KEY_NUM_OF_CHILDREN]: num_of_children,
      [KEY_SHORT_INFO]:short_info,
      [KEY_LOC]:loc,

    } = sitter;


    return (
      <div key={ key } className="PartialSitter_singleSitter">
        <div className="PartialSitter_singleSitterName">
          <span>{ username }</span>
        </div>
        <div className="PartialSitter_singleSitterNumberOfChildren">
          <span>{ num_of_children }</span>
        </div>
        <div className="PartialSitter_singleSitterShortInfo">
          <span>{ short_info }</span>
        </div>
        <div className="PartialSitter_singleSitterLoc">
          <span>{ loc }</span>
        </div>
      </div>
    );

  }

}

export default PartialParentProfile;