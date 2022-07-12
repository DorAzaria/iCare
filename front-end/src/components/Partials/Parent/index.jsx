import React from 'react';

import AppKeys from '@shared/AppKeys';

import './index.css';

const KEY_NUMBER_USER = AppKeys['NUMBER_USER'];
const KEY_USERNAME = AppKeys['USERNAME']
const KEY_NUM_OF_CHILDREN = AppKeys['NUM_OF_CHILDREN']

class PartialParent extends React.Component {

  render () {
    const { props } = this;

    const { parent } = props;

    const {
      [KEY_NUMBER_USER]: key,
      [KEY_USERNAME]: username,
      [KEY_NUM_OF_CHILDREN]:num_of_children,
    } = parent;

    return (
      <div key={ key } className="PartialParent_singleParent">
        <div className="PartialParent_singleParentName">
          <span>{ username }</span>
        </div>
        <div className="PartialParent_singleParentGender">
          <span>{ num_of_children }</span>
        </div>
      </div>
    );

  }

}

export default PartialParent;