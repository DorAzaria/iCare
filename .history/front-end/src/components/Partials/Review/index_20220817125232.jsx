import React from "react";

import AppKeys from "@shared/AppKeys";

import "./index.css";

import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  CardSubtitle,
} from "reactstrap";

const KEY_RATING = AppKeys["RATING"];
const KEY_DESCRIPTION = AppKeys["DESCRIPTION"];
const KEY_NAME_FROM = AppKeys["NAME_FROM"];
// const KEY_NUMBER_FROM = AppKeys["NUMBER_FROM"];

const SERVER_PROFILE_URL = AppKeys["SERVER_PROFILE_URL"];

class PartialReview extends React.Component {
  render() {
    const { props } = this;

    const { review } = props;

    const {
      // [KEY_NUMBER_FROM]:number_from,
      [KEY_RATING]: rating,
      [KEY_NAME_FROM]: name_from,
      [KEY_DESCRIPTION]: description,
      userAvatar,
    } = review;

    const profileUrl = userAvatar
      ? SERVER_PROFILE_URL + userAvatar
      : "logo.png";
    let starRating = "Rating: ";
    for (var i = 0; i < rating; i++) starRating += "⭐";
    return (
      <div style={{ width: "100%" }}>
        <div className="PartialSitter_singleSitter">
          <Card color="plum" outline>
            <CardHeader>
              <img
                src={profileUrl}
                className="review-avatar"
                alt="user-profile"
                style={{float: 'left'}}
              ></img>
              <div
                style={{ float: "left", textAlign: "center", color: "gray", marginLeft: 10, marginTop: 3 }}
              >
                <span>left by</span>
                <CardTitle tag="h4">{name_from}</CardTitle>
              </div>
              <p style={{ color: "black", paddingTop: 5 }}>
                <span style={{ color: "black" , float: 'right', marginTop: 30}}> {starRating}</span>
              </p>
            </CardHeader>
            <CardBody style={{ height: 120 }}>
              <CardSubtitle tag="h6" style={{ paddingTop: 5 , color: 'gray'}}>
                Review:
              </CardSubtitle>
              <CardTitle tag="h5" style={{ color: "black", marginTop: 10 }}>
                {description}
              </CardTitle>
            </CardBody>
          </Card>
        </div>
      </div>
    );
  }
}

export default PartialReview;
