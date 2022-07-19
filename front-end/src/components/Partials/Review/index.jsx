import React from 'react';

import AppKeys from '@shared/AppKeys';

import './index.css';

const KEY_RATING = AppKeys['RATING']
const KEY_DESCRIPTION = AppKeys['DESCRIPTION']
const KEY_NAME_FROM = AppKeys['NAME_FROM']

class PartialReview extends React.Component {

  render () {

    const { props } = this;

    const { review } = props;

    const {
      [KEY_RATING]: rating,
      [KEY_NAME_FROM]: name_from,
      [KEY_DESCRIPTION]:description
    } = review;

    let starRating = 'Rating: ';
    for ( var i = 0; i < rating; i++) starRating += '⭐';
    return (
      <div style = {{width:'100%', border:'1px solid black'}}>
        <span>{starRating} left by {name_from}</span>
        <p>Review: {description}</p>
      </div>
    );
  };        
}

export default PartialReview;