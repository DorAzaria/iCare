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
} from "reactstrap";

const KEY_NUMBER_USER = AppKeys["NUMBER_USER"];
const KEY_USERNAME = AppKeys["USERNAME"];
const KEY_AGE = AppKeys["AGE"];
const KEY_EDUCATION = AppKeys["EDUCATION"];
const KEY_GENDER = AppKeys["GENDER"];
const KEY_CHILD_CARE = AppKeys["CHILD_CARE"];
const KEY_SCHOOL_HELP = AppKeys["SCHOOL_HELP"];
const KEY_EXP_YEARS = AppKeys["EXP_YEARS"];
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
      [KEY_AGE]: age,
      [KEY_GENDER]: gender,
      [KEY_CHILD_CARE]: child_care,
      [KEY_SCHOOL_HELP]: school_help,
      [KEY_EXP_YEARS]: exp_years,
      [KEY_EDUCATION]: education,
      // [KEY_SHORT_INFO]:short_info,
      // [KEY_LOC]:loc,
      description,
      userAvatar,
      city,
    } = sitter;

    const child_care_str = child_care ? "Child Care" : "";
    const school_help_str = school_help ? "School Help" : "";
    const profileUrl = userAvatar
      ? SERVER_PROFILE_URL + userAvatar
      : "logo.png";

    return (
      <Col className="PartialSitter_singleSitterProfile" key={key} style={{width: 1100, marginLeft: 110}}>
        <Card color="plum" outline>
          <CardHeader>
            <img src={profileUrl} className="avatar" alt="user-profile" style={{float: 'left'}}></img>
            <div style={{ float: "right", textAlign: "center", color: "black" , float: 'left', marginLeft: 20, marginTop: 15}}>
              <CardTitle tag="h3">{username}</CardTitle>
              <CardSubtitle tag="h6" style={{color: 'gray'}}>{city}</CardSubtitle>
            </div>

            <div style={{float: 'right' }}>
            <div style={{ color: "darkblue" ,  }}>
              Experience:
              <span style={{ color: "black" }}> {exp_years} Years</span>
            </div>
            <div style={{ color: "darkblue" }}>
              Education:
              <span style={{ color: "black" }}> {education}</span>
            </div>
            </div>
          </CardHeader>
          <CardBody style={{ height: 150 }}>
            <CardSubtitle tag="h6" style={{ paddingTop: 5 }}>
              Information:
            </CardSubtitle>
            <CardTitle tag="h5" style={{ color: "darkgreen", fontSize: 14 }}>
              {description}
            </CardTitle>
          </CardBody>
          <CardFooter
            style={{
              color: "white",
              backgroundColor: "plum",
              textAlign: "right",
            }}
          >
            <span style={{ float: "left", paddingRight: 20 }}>
              {" "}
              Skill:
              <span style={{ color: "blue" }}> {child_care_str} </span>
              <span style={{ color: "red" }}> {school_help_str} </span>
            </span>
            <span style={{ float: "left", paddingRight: 20 }}>
              {" "}
              Gender:
              <span style={{ color: "yellow" }}> {genderName[gender]} </span>
            </span>
            <span style={{ float: "left" }}>
              {" "}
              Age:
              <span style={{ color: "pink" }}> {age} </span>
            </span>
            <Button
              color="primary"
              className="btn-sm"
              style={{ float: "right" }}
              onClick={this.props.actionAddWatchList}
            >
              Add To My Watch List
            </Button>
          </CardFooter>
        </Card>
      </Col>
    );
  }
}

export default PartialSitterProfile;
