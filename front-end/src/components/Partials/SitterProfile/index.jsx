import React from "react";

import AppKeys from "@shared/AppKeys";

import "./index.css";

import {
  Col,
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  CardSubtitle,
  CardText,
  Badge,
} from "reactstrap";

const KEY_NUMBER_USER = AppKeys["NUMBER_USER"];
const KEY_USERNAME = AppKeys["USERNAME"];
const KEY_AGE = AppKeys["AGE"];
const KEY_EDUCATION = AppKeys["EDUCATION"];
const KEY_GENDER = AppKeys["GENDER"];
const KEY_CHILD_CARE = AppKeys["CHILD_CARE"];
const KEY_SCHOOL_HELP = AppKeys["SCHOOL_HELP"];
const KEY_SMOKING = AppKeys["SMOKING"];
const KEY_EXP_YEARS = AppKeys["EXP_YEARS"];
const KEY_PHONE_NUMBER = AppKeys["PHONE_NUMBER"];
const KEY_LAST_NAME = AppKeys["LAST_NAME"];
const KEY_STREET_NAME = AppKeys["STREET_NAME"];
const KEY_HOUSE_NUMBER = AppKeys["HOUSE_NUMBER"];
const KEY_HAVE_CHILDREN = AppKeys["HAVE_CHILDREN"];
const KEY_DRIVE_LICENSE = AppKeys["DRIVE_LICENSE"];
const KEY_REMOTELY = AppKeys["REMOTELY"];
const KEY_SPECIAL_EXPERIENCE = AppKeys["SPECIAL_EXPERIENCE"];
const KEY_HELP_TYPE = AppKeys["HELP_TYPE"];
const KEY_CHILD_TYPE = AppKeys["CHILD_TYPE"];

// const KEY_SHORT_INFO = AppKeys["SHORT_INFO"];
// const KEY_LOC = AppKeys["LOC"];
const SERVER_PROFILE_URL = AppKeys["SERVER_PROFILE_URL"];

class PartialSitterProfile extends React.Component {
  render() {
    const genderName = ["Male", "Female"];
    const { props } = this;

    const { sitter } = props;
    if (sitter === null) {
      return <div></div>;
    }
    const {
      [KEY_NUMBER_USER]: key,
      [KEY_USERNAME]: username,
      [KEY_LAST_NAME]: last_name,
      [KEY_AGE]: age,
      [KEY_GENDER]: gender,
      [KEY_CHILD_CARE]: child_care,
      [KEY_SCHOOL_HELP]: school_help,
      [KEY_SMOKING]: smoking,
      [KEY_EXP_YEARS]: exp_years,
      [KEY_EDUCATION]: education,
      [KEY_PHONE_NUMBER]: phone,
      [KEY_STREET_NAME]: street,
      [KEY_HOUSE_NUMBER]: house_number,
      [KEY_HAVE_CHILDREN ] : have_children,
      [KEY_DRIVE_LICENSE] : driving_license,
      [KEY_REMOTELY] : remotely,
      [KEY_SPECIAL_EXPERIENCE] : special_experience,
      [KEY_HELP_TYPE] : help_type,
      [KEY_CHILD_TYPE] : child_type,

      // [KEY_SHORT_INFO]:short_info,
      // [KEY_LOC]:loc,
      description,
      userAvatar,
      city,
      
    } = sitter;


    const child_child_type = child_type ? child_type : "";
    const child_help_type = help_type ? help_type : "";
    const child_special_experience = special_experience ? "yes" : "";
    const child_remotely = remotely ? "yes" : "";
    const child_have_children = have_children ? "yes" : "";
    const child_driving_license = driving_license ? "yes" : "";
    const child_care_str = child_care ? "Child Care" : "";
    const school_help_str = school_help ? "School Help" : "";
    const smoking_str = smoking ? "Smoking" : "";
    const profileUrl = userAvatar
      ? SERVER_PROFILE_URL + userAvatar
      : "logo.png";

    return (
      <Col className="PartialSitter_singleSitterProfile" key={key} style={{width: 1100, marginLeft: 110}}>
        <Card color="plum" outline>
          <CardHeader>
            <img src={profileUrl} className="avatar" alt="user-profile" style={{float: 'left'}}></img>
            <div style={{ float: "right", textAlign: "center", color: "black" , float: 'left', marginLeft: 20, marginTop: 15}}>
              <CardTitle tag="h3">{username} {last_name}</CardTitle>
              <CardSubtitle tag="h6" style={{color: 'gray'}}>{city}, {street}, {house_number}</CardSubtitle>
            </div>

            <div style={{float: 'right' , marginTop: 10, marginRight: 10, fontSize: 14}}>
              <div style={{ color: "black" ,  }}>
                Experience:
                <span style={{ color: "black" , fontWeight: 600}}> {exp_years} Years</span>
              </div>
              <div style={{ color: "black" }}>
                Education:
                <span style={{ color: "black" , fontWeight: 600 }}> {education}</span>
              </div>
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
          <CardFooter
            style={{
              color: "white",
              backgroundColor: "plum",
              textAlign: "right",
            }}
          >
            <div style={{marginTop: 7, fontSize: 14, color: 'white'}}> 
            <span style={{ float: "left", paddingRight: 20 }}>
              {" "}
              Skill:
              <span style={{ color: "white" }}> {child_care_str} </span>
              <span style={{ color: "white" }}> {school_help_str} </span>
            </span>
            <span style={{ float: "left", paddingRight: 20 }}>
              {" "}
              Gender:
              <span style={{ color: "white" , fontWeight: 600}}> {genderName[gender]} </span>
            </span>
            <span style={{ float: "left" }}>
              {" "}
              Age:
              <span style={{ color: "white" , fontWeight: 600 }}> {age} </span>
            </span>
            
            </div>

            <div>
                <div style={{float: 'right', }}>

                    
                    {smoking_str.length > 0 && 
                      <Badge color="secondary" style={{ marginLeft: 10}}> <span style={{fontSize: 14}}> Smoking</span> </Badge> 
                    }
                    
                    {child_driving_license.length > 0 && 
                      <Badge color="secondary" style={{ marginLeft: 10}}> <span style={{fontSize: 14}}> Driving License </span> </Badge> 
                    }

                    {child_have_children.length > 0 && 
                      <Badge color="secondary" style={{ marginLeft: 10}}> <span style={{fontSize: 14}}> Have Children </span> </Badge> 
                    }

                    {child_remotely.length > 0 && 
                      <Badge color="secondary" style={{ marginLeft: 10}}> <span style={{fontSize: 14}}> Remotely </span> </Badge> 
                    }

                    {child_special_experience.length > 0 && 
                      <Badge color="secondary" style={{ marginLeft: 10}}> <span style={{fontSize: 14}}> Special Experience </span> </Badge> 
                    }

                    {child_help_type.length > 0 && 
                      <Badge color="secondary" style={{ marginLeft: 10}}> <span style={{fontSize: 14}}> {child_help_type} </span> </Badge> 
                    }

                    {child_child_type.length > 0 && 
                      <Badge color="secondary" style={{ marginLeft: 10}}> <span style={{fontSize: 14}}> {child_child_type} </span> </Badge> 
                    }


                    <Button
                      color="secondary"
                      className="Button_navigation"
                      style={{ float: "right" , marginTop: -5, marginLeft: 10}}
                      onClick={this.props.actionAddWatchList}
                    >
                      Add To My Watch List
                    </Button>

              </div>
            </div>

          </CardFooter>
        </Card>
      </Col>
    );
  }
}

export default PartialSitterProfile;
