import React from 'react';

import AppKeys from '@shared/AppKeys';

import './index.css';

const KEY_NUMBER_USER = AppKeys['NUMBER_USER'];
const KEY_USERNAME = AppKeys['USERNAME']
const KEY_AGE = AppKeys['AGE']
const KEY_EDUCATION = AppKeys['EDUCATION']
const KEY_GENDER = AppKeys['GENDER']
const KEY_CHILD_CARE = AppKeys['CHILD_CARE']
const KEY_SCHOOL_HELP = AppKeys['SCHOOL_HELP']
const KEY_EXP_YEARS = AppKeys['EXP_YEARS']
const KEY_SHORT_INFO = AppKeys['SHORT_INFO']
const KEY_LOC = AppKeys['LOC']

class PartialSitterProfile extends React.Component {

  render () {
    const genderName = ['Male', 'Female'];
    const { props } = this;

    const { sitter } = props;
    if ( sitter === null ) {
      return (<div></div>);
    }
    const {
      [KEY_NUMBER_USER]: key,
      [KEY_USERNAME]: username,
      [KEY_AGE]: age,
      [KEY_GENDER]:gender,
      [KEY_CHILD_CARE]:child_care,
      [KEY_SCHOOL_HELP]:school_help,
      [KEY_EXP_YEARS]:exp_years,
      [KEY_EDUCATION]:education,
      [KEY_SHORT_INFO]:short_info,
      [KEY_LOC]:loc,

    } = sitter;
    const child_care_str = child_care ? 'Child Care' :'';
    const school_help_str = school_help ? 'School Help':'';
    const edu_exp = exp_years + ' Years: ' + education ;


    return (
      <div key={ key } className="PartialSitter_singleSitter">
        <div className="PartialSitter_singleSitterName">
          <span>{ username }</span>
        </div>
        <div className="PartialSitter_singleSitterAge">
          <span>{ age }</span>
        </div>
        <div className="PartialSitter_singleSitterGender">
          <span>{ genderName[gender] }</span>
        </div>
        <div className = "PartialSitter_singleSitterSkills">
          <span style = {{color:'blue'}}> {child_care_str} </span>
          <span style = {{color:'red'}}> {school_help_str} </span>
        </div>
        <div className="PartialSitter_singleSitterExp">
          <span>{ edu_exp }</span>
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

export default PartialSitterProfile;