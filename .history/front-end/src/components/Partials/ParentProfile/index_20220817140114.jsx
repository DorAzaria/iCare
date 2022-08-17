import React from 'react';

import AppKeys from '@shared/AppKeys';

import './index.css';

import { Link } from 'react-router-dom';

import { Card, CardHeader, CardBody, CardFooter, CardTitle, CardSubtitle, CardText, Col} from 'reactstrap';

const KEY_NUMBER_USER = AppKeys['NUMBER_USER'];
const KEY_USERNAME = AppKeys['USERNAME'];
const KEY_NUM_OF_CHILDREN = AppKeys['NUM_OF_CHILDREN'];
const KEY_SHORT_INFO = AppKeys['SHORT_INFO'];
const KEY_LOC = AppKeys['LOC'];
const SERVER_PROFILE_URL = AppKeys['SERVER_PROFILE_URL'];

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
      description,
      userAvatar,
      city
    } = sitter;

    const profileUrl = userAvatar ? SERVER_PROFILE_URL + userAvatar : 'logo.png';
    const parentProfileLink = `/parent-profile?${ KEY_NUMBER_USER }=${ key }`;
    const labelProfile = 'Profile';


    return (
      <Col className = "PartialParent_singleParent container" key={ key }>
      <Card  color = "plum" outline>
        <CardHeader>
          <img src = {profileUrl} style={{float:'left'}} className = "avatar" alt="user-profile"></img>
          <div style = {{float:'left', textAlign:'center', color:'gray', paddingLeft:20, marginTop: 20}}>
            <CardTitle tag = "h4" style={{color:'black'}}>{ username }</CardTitle>
            <CardSubtitle tag = "h6">{city}</CardSubtitle>
          </div>
        </CardHeader>
        <CardBody  style = {{height:150}}>
          <CardSubtitle tag = "h7">Information:</CardSubtitle>
          <CardText style = {{ color:'black'}} tag = "h6">
            {description}
          </CardText>

        </CardBody>
        <CardFooter style = {{color:'white', backgroundColor:'plum', textAlign:'right'}}>
          <span style = {{float:'left', paddingRight:20}}> Number Of Children: 
            <span style = {{color:'white', fontWeight: 700}}> {num_of_children} </span> 
          </span>
          <Link to={ parentProfileLink } className="Button_navigation">{labelProfile}</Link>
        </CardFooter>
      </Card>
      </Col>         
    );

  }

}

export default PartialParentProfile;