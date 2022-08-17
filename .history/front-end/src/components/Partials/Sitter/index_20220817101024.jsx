import React from "react";

import AppKeys from "@shared/AppKeys";

import "./index.css";

import { Col } from "reactstrap";

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  CardSubtitle,
} from "reactstrap";

import { Link } from "react-router-dom";

const KEY_NUMBER_USER = AppKeys["NUMBER_USER"];
const KEY_USERNAME = AppKeys["USERNAME"];
const KEY_AGE = AppKeys["AGE"];
const KEY_EDUCATION = AppKeys["EDUCATION"];
const KEY_EXP_YEARS = AppKeys["EXP_YEARS"];
const KEY_GENDER = AppKeys["GENDER"];
const KEY_CHILD_CARE = AppKeys["CHILD_CARE"];
const KEY_SCHOOL_HELP = AppKeys["SCHOOL_HELP"];
// const KEY_SHORT_INFO = AppKeys["SHORT_INFO"];

const SERVER_PROFILE_URL = AppKeys["SERVER_PROFILE_URL"];

class PartialSitter extends React.Component {
  render() {
    const genderName = ["Male", "Female"];
    const { props } = this;

    const { sitter } = props;

    const {
      [KEY_NUMBER_USER]: key,
      [KEY_USERNAME]: username,
      [KEY_AGE]: age,
      [KEY_EDUCATION]: education,
      [KEY_EXP_YEARS]: exp_years,
      [KEY_GENDER]: gender,
      [KEY_CHILD_CARE]: child_care,
      [KEY_SCHOOL_HELP]: school_help,
      // [KEY_SHORT_INFO]:short_info,
      description,
      userAvatar,
    } = sitter;
    const child_care_str = child_care ? "Child Care" : "";
    const school_help_str = school_help ? "School Help" : "";
    const sitterProfileLink = `/sitter-profile?${KEY_NUMBER_USER}=${key}`;
    const profileUrl = userAvatar
      ? SERVER_PROFILE_URL + userAvatar
      : "logo.png";

    return (
      <Col className="PartialSitter_singleSitter" key = {key} style={{width: "550px" }}>
        <Card>
          <CardHeader>
            <img src={profileUrl} className="avatar" style={{float: "left"}} alt="profile user"></img>
            <div
              style={{
                float: "left",
                textAlign: "center",
                marginLeft: "20px", 
                color: "#dda0dd",
                lineHeight: 1.5,
              }}
            >
              <CardTitle style={{ margin:"20px",color: "#626567", fontSize: 35 , fontWeight: '250'}}>
                {username}
              </CardTitle>

            </div>
            
            <div style={{ float: "right",  color: "#dda0dd", lineHeight: 1.5,  marginTop: "10px"}}>
               <div style={{ color: "#626567" ,fontSize:"20px"}}>
                  Gender :
                  <span style={{ color: "black" , fontWeight: '640' }}> {genderName[gender]}</span>
                </div>     
               <div style={{ color: "#626567" ,fontSize:"20px"}}>
                  Years old :
                  <span style={{ color: "black" , fontWeight: '640' }}> {age}</span>
                </div>
                <div style={{ color: "#626567" ,fontSize:"20px"}}>
                  Experience :
                  <span style={{ color: "black" , fontWeight: '640' }}> {exp_years} Years</span>
                </div>                
                
            </div>
          </CardHeader>

          <CardBody style={{ height: 150 }}>
            <CardSubtitle tag="h6" style={{color:'gray',fontFamily:"Calibri" ,fontSize:23, paddingTop: 4 }}>
              Description:
            </CardSubtitle>
            <CardTitle style={{color:'black',fontFamily:"Calibri" ,fontSize:20, paddingTop: 4 }}>
              {description}
            </CardTitle>
          </CardBody>
          <CardFooter
            style={{
              height:50,
              color: "black",
              backgroundColor: "#CCDBEA",
              textAlign: "right",
            }}
          >
            <Link to={sitterProfileLink} className="btn btn-primary">
              Profile
            </Link>
          </CardFooter>
        </Card>
      </Col>
    );
  }
}

export default PartialSitter;
