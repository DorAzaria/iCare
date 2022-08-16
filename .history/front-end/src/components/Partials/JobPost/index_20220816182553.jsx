import React from "react";

import AppKeys from "@shared/AppKeys";
import DatabaseDriver from "@database/Driver";
import "./index.css";

import { Link } from "react-router-dom";

import {
  Card,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  CardTitle,
  CardHeader,
  CardSubtitle,
  DropdownItem,
  CardBody,
  CardFooter,
  Col,
} from "reactstrap";
import * as Icon from "react-bootstrap-icons";

const KEY_DESCRIPTION = AppKeys["DESCRIPTION"];
// const KEY_TIME_A = AppKeys["TIME_A"];
// const KEY_TIME_B = AppKeys["TIME_B"];
// const KEY_TITLE = AppKeys["TITLE"];
const KEY_NUMBER_JOB = AppKeys["NUMBER_JOB"];

// const KEY_NUMBER_USER = AppKeys["NUMBER_USER"];
const KEY_USERNAME = AppKeys["USERNAME"];
const KEY_AGE = AppKeys["AGE"];
// const KEY_LOCATION = AppKeys["LOC"];

const TYPES = { parent: 2, babysitter: 1 };

const SERVER_PROFILE_URL = AppKeys["SERVER_PROFILE_URL"];
const KEY_SESSION = AppKeys["SESSION"];

