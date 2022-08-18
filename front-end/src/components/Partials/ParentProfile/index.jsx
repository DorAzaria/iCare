import React from 'react';

import AppKeys from '@shared/AppKeys';

import './index.css';

import { Link } from 'react-router-dom';

import { Card, CardHeader, CardBody, CardFooter, CardTitle, CardSubtitle, CardText, Col, Badge} from 'reactstrap';

const KEY_NUMBER_USER = AppKeys['NUMBER_USER'];
const KEY_USERNAME = AppKeys['USERNAME'];
const KEY_NUM_OF_CHILDREN = AppKeys['NUM_OF_CHILDREN'];
const KEY_SHORT_INFO = AppKeys['SHORT_INFO'];
const KEY_LOC = AppKeys['LOC'];
const SERVER_PROFILE_URL = AppKeys['SERVER_PROFILE_URL'];
const KEY_AGE = AppKeys["AGE"];
const KEY_SMOKING = AppKeys["SMOKING"];
const KEY_PHONE_NUMBER = AppKeys["PHONE_NUMBER"];
const KEY_STREET_NAME = AppKeys["STREET_NAME"];
const KEY_HOUSE_NUMBER = AppKeys["HOUSE_NUMBER"];
const KEY_DRIVE_LICENSE = AppKeys["DRIVE_LICENSE"];
const KEY_REMOTELY = AppKeys["REMOTELY"];
const KEY_HELP_TYPE = AppKeys["HELP_TYPE"];
const KEY_CHILD_TYPE = AppKeys["CHILD_TYPE"];

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
      city,
      [KEY_SMOKING]: smoking,
      [KEY_PHONE_NUMBER]: phone,
      [KEY_STREET_NAME]: street,
      [KEY_HOUSE_NUMBER]: house_number,
      [KEY_DRIVE_LICENSE] : driving_license,
      [KEY_REMOTELY] : remotely,
      [KEY_HELP_TYPE] : help_type,
      [KEY_CHILD_TYPE] : child_type,
    } = sitter;

    const profileUrl = userAvatar ? SERVER_PROFILE_URL + userAvatar : 'logo.png';
    const parentProfileLink = `/parent-profile?${ KEY_NUMBER_USER }=${ key }`;
    const labelProfile = 'Profile';

    
    const child_child_type = child_type ? child_type : "";
    const child_help_type = help_type ? help_type : "";
    const child_remotely = remotely ? "yes" : "";
    const child_driving_license = driving_license ? "yes" : "";
    const smoking_str = smoking ? "Smoking" : "";

    return (
      <Col className="PartialSitter_singleSitterProfile" key={key} style={{width: 1100, marginLeft: 110}}>
      <Card  color = "plum" outline>
        <CardHeader>
          <img src = {profileUrl} style={{float:'left'}} className = "avatar" alt="user-profile"></img>
          <div style = {{float:'left', textAlign:'center', color:'gray', paddingLeft:20, marginTop: 20}}>
            <CardTitle tag = "h3" style={{color:'black'}}>{ username }</CardTitle>
            <CardSubtitle tag="h6" style={{color: 'gray'}}>{city}, {street}, {house_number}</CardSubtitle>
          </div>

          <div style={{float: 'right' , marginTop: 80, marginRight: 10, fontSize: 14}}>
              <div style={{ color: "black" }}>
                Phone:
                <span style={{ color: "black" , fontWeight: 600 }}> {phone}</span>
              </div>
            </div>
        </CardHeader>
        <CardBody  style = {{height:150}}>
          <CardSubtitle tag = "h6" style={{color: 'gray'}}>Information:</CardSubtitle>
          <CardText style = {{ color:'black', marginTop: 5}} tag = "h6">
            {description}
          </CardText>

        </CardBody>
        <CardFooter style = {{color:'white', backgroundColor:'plum', textAlign:'right'}}>
        <div style={{marginTop: 7, fontSize: 14, color: 'white'}}>
          <span style = {{float:'left', paddingRight:20}}> Number Of Children: 
            <span style = {{color:'white', fontWeight: 700}}> {num_of_children} </span> 
          </span>

          <div>
                <div style={{float: 'right', }}>

                    
                    {smoking_str.length > 0 && 
                      <Badge color="secondary" style={{ marginLeft: 10}}> <span style={{fontSize: 14}}> Smoking</span> </Badge> 
                    }
                    
                    {child_driving_license.length > 0 && 
                      <Badge color="secondary" style={{ marginLeft: 10}}> <span style={{fontSize: 14}}> Driving License </span> </Badge> 
                    }


                    {child_remotely.length > 0 && 
                      <Badge color="secondary" style={{ marginLeft: 10}}> <span style={{fontSize: 14}}> Remotely </span> </Badge> 
                    }

                    {child_help_type.length > 0 && 
                      <Badge color="secondary" style={{ marginLeft: 10}}> <span style={{fontSize: 14}}> {child_help_type} </span> </Badge> 
                    }

                    {child_child_type.length > 0 && 
                      <Badge color="secondary" style={{ marginLeft: 10}}> <span style={{fontSize: 14}}> {child_child_type} </span> </Badge> 
                    }

                    <Link to={ parentProfileLink } className="Button_navigation" style={{ float: "right" , marginTop: -5, marginLeft: 10}}>{labelProfile}</Link>
              </div>
            </div>
            </div>


        </CardFooter>
      </Card>
      </Col>         
    );

  }

}

export default PartialParentProfile;