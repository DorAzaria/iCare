import React from "react";

import AppContext from "@contexts/App";

import ShellMainGate from "@components/Shells/MainGate";
import "./index.css";
import DatabaseDriver from "@database/Driver";
import { Link } from 'react-router-dom';
import AppKeys from "@shared/AppKeys";
import ErrorCodes from "@shared/ErrorCodes";

import {
  FormText,
  Row,
  Col,
  Container,
  Label,
  Form,
  FormGroup,
  Input,
} from "reactstrap";

const KEY_EMAIL = AppKeys["EMAIL"];
const KEY_ERROR_CODE = AppKeys["ERROR_CODE"];
const KEY_FIRST_NAME = AppKeys["FIRST_NAME"];
const KEY_LAST_NAME = AppKeys["LAST_NAME"];
const KEY_PASSWORD = AppKeys["PASSWORD"];
const KEY_PHONE_NUMBER = AppKeys["PHONE_NUMBER"];
const KEY_HOUSE_NUMBER = AppKeys["HOUSE_NUMBER"];
const KEY_STREET_NAME = AppKeys["STREET_NAME"];
const KEY_CITY = AppKeys["CITY"];
const KEY_REGISTRATION_TYPE = AppKeys["REGISTRATION_TYPE"];
const KEY_AGE = AppKeys["AGE"];
const KEY_GENDER = AppKeys["GENDER"];