class PartialJobPost extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dropdownOpen: false,
      heart: props.job.heart,
      allVotes: props.job.allVotes,
      gate: false,
    };
    this.toggleDrop = this.toggleDrop.bind(this);
  }

  toggleDrop() {
    this.setState((prevState) => ({
      dropdownOpen: !prevState.dropdownOpen,
    }));
  }

  render() {
    const { props } = this;

    const { job, user } = props;
    if (job === null) {
      return <div></div>;
    }
    const {
      [KEY_NUMBER_JOB]: key,
      // [KEY_TITLE]: title,
      [KEY_DESCRIPTION]: description,
      // [KEY_TIME_A]: timeA,
      // [KEY_TIME_B]: timeB,
      // [KEY_NUMBER_USER]: number_user,
      [KEY_USERNAME]: username,
      [KEY_AGE]: age,
      // [KEY_LOCATION]: location,
      userAvatar,
      city,
      price,
      allVotes,
      applied,
      number_job,
      heart,
    } = job;
    //const dateA = new Date(timeA);
    //const dateB = new Date(timeB);

    //const labelTimeA = dateA.toISOString();
    //const labelTimeB = dateB.toISOString();
    // const labelTimeA = timeA;
    // const labelTimeB = timeB;

    const applyLink = `/apply?${KEY_NUMBER_JOB}=${key}`;
    const detailLink = `/job-detail?${KEY_NUMBER_JOB}=${key}`;
    const profileUrl = userAvatar
      ? SERVER_PROFILE_URL + userAvatar
      : "logo.png";
    const { session } = user;
    console.log("page_type");
    console.log(props.page_type);
    const truncate = (str) => {
      if (str) {
        return str.length > 150 ? str.substring(0, 147) + "..." : str;
      } else {
        return "";
      }
    };

    const handleHeart = () => {
      if (!this.state.gate) {
        this.setState({ heart: !this.state.heart });
        const request = {
          [KEY_SESSION]: session,
          number_job: number_job,
        };
        DatabaseDriver.saveVote(request).then((response) => {
          console.log(response);
          if (response.error_code === 0) {
            this.setState({ allVotes: response.voteCount });
            this.setState({ gate: true });
          }
        });
      }
    };
    let heartClass = this.state.heart ? "m-1 heart-active" : "m-1 heart";
    // let hClass = heart ? "m-1 heart-active" : "m-1 heart";
    return (
      <Col className="PartialSitter_singleSitter" key={key}>
        <Card outline style={{ borderRadius: "20px" , height: 230}}>

          <CardHeader>
              <img
                src={profileUrl}
                className=""
                alt="user profile"
                style={{ width: 45, height: 45, borderRadius: 25 , float: "left", marginTop: "5px"}}
              ></img>
              <span
                style={{
                  float: "right",
                  paddingRight: 20,
                  marginTop: "10px",
                  color: "white",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {job["registration_type"] !== TYPES[user["type"]] &&
                props.page_type === "job" &&
                !applied ? (
                  <Link to={applyLink} className="Button_navigation" style={{ background: 'purple' }}>
                    APPLY
                  </Link>
                ) : (
                  ""
                )}
              </span>
              <CardTitle style={{ color: "#626567", fontSize: 20 , fontWeight: '650', marginLeft: "60px"}}>
                {username}
              </CardTitle>
              <CardSubtitle style={{ color: "#626567", fontSize: 15 , marginLeft: "60px"}}>
              {city} | {age} years old  
              </CardSubtitle>
          </CardHeader>

          
          <CardBody style={{ height: 150 }}>
            <div>
              <div className="text-end">
                <div>
                  <span style={{ fontSize: 14, color: "rgb(65 65 65)" , float: "left", fontWeight: '600'}}>
                    {" "}
                    Information{" "}
                    
                  </span>
                </div>
                <div>
                  <span style={{ fontSize: 14, color: "rgb(65 65 65)" ,marginLeft: "10px" , float: "left"}}>
                    { truncate(description)}
                  </span>
                </div>
              </div>
            </div>
          </CardBody>
          <CardFooter
            style={{
              color: "white",
              backgroundColor: "plum",
              textAlign: "right",
              borderRadius: "0 0 15px 15px",
            }}
          >
            <div className="d-flex justify-content-between">
              <div>

              <span
                  style={{
                      float: "left",
                      paddingRight: 3,
                      color: "white",
                      display: "flex",
                      fontSize: "18px",
                      alignItems: "center",
                    }}
                  >
                  {props.page_type === "job" ? this.state.allVotes : allVotes}
              </span>

                {job["registration_type"] !== TYPES[user["type"]] ? (
                  props.page_type === "job" ? (
                    !this.state.heart ? (
                      <Icon.HeartFill
                        className={heartClass}
                        onClick={handleHeart}
                      />
                    ) : (
                      <Icon.HeartFill className={heartClass} />
                    )
                  ) : heart ? (
                    <Icon.HeartFill className={"m-1 heart-active"} />
                  ) : (
                    <Icon.HeartFill
                      className="m-1 heart"
                      onClick={handleHeart}
                    />
                  )
                ) : (
                  <Icon.HeartFill className="m-1 heart" />
                )}

                <Link to={detailLink} style={{marginLeft: "10px"}}>
                  <Icon.ChatLeftFill
                    className="m-1"
                    style={{ color: "white", fontSize: 22}}
                  />
                </Link>
              </div>

              
              <div style={{
                  float: "right",
                  fontSize: "15px",
                  paddingRight: 10,
                  color: "white",
                  display: "flex",
                  alignItems: "center",
                }}>
                <span> Hourly Rate </span>
                <span style={{marginLeft: "10px", fontWeight: "600"}}> {price}</span>
              </div>
            </div>
            {/* <span style = {{float:'left', paddingRight:20, color:'blue'}}>{labelTimeA}
          </span>
          <span style = {{float:'left', paddingRight:20, color:'black'}}> ~ </span>
          <span style = {{float:'left', color:'yellow'}}>  { labelTimeB }
          </span> */}
            {/* {
          (job['registration_type'] !== TYPES[user['type']] && (props.page_type === 'job' || props.page_type === 'detail')) ?
          (<Link to={ applyLink } className="Button_navigation">APPLY</Link>):("")
          }
            
          <Link style = {{marginLeft:'20px'}} to={ detailLink } className="Button_navigation">Detail</Link> */}
          </CardFooter>
        </Card>
      </Col>
    );
  }
}

export default PartialJobPost;
