import React from "react";

import AppKeys from "@shared/AppKeys";

import "./index.css";

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  CardSubtitle,
  CardText,
  Col,
} from "reactstrap";

const KEY_DESCRIPTION = AppKeys["DESCRIPTION"];
const KEY_NAME_FROM = AppKeys["NAME_FROM"];
const KEY_REPLYS = AppKeys["REPLYS"];
const KEY_NUMBER_REPLY = AppKeys["NUMBER_REPLY"];
const KEY_NUMBER_FROM = AppKeys["NUMBER_FROM"];
const SERVER_PROFILE_URL = AppKeys["SERVER_PROFILE_URL"];

class PartialComment extends React.Component {
  render() {
    const { props } = this;

    const { comment } = props;

    const {
      [KEY_NUMBER_FROM]: number_from,
      [KEY_NAME_FROM]: name_from,
      [KEY_DESCRIPTION]: description,
      [KEY_REPLYS]: replys,
      userAvatar,
    } = comment;
    console.log("-------why comment strange?==>", comment);

    const makeReplyElement = (reply) => {
      const {
        [KEY_NUMBER_REPLY]: key,
        [KEY_NAME_FROM]: name_from,
        [KEY_NUMBER_FROM]: number_from,
        [KEY_DESCRIPTION]: description,
        reuserAvatar,
      } = reply;
      const reply_key = "reply_" + key;
      const profileUrl = reuserAvatar
        ? SERVER_PROFILE_URL + reuserAvatar
        : "logo.png";
      return (
        <div key={reply_key} style={{ marginLeft: 10 }}>
          <img
            src={profileUrl}
            className="reply-avatar"
            alt="user profile"
          ></img>
          <span style={{ color: "red", paddingLeft: 10 }}> Reply</span>{" "}
          <span> left by {name_from}</span>
          <CardText style={{ marginLeft: 40, color: "darkgreen" }} tag="h5">
            {description}
          </CardText>
        </div>
      );
    };

    const elementsReply = replys.map(makeReplyElement);
    const profileUrl = userAvatar
      ? SERVER_PROFILE_URL + userAvatar
      : "logo.png";

    return (
      <Col className="PartialComment_singleComment" style={{width: "80%", marginLeft: "112px", marginTop: "30px"}}>
        <Card color="plum" outline>
          <CardHeader>
            <img
              src={profileUrl}
              className="comment-avatar"
              alt="user profile"
              style={{float: 'left'}}
            ></img>
            <div
              style={{
                float: "left",
                textAlign: "center",
                color: "gray",
                paddingLeft: 20,
              }}
            >
              <CardSubtitle tag="h6" style={{ paddingTop: 5 }}>
                left by
              </CardSubtitle>
              <CardTitle tag="h4" style={{ paddingBottom: 0 }}>
                {name_from}
              </CardTitle>
            </div>
          </CardHeader>
          <CardBody>
            
            <CardText style={{ paddingLeft: 10, color: "black" }} tag="h5">
              {description}
            </CardText>
          </CardBody>
          <CardFooter style={{ backgroundColor: "lightgray" }}>
            {elementsReply}
          </CardFooter>
        </Card>
      </Col>
    );
  }
}

export default PartialComment;
