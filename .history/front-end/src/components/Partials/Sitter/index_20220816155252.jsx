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
      <Col className="PartialSitter_singleSitter" key={key}>
        <Card color="success" outline>
          <CardHeader>
            <img src={profileUrl} className="avatar" style={{float: "left"}} alt="profile user"></img>
            <div
              style={{
                float: "left",
                textAlign: "center",
                marginLeft: "10px", 
                color: "gray",
                lineHeight: 1.1,
              }}
            >
              <CardTitle style={{ color: "#626567", fontSize: 20 }}>
                {username}
              </CardTitle>
              <CardSubtitle style={{ color: "#626567", fontSize: 15 }}>
                {age} years old
              </CardSubtitle>
            </div>
            <div style={{marginLeft: '30px'}}>
            <div style={{ color: "#626567" , }}>
              Experience:
              <span style={{ color: "black" }}> {exp_years} Years</span>
            </div>
            <div style={{ color: "#626567" }}>
              Education:
              <span style={{ color: "black" }}> {education}</span>
            </div>
            </div>
          </CardHeader>
          <CardBody style={{ height: 150 }}>
            <CardSubtitle tag="h6" style={{ paddingTop: 5 }}>
              Information:
            </CardSubtitle>
            <CardTitle style={{ color: "darkgreen", fontSize: 14 }}>
              {description}
            </CardTitle>
          </CardBody>
          <CardFooter
            style={{
              color: "black",
              backgroundColor: "#dda0dd",
              textAlign: "right",
            }}
          >
            <span style={{ float: "left", paddingRight: 20 }}>
              {" "}
              Skill:
              <span style={{ color: "blue" }}> {child_care_str} </span>
              <span style={{ color: "red" }}> {school_help_str} </span>
            </span>
            <span style={{ float: "left" }}>
              {" "}
              Gender:
              <span style={{ color: "black" }}> {genderName[gender]} </span>
            </span>
            <Link to={sitterProfileLink} className="Button_navigation">
              Profile
            </Link>
          </CardFooter>
        </Card>
      </Col>
    );
  }
}

export default PartialSitter;