class ViewBabySitterRegister extends React.Component {
  static contextType = AppContext;
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      firstName: "",
      lastName: "",
      password: "",
      repassword: "",
      situation: "",
      phoneNumber: "",
      houseNumber: "",
      city: "",
      streetName: "",
      type: "babysitter",
      age: 0,
      gender: 0,
      errorMsg: "",
    };
    this.selectedFile = React.createRef(null);
  }

  render() {
    const { context, state } = this;

    const { strings } = context;

    const { situation, errorMsg } = state;

    const situationFail = strings["MESSAGE_REGISTRATION_FAIL"];
    const situationSuccess = strings["MESSAGE_REGISTRATION_SUCCESS"];
    const situationTry = strings["MESSAGE_REGISTRATION_TRY"];

    // const { ageError } = state;
    const setValue = (key, event) => {
      const element = event.target;
      const value = element.value;
      this.setState({ [key]: value });
    };
    const handleChange = (e) => {
      setValue(e.target.name, e);
    };
    const actionSubmit = () => {
      let {
        email,
        firstName,
        lastName,
        password,
        repassword,
        type,
        phoneNumber,
        houseNumber,
        age,
        gender,
        city,
        streetName,
      } = state;
      this.setState({ errorMsg: "" });
      if (email === "") {
        this.setState({ errorMsg: "Email Required" });
        return;
      }
      if (email.includes("@") === false) {
        this.setState({ errorMsg: "Email Missing @" });
        return;
      }
      if (password.length < 6) {
        this.setState({ errorMsg: "Password should be over 6 letters" });
        return;
      }
      if (repassword.length < 6) {
        this.setState({ errorMsg: "Re-Password should be over 6 letters" });
        return;
      }
      if (repassword !== password) {
        this.setState({
          errorMsg: "Re-Password should be matched with password",
        });
        return;
      }
      let age_num = Number(age);
      if (age_num === Infinity || String(age_num) !== age) {
        this.setState({ errorMsg: "Children number should be number" });
        return;
      }

      if (age_num === 0) {
        this.setState({ errorMsg: "Children number should be over than 1" });
        return;
      }

      if (firstName === "") {
        this.setState({ errorMsg: "First Name Required" });
        return;
      }
      if (lastName === "") {
        this.setState({ errorMsg: "Last Name Required" });
        return;
      }
      if (phoneNumber === "") {
        this.setState({ errorMsg: "Phone Number Required" });
        return;
      }
      if (city === "") {
        this.setState({ errorMsg: "City Required" });
        return;
      }

      if (streetName === "") {
        this.setState({ errorMsg: "Street Name Required" });
        return;
      }
      if (houseNumber === "") {
        this.setState({ errorMsg: "Phone Number Required" });
        return;
      }

      const request = {
        [KEY_EMAIL]: email,
        [KEY_FIRST_NAME]: firstName,
        [KEY_LAST_NAME]: lastName,
        [KEY_PASSWORD]: password,
        [KEY_REGISTRATION_TYPE]: type,
        [KEY_AGE]: age,
        [KEY_GENDER]: gender,
        [KEY_PHONE_NUMBER]: phoneNumber,
        [KEY_HOUSE_NUMBER]: houseNumber,
        [KEY_STREET_NAME]: streetName,
        [KEY_CITY]: city,
      };

      const registrationFail = () => {
        this.setState({ situation: situationFail });
      };

      const registrationSuccess = () => {
        this.setState({ situation: situationSuccess });
        // user profile save

        window.location.href = "/";
      };

      const registrationTry = () => {
        console.log("registering...");
        DatabaseDriver.registerUser(request)
          .then((response) => {
            const errorCode = response[KEY_ERROR_CODE];

            if (errorCode !== ErrorCodes["ERROR_NONE"]) {
              registrationFail();
            } else {
              registrationSuccess();
            }
          })
          .catch((error) => {
            registrationFail();
          });
      };

      this.setState({ situation: situationTry }, registrationTry);
    };
    const babySitterBody = (
      <Container>
                    <div style={{textAlign: 'center'}}>
            <Link className="ShellMainGate_headTitle" to="/">
              <img alt = "iCare" src = "logo.png" style = {{marginTop: 50, marginLeft:-33 ,width:215, height:110}}/>
            </Link>   
            </div>
        <Row className="justify-content-md-center">
          <div className="ViewRegisterMainGate babysitter-register-form">
            <div className="ViewRegisterMainGate_title">
            </div>
            <div>
              <span style = {{fontFamily: 'JetBrains Mono',color:'red'}}> { errorMsg }</span>
            </div>
            <Form style={{ padding: "15px", width: "80%" }}>
              <Row className="mb-3 pt-3">
                <div className="ViewRegisterMainGate_title">
                  <span className="Title_styleA">Account</span>
                </div>
              </Row>
              <FormGroup>
                <Input
                  type="email"
                  name="email"
                  id="Email"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  placeholder="Email"
                />
              </FormGroup>
              <FormGroup>
                <Input
                  type="password"
                  name="password"
                  id="Password"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  placeholder="Password"
                />
              </FormGroup>
              <FormGroup>
                <Input
                  type="password"
                  name="repassword"
                  id="RePassword"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  placeholder="Re-Password"
                />
              </FormGroup>
              <FormGroup>
                <Input
                  type="text"
                  name="age"
                  id="Age"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  placeholder="Age"
                />
                <FormText>
                  <span className="text-muted" style={{ fontSize: "10px" }}>
                    Minimum Age: 14 years old
                  </span>
                </FormText>
              </FormGroup>
              <Row className="mb-3 pt-3">
                <div className="ViewRegisterMainGate_title">
                  <span className="Title_styleA">Who are you?</span>
                </div>
              </Row>
              <FormGroup>
                <Input
                  type="text"
                  name="firstName"
                  id="firstName"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  placeholder="First Name"
                />
              </FormGroup>
              <FormGroup>
                <Input
                  type="text"
                  name="lastName"
                  id="lastName"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  placeholder="Last Name"
                />
              </FormGroup>
              <FormGroup>
                <Input
                  type="text"
                  name="phoneNumber"
                  id="phoneNumber"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  placeholder="Phone Number"
                />
              </FormGroup>
              <Row
                className="mb-3"
                style={{
                  backgroundColor: "#e8e3e3",
                  marginLeft: "1px",
                  marginRight: "1px",
                  borderRadius: "5px",
                  padding: "5px",
                }}
              >
                <Col sm={4}>
                  <FormText>
                    <span className="text-muted" style={{ fontSize: "14px" }}>
                      Gender
                    </span>
                  </FormText>
                </Col>
                <Col sm={4}>
                  <FormGroup check>
                    <Label check>
                      <Input
                        type="radio"
                        name="gender"
                        value={0}
                        onChange={(e) => {
                          handleChange(e);
                        }}
                      />{" "}
                      <span className="text-dark" style={{ fontSize: "14px" }}>
                        Male
                      </span>
                    </Label>
                  </FormGroup>
                </Col>
                <Col sm={4}>
                  <FormGroup check>
                    <Label check>
                      <Input
                        type="radio"
                        name="gender"
                        value={1}
                        onChange={(e) => {
                          handleChange(e);
                        }}
                      />{" "}
                      <span className="text-dark" style={{ fontSize: "14px" }}>
                        Female
                      </span>
                    </Label>
                  </FormGroup>
                </Col>
              </Row>
              <Row className="mb-3 pt-3">
                <div className="ViewRegisterMainGate_title">
                  <span className="Title_styleA">Address</span>
                </div>
              </Row>
              <FormGroup>
                <Input
                  type="text"
                  name="city"
                  id="city"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  placeholder="City"
                />
              </FormGroup>
              <FormGroup>
                <Input
                  type="text"
                  name="streetName"
                  id="streetName"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  placeholder="Street Name"
                />
              </FormGroup>
              <FormGroup>
                <Input
                  type="text"
                  name="houseNumber"
                  id="houseNumber"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  placeholder="House Number"
                />
              </FormGroup>
              <Row className="mt-4">
                <Col sm={12} className="text-center">
                  <button
                    type="button"
                    className="btn btn-baby"
                    onClick={actionSubmit}
                    style={{fontWeight:"bold", minWidth: "150px" }}
                  >
                    Register
                  </button>
                </Col>
              </Row>
              <div className="Layout_alwaysFilled">{situation}</div>
            </Form>
          </div>
        </Row>
      </Container>
    );
    const body = (
      <div style={{ width: "450px" }}>
        {babySitterBody}
      </div>
    );
    return <ShellMainGate body={body} />;
  }
}

export default ViewBabySitterRegister;
