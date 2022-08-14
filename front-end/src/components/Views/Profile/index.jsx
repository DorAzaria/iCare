import React from "react";

import AppContext from "@contexts/App";
import { Navigate } from "react-router-dom";
import ShellNavigation from "@components/Shells/Navigation";
import "./index.css";
import DatabaseDriver from "@database/Driver";

import AppKeys from "@shared/AppKeys";
import ErrorCodes from "@shared/ErrorCodes";
import Links from "@shared/Links";
import {
  InputGroup,
  Row,
  InputGroupText,
  Col,
  Label,
  Form,
  FormGroup,
  Input,
} from "reactstrap";

const KEY_NUMBER_USER = AppKeys["NUMBER_USER"];
const KEY_ERROR_CODE = AppKeys["ERROR_CODE"];
const MAP_LINKS = Links["MAP_LINKS"];

const SERVER_PROFILE_URL = AppKeys["SERVER_PROFILE_URL"];

class ViewProfile extends React.Component {
  static contextType = AppContext;
  constructor(props) {
    super(props);

    this.state = {
      imgSrc: null,
      have_children: 0,
      have_drive_license: 0,
      have_experience_special: 0,
      help_type: "",
      child_type: "",
      childDataList: [],
      helpDataList: [],
      house_number: "",
      num_of_children: 0,
      exp_years: 0,
      rating: 0,
      remotely: false,
      city: "",
      street_name: "",
      school_help: 0,
      smoking: 0,
      description: "",
      errorMsg: "",
      situation: "",
      user_number: 0,
      fri_aft: false,
      fri_eve: false,
      fri_mor: false,
      fri_nig: false,
      mon_aft: false,
      mon_eve: false,
      mon_mor: false,
      mon_nig: false,
      sat_aft: false,
      sat_eve: false,
      sat_mor: false,
      sat_nig: false,
      sun_aft: false,
      sun_eve: false,
      sun_mor: false,
      sun_nig: false,
      thu_aft: false,
      thu_eve: false,
      thu_mor: false,
      thu_nig: false,
      tue_aft: false,
      tue_eve: false,
      tue_mor: false,
      tue_nig: false,
      wed_aft: false,
      wed_eve: false,
      wed_mor: false,
      wed_nig: false,
      //help_type
      cooking: false,
      pets: false,
      chores: false,
      homework: false,
      reading: false,
      drawing: false,
      games: false,
      crafting: false,
      //number child
      baby: false,
      toddler: false,
      preschooler: false,
      teenager: false,
    };
    this.selectedFile = React.createRef(null);
  }

  componentDidMount() {
    this.setUserNumber();
    this.loadUserSchedule();
    this.loadProfile();
  }

  setUserNumber() {
    const { context } = this;
    const { user } = context;
    const numberUser = user.number;
    this.setState({ user_number: numberUser });
  }
  loadUserSchedule() {
    const { context } = this;
    const { user } = context;
    const numberUser = user.number;

    const parameters = {
      [KEY_NUMBER_USER]: numberUser,
    };
    DatabaseDriver.loadUserSchedule(parameters)
      .then((schedules) => {
        this.setState(JSON.parse(schedules)[0].fields);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  loadProfile() {
    const { context } = this;
    const { user } = context;
    const numberUser = user.number;

    const parameters = {
      [KEY_NUMBER_USER]: numberUser,
    };
    const profileUrl = user.avatar ? SERVER_PROFILE_URL + user.avatar : null;
    this.setState({ imgSrc: profileUrl });
    DatabaseDriver.loadProfile(parameters)
      .then((profile) => {
        this.setState(profile);
        if (profile.help_type) {
          var helpTypeList = profile.help_type.split(",");
          this.setState({ helpDataList: helpTypeList });
          if (helpTypeList.find((type) => type === "cooking")) {
            this.setState({ cooking: true });
          }
          if (helpTypeList.find((type) => type === "pets")) {
            this.setState({ pets: true });
          }
          if (helpTypeList.find((type) => type === "chores")) {
            this.setState({ chores: true });
          }
          if (helpTypeList.find((type) => type === "homework")) {
            this.setState({ homework: true });
          }
          if (helpTypeList.find((type) => type === "reading")) {
            this.setState({ reading: true });
          }
          if (helpTypeList.find((type) => type === "drawing")) {
            this.setState({ drawing: true });
          }
          if (helpTypeList.find((type) => type === "games")) {
            this.setState({ games: true });
          }
          if (helpTypeList.find((type) => type === "crafting")) {
            this.setState({ crafting: true });
          }
        }
        if (profile.child_type) {
          var childTypeList = profile.child_type.split(",");
          this.setState({ childDataList: childTypeList });
          if (childTypeList.find((type) => type === "baby")) {
            this.setState({ baby: true });
          }
          if (childTypeList.find((type) => type === "toddler")) {
            this.setState({ toddler: true });
          }
          if (childTypeList.find((type) => type === "preschooler")) {
            this.setState({ preschooler: true });
          }
          if (childTypeList.find((type) => type === "teenager")) {
            this.setState({ teenager: true });
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const { context, state } = this;

    const { strings, user, app } = context;
    const { type } = user;
    const { situation } = state;

    const situationFail = strings["MESSAGE_UPDATEPROFILE_FAIL"];
    const situationSuccess = strings["MESSAGE_UPDATEPROFILE_SUCCESS"];
    const situationTry = strings["MESSAGE_UPDATE_PROFILE_TRY"];

    const setValue = (key, event) => {
      const element = event.target;
      const value = element.value;
      this.setState({ [key]: value });
    };
    const handleChange = (e) => {
      setValue(e.target.name, e);
    };
    const handleChx = (e) => {
      this.setState({ [e.target.name]: e.target.checked });
    };
    const handleSwitch = (e) => {
      this.setState({ [e.target.name]: e.target.checked });
    };

    const fileUpload = () => {
      console.log(this.selectedFile);
      this.selectedFile.current.click();
    };
    const onImgChange = () => {
      // Assuming only image
      var file = this.selectedFile.current.files[0];
      if (file == null) return;
      var reader = new FileReader();
      var url = reader.readAsDataURL(file);

      reader.onloadend = function (e) {
        this.setState({
          imgSrc: [reader.result],
        });
      }.bind(this);
      console.log(url); // Would see a path?
    };

    const addNumber = () => {
      var index = 1;
      if (type === "babysitter") {
        this.setState({ exp_years: parseFloat(this.state.exp_years) + index });
      } else {
        this.setState({
          num_of_children: parseFloat(this.state.num_of_children) + index,
        });
      }
    };

    const childHandle = (e) => {
      console.log(e.target.name);
      if (e.target.name === "baby") {
        if (this.state.baby) {
          const index = this.state.childDataList.indexOf(e.target.name);
          if (index !== -1) this.state.childDataList.splice(index, 1);
        } else {
          this.state.childDataList.push(e.target.name);
        }

        this.setState({ baby: !this.state.baby });
      }
      if (e.target.name === "toddler") {
        if (this.state.toddler) {
          const index = this.state.childDataList.indexOf(e.target.name);
          if (index !== -1) this.state.childDataList.splice(index, 1);
        } else {
          this.state.childDataList.push(e.target.name);
        }

        this.setState({ toddler: !this.state.toddler });
      }
      if (e.target.name === "preschooler") {
        if (this.state.preschooler) {
          const index = this.state.childDataList.indexOf(e.target.name);
          if (index !== -1) this.state.childDataList.splice(index, 1);
        } else {
          this.state.childDataList.push(e.target.name);
        }

        this.setState({ preschooler: !this.state.preschooler });
      }
      if (e.target.name === "teenager") {
        if (this.state.teenager) {
          const index = this.state.childDataList.indexOf(e.target.name);
          if (index !== -1) this.state.childDataList.splice(index, 1);
        } else {
          this.state.childDataList.push(e.target.name);
        }

        this.setState({ teenager: !this.state.teenager });
      }
      this.setState({ child_type: this.state.childDataList.join(",") });
    };

    const helpHandle = (e) => {
      console.log(e.target.name);
      if (e.target.name === "cooking") {
        if (this.state.cooking) {
          const index = this.state.helpDataList.indexOf(e.target.name);
          if (index !== -1) this.state.helpDataList.splice(index, 1);
        } else {
          this.state.helpDataList.push(e.target.name);
        }

        this.setState({ cooking: !this.state.cooking });
      }
      if (e.target.name === "pets") {
        if (this.state.pets) {
          const index = this.state.helpDataList.indexOf(e.target.name);
          if (index !== -1) this.state.helpDataList.splice(index, 1);
        } else {
          this.state.helpDataList.push(e.target.name);
        }
        this.setState({ pets: !this.state.pets });
      }
      if (e.target.name === "chores") {
        if (this.state.chores) {
          const index = this.state.helpDataList.indexOf(e.target.name);
          if (index !== -1) this.state.helpDataList.splice(index, 1);
        } else {
          this.state.helpDataList.push(e.target.name);
        }
        this.setState({ chores: !this.state.chores });
      }
      if (e.target.name === "homework") {
        if (this.state.homework) {
          const index = this.state.helpDataList.indexOf(e.target.name);
          if (index !== -1) this.state.helpDataList.splice(index, 1);
        } else {
          this.state.helpDataList.push(e.target.name);
        }
        this.setState({ homework: !this.state.homework });
      }
      if (e.target.name === "reading") {
        if (this.state.reading) {
          const index = this.state.helpDataList.indexOf(e.target.name);
          if (index !== -1) this.state.helpDataList.splice(index, 1);
        } else {
          this.state.helpDataList.push(e.target.name);
        }
        this.setState({ reading: !this.state.reading });
      }
      if (e.target.name === "drawing") {
        if (this.state.drawing) {
          const index = this.state.helpDataList.indexOf(e.target.name);
          if (index !== -1) this.state.helpDataList.splice(index, 1);
        } else {
          this.state.helpDataList.push(e.target.name);
        }
        this.setState({ drawing: !this.state.drawing });
      }
      if (e.target.name === "games") {
        if (this.state.games) {
          const index = this.state.helpDataList.indexOf(e.target.name);
          if (index !== -1) this.state.helpDataList.splice(index, 1);
        } else {
          this.state.helpDataList.push(e.target.name);
        }
        this.setState({ games: !this.state.games });
      }
      if (e.target.name === "crafting") {
        if (this.state.crafting) {
          const index = this.state.helpDataList.indexOf(e.target.name);
          if (index !== -1) this.state.helpDataList.splice(index, 1);
        } else {
          this.state.helpDataList.push(e.target.name);
        }
        this.setState({ crafting: !this.state.crafting });
      }
      this.setState({ help_type: this.state.helpDataList.join(",") });
      console.log(this.state.helpDataList.join(","));
    };

    const actionSubmit = () => {
      let {
        have_children,
        imgSrc,
        have_drive_license,
        have_experience_special,
        help_type,
        child_type,
        house_number,
        num_of_children,
        rating,
        remotely,
        city,
        street_name,
        school_help,
        smoking,
        description,
        user_number,
        fri_aft,
        exp_years,
        fri_eve,
        fri_mor,
        fri_nig,
        mon_aft,
        mon_eve,
        mon_mor,
        mon_nig,
        sat_aft,
        sat_eve,
        sat_mor,
        sat_nig,
        sun_aft,
        sun_eve,
        sun_mor,
        sun_nig,
        thu_aft,
        thu_eve,
        thu_mor,
        thu_nig,
        tue_aft,
        tue_eve,
        tue_mor,
        tue_nig,
        wed_aft,
        wed_eve,
        wed_mor,
        wed_nig,
      } = state;

      this.setState({ errorMsg: "" });

      if (imgSrc == null) {
        this.setState({ errorMsg: "Profile Image Required" });
        return;
      }

      const request = {
        have_children: have_children,
        have_drive_license: have_drive_license,
        have_experience_special: have_experience_special,
        registration_type: type,
        help_type: help_type,
        child_type: child_type,
        house_number: house_number,
        num_of_children: num_of_children,
        exp_years: exp_years,
        rating: rating,
        remotely: remotely,
        city: city,
        street_name: street_name,
        school_help: school_help,
        smoking: smoking,
        description: description,
        user_number: user_number,
        fri_aft: fri_aft,
        fri_eve: fri_eve,
        fri_mor: fri_mor,
        fri_nig: fri_nig,
        mon_aft: mon_aft,
        mon_eve: mon_eve,
        mon_mor: mon_mor,
        mon_nig: mon_nig,
        sat_aft: sat_aft,
        sat_eve: sat_eve,
        sat_mor: sat_mor,
        sat_nig: sat_nig,
        sun_aft: sun_aft,
        sun_eve: sun_eve,
        sun_mor: sun_mor,
        sun_nig: sun_nig,
        thu_aft: thu_aft,
        thu_eve: thu_eve,
        thu_mor: thu_mor,
        thu_nig: thu_nig,
        tue_aft: tue_aft,
        tue_eve: tue_eve,
        tue_mor: tue_mor,
        tue_nig: tue_nig,
        wed_aft: wed_aft,
        wed_eve: wed_eve,
        wed_mor: wed_mor,
        wed_nig: wed_nig,
      };
      console.log(request);
      const registrationFail = () => {
        this.setState({ situation: situationFail });
      };

      const registrationSuccess = (response) => {
        this.setState({ situation: situationSuccess });

        window.location.href = "/profile";
      };
      const updateProfile = () => {
        console.log("Updating Profile...");
        DatabaseDriver.updateProfile(
          request,
          this.selectedFile.current.files[0]
        )
          .then((response) => {
            console.log(response);

            const errorCode = response[KEY_ERROR_CODE];

            if (errorCode !== ErrorCodes["ERROR_NONE"]) {
              registrationFail();
            } else {
              var selectedUser = {
                session: user.session,
                firstName: response["first_name"],
                lastName: response["last_name"],
                number: response["number_user"],
                type:
                  response["registration_type"] === 1 ? "babysitter" : "parent",
                avatar: response["userAvatar"],
              };
              sessionStorage.setItem("user", JSON.stringify(selectedUser));
              app.setState({ user: selectedUser });
              registrationSuccess(response);
            }
          })
          .catch((error) => {
            registrationFail();
          });
      };

      this.setState({ situation: situationTry }, updateProfile);
    };
    const renderParent = () => {
      const profileBody = (
        <div className="container">
          <div className="profile-board">
            <Form>
              <Row>
                <Col sm={4} className="right-line">
                  <div className="mb-3">
                    <span className="Title_styleA">Edit Profile</span>
                  </div>
                  <div className="mb-2">
                    <span className="Title_style mb-2">Description</span>
                  </div>

                  <div>
                    <textarea
                      type="text"
                      className="form-control"
                      name="description"
                      rows={4}
                      onChange={(e) => {
                        handleChange(e);
                      }}
                      defaultValue={this.state.description}
                    ></textarea>
                  </div>
                  <div className="mt-3">
                    <span className="Title_style">We need help with</span>
                  </div>
                  <div className="mt-3">
                    <button
                      type="button"
                      name="cooking"
                      className={
                        this.state.cooking
                          ? "btn btn-sm m-1 btn-help-active"
                          : "btn btn-sm m-1 btn-help"
                      }
                      onClick={(e) => helpHandle(e)}
                    >
                      Cooking
                    </button>
                    <button
                      type="button"
                      name="pets"
                      onClick={(e) => helpHandle(e)}
                      className={
                        this.state.pets
                          ? "btn btn-sm m-1 btn-help-active"
                          : "btn btn-sm m-1 btn-help"
                      }
                    >
                      Pets
                    </button>
                    <button
                      type="button"
                      name="chores"
                      onClick={(e) => helpHandle(e)}
                      className={
                        this.state.chores
                          ? "btn btn-sm m-1 btn-help-active"
                          : "btn btn-sm m-1 btn-help"
                      }
                    >
                      Chores
                    </button>
                    <button
                      type="button"
                      name="homework"
                      onClick={(e) => helpHandle(e)}
                      className={
                        this.state.homework
                          ? "btn btn-sm m-1 btn-help-active"
                          : "btn btn-sm m-1 btn-help"
                      }
                    >
                      Homework assistance
                    </button>
                    <button
                      type="button"
                      name="reading"
                      onClick={(e) => helpHandle(e)}
                      className={
                        this.state.reading
                          ? "btn btn-sm m-1 btn-help-active"
                          : "btn btn-sm m-1 btn-help"
                      }
                    >
                      Reading
                    </button>
                    <button
                      type="button"
                      name="drawing"
                      onClick={(e) => helpHandle(e)}
                      className={
                        this.state.drawing
                          ? "btn btn-sm m-1 btn-help-active"
                          : "btn btn-sm m-1 btn-help"
                      }
                    >
                      Drawing
                    </button>
                    <button
                      type="button"
                      name="games"
                      onClick={(e) => helpHandle(e)}
                      className={
                        this.state.games
                          ? "btn btn-sm m-1 btn-help-active"
                          : "btn btn-sm m-1 btn-help"
                      }
                    >
                      Games
                    </button>
                    <button
                      type="button"
                      name="crafting"
                      onClick={(e) => helpHandle(e)}
                      className={
                        this.state.crafting
                          ? "btn btn-sm m-1 btn-help-active"
                          : "btn btn-sm m-1 btn-help"
                      }
                    >
                      Crafting
                    </button>
                  </div>
                  <div className="mt-3">
                    <span className="Title_style">Number of Children</span>
                  </div>
                  <InputGroup className="mt-3" style={{ width: "80%" }}>
                    <Input
                      type="number"
                      name="num_of_children"
                      value={this.state.num_of_children}
                      onChange={(e) => {
                        handleChange(e);
                      }}
                      style={{ textAlign: "center" }}
                      placeholder="1"
                    />
                    <button
                      type="button"
                      className="btn btn-change-children"
                      style={{ minWidth: "100px" }}
                      onClick={addNumber}
                    >
                      ➤
                    </button>
                  </InputGroup>
                  <div className="mt-3">
                    <button
                      type="button"
                      name="baby"
                      className={
                        this.state.baby
                          ? "btn btn-sm m-1 btn-help-active"
                          : "btn btn-sm m-1 btn-help"
                      }
                      onClick={(e) => childHandle(e)}
                    >
                      Baby
                    </button>
                    <button
                      type="button"
                      name="toddler"
                      className={
                        this.state.toddler
                          ? "btn btn-sm m-1 btn-help-active"
                          : "btn btn-sm m-1 btn-help"
                      }
                      onClick={(e) => childHandle(e)}
                    >
                      Toddler
                    </button>
                    <button
                      type="button"
                      name="preschooler"
                      className={
                        this.state.preschooler
                          ? "btn btn-sm m-1 btn-help-active"
                          : "btn btn-sm m-1 btn-help"
                      }
                      onClick={(e) => childHandle(e)}
                    >
                      Preschooler
                    </button>
                    <button
                      type="button"
                      name="teenager"
                      className={
                        this.state.teenager
                          ? "btn btn-sm m-1 btn-help-active"
                          : "btn btn-sm m-1 btn-help"
                      }
                      onClick={(e) => childHandle(e)}
                    >
                      Teenager
                    </button>
                  </div>
                </Col>
                <Col sm={4}>
                  <div style={{ padding: "10px" }}>
                    <div className="mb-3">
                      <span className="Title_style">When we need a sitter</span>
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="">
                        <div
                          className="Title_schedule"
                          style={{ visibility: "hidden" }}
                        >
                          Su
                        </div>
                      </div>
                      <div
                        className="d-flex justify-content-center"
                        style={{ width: "65px" }}
                      >
                        <span className="Title_schedule">Morning</span>
                      </div>
                      <div
                        className="d-flex justify-content-center"
                        style={{ width: "65px" }}
                      >
                        <span className="Title_schedule">Afternoon</span>
                      </div>
                      <div
                        className="d-flex justify-content-center"
                        style={{ width: "65px" }}
                      >
                        <span className="Title_schedule">Evening</span>
                      </div>
                      <div
                        className="d-flex justify-content-center"
                        style={{ width: "65px" }}
                      >
                        <span className="Title_schedule">Night</span>
                      </div>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mt-2">
                      <div className="">
                        <div className="Title_schedule">Su</div>
                      </div>
                      <div
                        className="d-flex justify-content-center"
                        style={{ width: "65px" }}
                      >
                        <div>
                          <Label check>
                            <Input
                              name="sun_mor"
                              type="checkbox"
                              checked={this.state.sun_mor}
                              onChange={(e) => {
                                handleChx(e);
                              }}
                            />{" "}
                          </Label>
                        </div>
                      </div>
                      <div
                        className="d-flex justify-content-center"
                        style={{ width: "65px" }}
                      >
                        <div>
                          <Label check>
                            <Input
                              type="checkbox"
                              name="sun_aft"
                              checked={this.state.sun_aft}
                              onChange={(e) => {
                                handleChx(e);
                              }}
                            />{" "}
                          </Label>
                        </div>
                      </div>
                      <div
                        className="d-flex justify-content-center"
                        style={{ width: "65px" }}
                      >
                        <div>
                          <Label check>
                            <Input
                              type="checkbox"
                              name="sun_eve"
                              checked={this.state.sun_eve}
                              onChange={(e) => {
                                handleChx(e);
                              }}
                            />{" "}
                          </Label>
                        </div>
                      </div>
                      <div
                        className="d-flex justify-content-center"
                        style={{ width: "65px" }}
                      >
                        <div>
                          <Label check>
                            <Input
                              type="checkbox"
                              name="sun_nig"
                              checked={this.state.sun_nig}
                              onChange={(e) => {
                                handleChx(e);
                              }}
                            />{" "}
                          </Label>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mt-2">
                      <div className="">
                        <div className="Title_schedule">Mo</div>
                      </div>
                      <div
                        className="d-flex justify-content-center"
                        style={{ width: "65px" }}
                      >
                        <div>
                          <Label check>
                            <Input
                              type="checkbox"
                              name="mon_mor"
                              checked={this.state.mon_mor}
                              onChange={(e) => {
                                handleChx(e);
                              }}
                            />{" "}
                          </Label>
                        </div>
                      </div>
                      <div
                        className="d-flex justify-content-center"
                        style={{ width: "65px" }}
                      >
                        <div>
                          <Label check>
                            <Input
                              type="checkbox"
                              name="mon_aft"
                              checked={this.state.mon_aft}
                              onChange={(e) => {
                                handleChx(e);
                              }}
                            />{" "}
                          </Label>
                        </div>
                      </div>
                      <div
                        className="d-flex justify-content-center"
                        style={{ width: "65px" }}
                      >
                        <div>
                          <Label check>
                            <Input
                              type="checkbox"
                              name="mon_eve"
                              checked={this.state.mon_eve}
                              onChange={(e) => {
                                handleChx(e);
                              }}
                            />{" "}
                          </Label>
                        </div>
                      </div>
                      <div
                        className="d-flex justify-content-center"
                        style={{ width: "65px" }}
                      >
                        <div>
                          <Label check>
                            <Input
                              type="checkbox"
                              name="mon_nig"
                              checked={this.state.mon_nig}
                              onChange={(e) => {
                                handleChx(e);
                              }}
                            />{" "}
                          </Label>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mt-2">
                      <div className="">
                        <div className="Title_schedule">Tu</div>
                      </div>
                      <div
                        className="d-flex justify-content-center"
                        style={{ width: "65px" }}
                      >
                        <div>
                          <Label check>
                            <Input
                              type="checkbox"
                              name="tue_mor"
                              checked={this.state.tue_mor}
                              onChange={(e) => {
                                handleChx(e);
                              }}
                            />{" "}
                          </Label>
                        </div>
                      </div>
                      <div
                        className="d-flex justify-content-center"
                        style={{ width: "65px" }}
                      >
                        <div>
                          <Label check>
                            <Input
                              type="checkbox"
                              name="tue_aft"
                              checked={this.state.tue_aft}
                              onChange={(e) => {
                                handleChx(e);
                              }}
                            />{" "}
                          </Label>
                        </div>
                      </div>
                      <div
                        className="d-flex justify-content-center"
                        style={{ width: "65px" }}
                      >
                        <div>
                          <Label check>
                            <Input
                              type="checkbox"
                              name="tue_eve"
                              checked={this.state.tue_eve}
                              onChange={(e) => {
                                handleChx(e);
                              }}
                            />{" "}
                          </Label>
                        </div>
                      </div>
                      <div
                        className="d-flex justify-content-center"
                        style={{ width: "65px" }}
                      >
                        <div>
                          <Label check>
                            <Input
                              type="checkbox"
                              name="tue_nig"
                              checked={this.state.tue_nig}
                              onChange={(e) => {
                                handleChx(e);
                              }}
                            />{" "}
                          </Label>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mt-2">
                      <div className="">
                        <div className="Title_schedule">We</div>
                      </div>

                      <div
                        className="d-flex justify-content-center"
                        style={{ width: "65px" }}
                      >
                        <div>
                          <Label check>
                            <Input
                              type="checkbox"
                              name="wed_mor"
                              checked={this.state.wed_mor}
                              onChange={(e) => {
                                handleChx(e);
                              }}
                            />{" "}
                          </Label>
                        </div>
                      </div>
                      <div
                        className="d-flex justify-content-center"
                        style={{ width: "65px" }}
                      >
                        <div>
                          <Label check>
                            <Input
                              type="checkbox"
                              name="wed_aft"
                              checked={this.state.wed_aft}
                              onChange={(e) => {
                                handleChx(e);
                              }}
                            />{" "}
                          </Label>
                        </div>
                      </div>
                      <div
                        className="d-flex justify-content-center"
                        style={{ width: "65px" }}
                      >
                        <div>
                          <Label check>
                            <Input
                              type="checkbox"
                              name="wed_eve"
                              checked={this.state.wed_eve}
                              onChange={(e) => {
                                handleChx(e);
                              }}
                            />{" "}
                          </Label>
                        </div>
                      </div>
                      <div
                        className="d-flex justify-content-center"
                        style={{ width: "65px" }}
                      >
                        <div>
                          <Label check>
                            <Input
                              type="checkbox"
                              name="wed_nig"
                              checked={this.state.wed_nig}
                              onChange={(e) => {
                                handleChx(e);
                              }}
                            />{" "}
                          </Label>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mt-2">
                      <div className="">
                        <div className="Title_schedule">Th</div>
                      </div>
                      <div
                        className="d-flex justify-content-center"
                        style={{ width: "65px" }}
                      >
                        <div>
                          <Label check>
                            <Input
                              type="checkbox"
                              name="thu_mor"
                              checked={this.state.thu_mor}
                              onChange={(e) => {
                                handleChx(e);
                              }}
                            />{" "}
                          </Label>
                        </div>
                      </div>
                      <div
                        className="d-flex justify-content-center"
                        style={{ width: "65px" }}
                      >
                        <div>
                          <Label check>
                            <Input
                              type="checkbox"
                              name="thu_aft"
                              checked={this.state.thu_aft}
                              onChange={(e) => {
                                handleChx(e);
                              }}
                            />{" "}
                          </Label>
                        </div>
                      </div>
                      <div
                        className="d-flex justify-content-center"
                        style={{ width: "65px" }}
                      >
                        <div>
                          <Label check>
                            <Input
                              type="checkbox"
                              name="thu_eve"
                              checked={this.state.thu_eve}
                              onChange={(e) => {
                                handleChx(e);
                              }}
                            />{" "}
                          </Label>
                        </div>
                      </div>
                      <div
                        className="d-flex justify-content-center"
                        style={{ width: "65px" }}
                      >
                        <div>
                          <Label check>
                            <Input
                              type="checkbox"
                              name="thu_nig"
                              checked={this.state.thu_nig}
                              onChange={(e) => {
                                handleChx(e);
                              }}
                            />{" "}
                          </Label>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mt-2">
                      <div className="">
                        <div className="Title_schedule">Fr</div>
                      </div>
                      <div
                        className="d-flex justify-content-center"
                        style={{ width: "65px" }}
                      >
                        <div>
                          <Label check>
                            <Input
                              type="checkbox"
                              name="fri_mor"
                              checked={this.state.fri_mor}
                              onChange={(e) => {
                                handleChx(e);
                              }}
                            />{" "}
                          </Label>
                        </div>
                      </div>
                      <div
                        className="d-flex justify-content-center"
                        style={{ width: "65px" }}
                      >
                        <div>
                          <Label check>
                            <Input
                              type="checkbox"
                              name="fri_aft"
                              checked={this.state.fri_aft}
                              onChange={(e) => {
                                handleChx(e);
                              }}
                            />{" "}
                          </Label>
                        </div>
                      </div>
                      <div
                        className="d-flex justify-content-center"
                        style={{ width: "65px" }}
                      >
                        <div>
                          <Label check>
                            <Input
                              type="checkbox"
                              name="fri_eve"
                              checked={this.state.fri_eve}
                              onChange={(e) => {
                                handleChx(e);
                              }}
                            />{" "}
                          </Label>
                        </div>
                      </div>
                      <div
                        className="d-flex justify-content-center"
                        style={{ width: "65px" }}
                      >
                        <div>
                          <Label check>
                            <Input
                              type="checkbox"
                              name="fri_nig"
                              checked={this.state.fri_nig}
                              onChange={(e) => {
                                handleChx(e);
                              }}
                            />{" "}
                          </Label>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mt-2">
                      <div className="">
                        <div className="Title_schedule">Sa</div>
                      </div>
                      <div
                        className="d-flex justify-content-center"
                        style={{ width: "65px" }}
                      >
                        <div>
                          <Label check>
                            <Input
                              type="checkbox"
                              name="sat_mor"
                              checked={this.state.sat_mor}
                              onChange={(e) => {
                                handleChx(e);
                              }}
                            />{" "}
                          </Label>
                        </div>
                      </div>
                      <div
                        className="d-flex justify-content-center"
                        style={{ width: "65px" }}
                      >
                        <div>
                          <Label check>
                            <Input
                              type="checkbox"
                              name="sat_eve"
                              checked={this.state.sat_eve}
                              onChange={(e) => {
                                handleChx(e);
                              }}
                            />{" "}
                          </Label>
                        </div>
                      </div>
                      <div
                        className="d-flex justify-content-center"
                        style={{ width: "65px" }}
                      >
                        <div>
                          <Label check>
                            <Input
                              type="checkbox"
                              name="sat_nig"
                              checked={this.state.sat_nig}
                              onChange={(e) => {
                                handleChx(e);
                              }}
                            />{" "}
                          </Label>
                        </div>
                      </div>
                      <div
                        className="d-flex justify-content-center"
                        style={{ width: "65px" }}
                      >
                        <div>
                          <Label check>
                            <Input type="checkbox" />{" "}
                          </Label>
                        </div>
                      </div>
                    </div>
                    <hr />
                    <div>
                      <span className="Title_style_1">Sitter priorities</span>
                    </div>
                    <div
                      className="mt-1"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        maxWidth: "250px",
                      }}
                    >
                      <span className="Title_span">Have Children</span>
                      <label className="toggle-switch">
                        <input
                          type="checkbox"
                          className="toggle"
                          name="have_children"
                          checked={this.state.have_children}
                          onChange={(e) => {
                            handleSwitch(e);
                          }}
                        />
                        <div className="slider round">
                          <span className="switch-active"></span>
                          <span className="switch-pause"></span>
                        </div>
                      </label>
                    </div>
                    <div
                      className="mt-1"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        maxWidth: "250px",
                      }}
                    >
                      <span className="Title_span">Have a driving license</span>
                      <label className="toggle-switch">
                        <input
                          type="checkbox"
                          className="toggle"
                          name="have_drive_license"
                          checked={this.state.have_drive_license}
                          onChange={(e) => {
                            handleSwitch(e);
                          }}
                        />
                        <div className="slider round">
                          <span className="switch-active"></span>
                          <span className="switch-pause"></span>
                        </div>
                      </label>
                    </div>
                    <div
                      className="mt-1"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        maxWidth: "250px",
                      }}
                    >
                      <span className="Title_span">Smoking</span>
                      <label className="toggle-switch">
                        <input
                          type="checkbox"
                          name="smoking"
                          className="toggle"
                          checked={this.state.smoking}
                          onChange={(e) => {
                            handleSwitch(e);
                          }}
                        />
                        <div className="slider round">
                          <span className="switch-active"></span>
                          <span className="switch-pause"></span>
                        </div>
                      </label>
                    </div>
                    <div
                      className="mt-1"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        maxWidth: "250px",
                      }}
                    >
                      <span className="Title_span">Available remotely</span>
                      <label className="toggle-switch">
                        <input
                          type="checkbox"
                          className="toggle"
                          name="remotely"
                          checked={this.state.remotely}
                          onChange={(e) => {
                            handleSwitch(e);
                          }}
                        />
                        <div className="slider round">
                          <span className="switch-active"></span>
                          <span className="switch-pause"></span>
                        </div>
                      </label>
                    </div>
                    <div
                      className="mt-1"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        maxWidth: "250px",
                      }}
                    >
                      <span className="Title_span">School Help</span>
                      <label className="toggle-switch">
                        <input
                          type="checkbox"
                          className="toggle"
                          name="school_help"
                          checked={this.state.school_help}
                          onChange={(e) => {
                            handleSwitch(e);
                          }}
                        />
                        <div className="slider round">
                          <span className="switch-active"></span>
                          <span className="switch-pause"></span>
                        </div>
                      </label>
                    </div>
                    <div
                      className="mt-1"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        maxWidth: "250px",
                      }}
                    >
                      <span className="Title_span" style={{ width: "75%" }}>
                        Have a experience with special needs children
                      </span>
                      <label className="toggle-switch">
                        <input
                          type="checkbox"
                          className="toggle"
                          name="have_experience_special"
                          checked={this.state.have_experience_special}
                          onChange={(e) => {
                            handleSwitch(e);
                          }}
                        />
                        <div className="slider round">
                          <span className="switch-active"></span>
                          <span className="switch-pause"></span>
                        </div>
                      </label>
                    </div>
                  </div>
                </Col>
                <Col sm={4}>
                  <div
                    className="mb-3"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      paddingTop: "10px",
                    }}
                    onClick={fileUpload}
                  >
                    <input
                      hidden
                      ref={this.selectedFile}
                      type="file"
                      name="user[image]"
                      onChange={onImgChange}
                    />
                    <img
                      alt="iCare"
                      src={this.state.imgSrc ? this.state.imgSrc : "empty.png"}
                      style={{ height: 180 }}
                    />
                  </div>
                  <div
                    className="left-line"
                    style={{
                      width: "70%",
                      paddingLeft: "15px",
                      paddingTop: "3px",
                      paddingBottom: "10px",
                    }}
                  >
                    <div style={{ marginLeft: "10px" }}>
                      <div className="mt-4">
                        <span style={{ fontSize: "13px" }}>Hourly Rate</span>
                      </div>
                      <InputGroup>
                        <Input
                          type="number"
                          name="rating"
                          value={this.state.rating}
                          onChange={(e) => {
                            handleChange(e);
                          }}
                          placeholder="0.00"
                          required
                        />
                        <InputGroupText style={{ minWidth: "60px" }}>
                          /hr
                        </InputGroupText>
                      </InputGroup>
                      <div className="mt-4">
                        <span className="Title_style">Address</span>
                      </div>
                      <FormGroup>
                        <Input
                          type="text"
                          name="city"
                          value={this.state.city}
                          required
                          onChange={(e) => {
                            handleChange(e);
                          }}
                          placeholder="City"
                        />
                      </FormGroup>
                      <FormGroup>
                        <Input
                          type="text"
                          name="street_name"
                          value={this.state.street_name}
                          onChange={(e) => {
                            handleChange(e);
                          }}
                          required
                          placeholder="Street Name"
                        />
                      </FormGroup>
                      <FormGroup>
                        <Input
                          type="text"
                          name="house_number"
                          value={this.state.house_number}
                          onChange={(e) => {
                            handleChange(e);
                          }}
                          placeholder="House Number"
                          required
                        />
                      </FormGroup>
                    </div>
                  </div>
                </Col>
              </Row>
              <Row className="mt-4">
                <Col sm={12} className="text-center">
                  <button
                    type="button"
                    className="btn btn-submit"
                    style={{ minWidth: "150px" }}
                    onClick={actionSubmit}
                  >
                    Submit
                  </button>
                  <div className="Layout_alwaysFilled mt-2">{situation}</div>
                </Col>
              </Row>
            </Form>
          </div>
        </div>
      );

      const links = MAP_LINKS[type];
      return <ShellNavigation body={profileBody} links={links} />;
    };
    const renderBabysitter = () => {
      const babysitterBody = (
        <div className="container">
          <div className="profile-board">
            <Form>
              <Row>
                <Col sm={4} className="right-line">
                  <div className="mb-3">
                    <span className="Title_styleA">Edit Profile</span>
                  </div>
                  <div className="mb-2">
                    <span className="Title_style mb-2">Description</span>
                  </div>

                  <div>
                    <textarea
                      type="text"
                      className="form-control"
                      name="description"
                      rows={4}
                      onChange={(e) => {
                        handleChange(e);
                      }}
                      defaultValue={this.state.description}
                    ></textarea>
                  </div>
                  <div className="mt-3">
                    <span className="Title_style">I'm comfortable with</span>
                  </div>
                  <div className="mt-3">
                    <button
                      type="button"
                      name="cooking"
                      className={
                        this.state.cooking
                          ? "btn btn-sm m-1 btn-help-active"
                          : "btn btn-sm m-1 btn-help"
                      }
                      onClick={(e) => helpHandle(e)}
                    >
                      Cooking
                    </button>
                    <button
                      type="button"
                      name="pets"
                      onClick={(e) => helpHandle(e)}
                      className={
                        this.state.pets
                          ? "btn btn-sm m-1 btn-help-active"
                          : "btn btn-sm m-1 btn-help"
                      }
                    >
                      Pets
                    </button>
                    <button
                      type="button"
                      name="chores"
                      onClick={(e) => helpHandle(e)}
                      className={
                        this.state.chores
                          ? "btn btn-sm m-1 btn-help-active"
                          : "btn btn-sm m-1 btn-help"
                      }
                    >
                      Chores
                    </button>
                    <button
                      type="button"
                      name="homework"
                      onClick={(e) => helpHandle(e)}
                      className={
                        this.state.homework
                          ? "btn btn-sm m-1 btn-help-active"
                          : "btn btn-sm m-1 btn-help"
                      }
                    >
                      Homework assistance
                    </button>
                    <button
                      type="button"
                      name="reading"
                      onClick={(e) => helpHandle(e)}
                      className={
                        this.state.reading
                          ? "btn btn-sm m-1 btn-help-active"
                          : "btn btn-sm m-1 btn-help"
                      }
                    >
                      Reading
                    </button>
                    <button
                      type="button"
                      name="drawing"
                      onClick={(e) => helpHandle(e)}
                      className={
                        this.state.drawing
                          ? "btn btn-sm m-1 btn-help-active"
                          : "btn btn-sm m-1 btn-help"
                      }
                    >
                      Drawing
                    </button>
                    <button
                      type="button"
                      name="games"
                      onClick={(e) => helpHandle(e)}
                      className={
                        this.state.games
                          ? "btn btn-sm m-1 btn-help-active"
                          : "btn btn-sm m-1 btn-help"
                      }
                    >
                      Games
                    </button>
                    <button
                      type="button"
                      name="crafting"
                      onClick={(e) => helpHandle(e)}
                      className={
                        this.state.crafting
                          ? "btn btn-sm m-1 btn-help-active"
                          : "btn btn-sm m-1 btn-help"
                      }
                    >
                      Crafting
                    </button>
                  </div>
                  <div className="mt-3">
                    <span className="Title_style">Experience</span>
                  </div>
                  <InputGroup className="mt-3" style={{ width: "80%" }}>
                    <Input
                      type="number"
                      name="exp_years"
                      value={this.state.exp_years}
                      onChange={(e) => {
                        handleChange(e);
                      }}
                      style={{ textAlign: "start" }}
                      placeholder="1 year"
                    />
                    <button
                      type="button"
                      className="btn btn-change-children"
                      style={{ minWidth: "100px" }}
                      onClick={addNumber}
                    >
                      ➤
                    </button>
                  </InputGroup>
                  <div className="mt-3">
                    <button
                      type="button"
                      name="baby"
                      className={
                        this.state.baby
                          ? "btn btn-sm m-1 btn-help-active"
                          : "btn btn-sm m-1 btn-help"
                      }
                      onClick={(e) => childHandle(e)}
                    >
                      Baby
                    </button>
                    <button
                      type="button"
                      name="toddler"
                      className={
                        this.state.toddler
                          ? "btn btn-sm m-1 btn-help-active"
                          : "btn btn-sm m-1 btn-help"
                      }
                      onClick={(e) => childHandle(e)}
                    >
                      Toddler
                    </button>
                    <button
                      type="button"
                      name="preschooler"
                      className={
                        this.state.preschooler
                          ? "btn btn-sm m-1 btn-help-active"
                          : "btn btn-sm m-1 btn-help"
                      }
                      onClick={(e) => childHandle(e)}
                    >
                      Preschooler
                    </button>
                    <button
                      type="button"
                      name="teenager"
                      className={
                        this.state.teenager
                          ? "btn btn-sm m-1 btn-help-active"
                          : "btn btn-sm m-1 btn-help"
                      }
                      onClick={(e) => childHandle(e)}
                    >
                      Teenager
                    </button>
                  </div>
                </Col>
                <Col sm={4}>
                  <div style={{ padding: "10px" }}>
                    <div className="mb-3">
                      <span className="Title_style">Availability</span>
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="">
                        <div
                          className="Title_schedule"
                          style={{ visibility: "hidden" }}
                        >
                          Su
                        </div>
                      </div>
                      <div
                        className="d-flex justify-content-center"
                        style={{ width: "65px" }}
                      >
                        <span className="Title_schedule">Morning</span>
                      </div>
                      <div
                        className="d-flex justify-content-center"
                        style={{ width: "65px" }}
                      >
                        <span className="Title_schedule">Afternoon</span>
                      </div>
                      <div
                        className="d-flex justify-content-center"
                        style={{ width: "65px" }}
                      >
                        <span className="Title_schedule">Evening</span>
                      </div>
                      <div
                        className="d-flex justify-content-center"
                        style={{ width: "65px" }}
                      >
                        <span className="Title_schedule">Night</span>
                      </div>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mt-2">
                      <div className="">
                        <div className="Title_schedule">Su</div>
                      </div>
                      <div
                        className="d-flex justify-content-center"
                        style={{ width: "65px" }}
                      >
                        <div>
                          <Label check>
                            <Input
                              name="sun_mor"
                              type="checkbox"
                              checked={this.state.sun_mor}
                              onChange={(e) => {
                                handleChx(e);
                              }}
                            />{" "}
                          </Label>
                        </div>
                      </div>
                      <div
                        className="d-flex justify-content-center"
                        style={{ width: "65px" }}
                      >
                        <div>
                          <Label check>
                            <Input
                              type="checkbox"
                              name="sun_aft"
                              checked={this.state.sun_aft}
                              onChange={(e) => {
                                handleChx(e);
                              }}
                            />{" "}
                          </Label>
                        </div>
                      </div>
                      <div
                        className="d-flex justify-content-center"
                        style={{ width: "65px" }}
                      >
                        <div>
                          <Label check>
                            <Input
                              type="checkbox"
                              name="sun_eve"
                              checked={this.state.sun_eve}
                              onChange={(e) => {
                                handleChx(e);
                              }}
                            />{" "}
                          </Label>
                        </div>
                      </div>
                      <div
                        className="d-flex justify-content-center"
                        style={{ width: "65px" }}
                      >
                        <div>
                          <Label check>
                            <Input
                              type="checkbox"
                              name="sun_nig"
                              checked={this.state.sun_nig}
                              onChange={(e) => {
                                handleChx(e);
                              }}
                            />{" "}
                          </Label>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mt-2">
                      <div className="">
                        <div className="Title_schedule">Mo</div>
                      </div>
                      <div
                        className="d-flex justify-content-center"
                        style={{ width: "65px" }}
                      >
                        <div>
                          <Label check>
                            <Input
                              type="checkbox"
                              name="mon_mor"
                              checked={this.state.mon_mor}
                              onChange={(e) => {
                                handleChx(e);
                              }}
                            />{" "}
                          </Label>
                        </div>
                      </div>
                      <div
                        className="d-flex justify-content-center"
                        style={{ width: "65px" }}
                      >
                        <div>
                          <Label check>
                            <Input
                              type="checkbox"
                              name="mon_aft"
                              checked={this.state.mon_aft}
                              onChange={(e) => {
                                handleChx(e);
                              }}
                            />{" "}
                          </Label>
                        </div>
                      </div>
                      <div
                        className="d-flex justify-content-center"
                        style={{ width: "65px" }}
                      >
                        <div>
                          <Label check>
                            <Input
                              type="checkbox"
                              name="mon_eve"
                              checked={this.state.mon_eve}
                              onChange={(e) => {
                                handleChx(e);
                              }}
                            />{" "}
                          </Label>
                        </div>
                      </div>
                      <div
                        className="d-flex justify-content-center"
                        style={{ width: "65px" }}
                      >
                        <div>
                          <Label check>
                            <Input
                              type="checkbox"
                              name="mon_nig"
                              checked={this.state.mon_nig}
                              onChange={(e) => {
                                handleChx(e);
                              }}
                            />{" "}
                          </Label>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mt-2">
                      <div className="">
                        <div className="Title_schedule">Tu</div>
                      </div>
                      <div
                        className="d-flex justify-content-center"
                        style={{ width: "65px" }}
                      >
                        <div>
                          <Label check>
                            <Input
                              type="checkbox"
                              name="tue_mor"
                              checked={this.state.tue_mor}
                              onChange={(e) => {
                                handleChx(e);
                              }}
                            />{" "}
                          </Label>
                        </div>
                      </div>
                      <div
                        className="d-flex justify-content-center"
                        style={{ width: "65px" }}
                      >
                        <div>
                          <Label check>
                            <Input
                              type="checkbox"
                              name="tue_aft"
                              checked={this.state.tue_aft}
                              onChange={(e) => {
                                handleChx(e);
                              }}
                            />{" "}
                          </Label>
                        </div>
                      </div>
                      <div
                        className="d-flex justify-content-center"
                        style={{ width: "65px" }}
                      >
                        <div>
                          <Label check>
                            <Input
                              type="checkbox"
                              name="tue_eve"
                              checked={this.state.tue_eve}
                              onChange={(e) => {
                                handleChx(e);
                              }}
                            />{" "}
                          </Label>
                        </div>
                      </div>
                      <div
                        className="d-flex justify-content-center"
                        style={{ width: "65px" }}
                      >
                        <div>
                          <Label check>
                            <Input
                              type="checkbox"
                              name="tue_nig"
                              checked={this.state.tue_nig}
                              onChange={(e) => {
                                handleChx(e);
                              }}
                            />{" "}
                          </Label>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mt-2">
                      <div className="">
                        <div className="Title_schedule">We</div>
                      </div>

                      <div
                        className="d-flex justify-content-center"
                        style={{ width: "65px" }}
                      >
                        <div>
                          <Label check>
                            <Input
                              type="checkbox"
                              name="wed_mor"
                              checked={this.state.wed_mor}
                              onChange={(e) => {
                                handleChx(e);
                              }}
                            />{" "}
                          </Label>
                        </div>
                      </div>
                      <div
                        className="d-flex justify-content-center"
                        style={{ width: "65px" }}
                      >
                        <div>
                          <Label check>
                            <Input
                              type="checkbox"
                              name="wed_aft"
                              checked={this.state.wed_aft}
                              onChange={(e) => {
                                handleChx(e);
                              }}
                            />{" "}
                          </Label>
                        </div>
                      </div>
                      <div
                        className="d-flex justify-content-center"
                        style={{ width: "65px" }}
                      >
                        <div>
                          <Label check>
                            <Input
                              type="checkbox"
                              name="wed_eve"
                              checked={this.state.wed_eve}
                              onChange={(e) => {
                                handleChx(e);
                              }}
                            />{" "}
                          </Label>
                        </div>
                      </div>
                      <div
                        className="d-flex justify-content-center"
                        style={{ width: "65px" }}
                      >
                        <div>
                          <Label check>
                            <Input
                              type="checkbox"
                              name="wed_nig"
                              checked={this.state.wed_nig}
                              onChange={(e) => {
                                handleChx(e);
                              }}
                            />{" "}
                          </Label>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mt-2">
                      <div className="">
                        <div className="Title_schedule">Th</div>
                      </div>
                      <div
                        className="d-flex justify-content-center"
                        style={{ width: "65px" }}
                      >
                        <div>
                          <Label check>
                            <Input
                              type="checkbox"
                              name="thu_mor"
                              checked={this.state.thu_mor}
                              onChange={(e) => {
                                handleChx(e);
                              }}
                            />{" "}
                          </Label>
                        </div>
                      </div>
                      <div
                        className="d-flex justify-content-center"
                        style={{ width: "65px" }}
                      >
                        <div>
                          <Label check>
                            <Input
                              type="checkbox"
                              name="thu_aft"
                              checked={this.state.thu_aft}
                              onChange={(e) => {
                                handleChx(e);
                              }}
                            />{" "}
                          </Label>
                        </div>
                      </div>
                      <div
                        className="d-flex justify-content-center"
                        style={{ width: "65px" }}
                      >
                        <div>
                          <Label check>
                            <Input
                              type="checkbox"
                              name="thu_eve"
                              checked={this.state.thu_eve}
                              onChange={(e) => {
                                handleChx(e);
                              }}
                            />{" "}
                          </Label>
                        </div>
                      </div>
                      <div
                        className="d-flex justify-content-center"
                        style={{ width: "65px" }}
                      >
                        <div>
                          <Label check>
                            <Input
                              type="checkbox"
                              name="thu_nig"
                              checked={this.state.thu_nig}
                              onChange={(e) => {
                                handleChx(e);
                              }}
                            />{" "}
                          </Label>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mt-2">
                      <div className="">
                        <div className="Title_schedule">Fr</div>
                      </div>
                      <div
                        className="d-flex justify-content-center"
                        style={{ width: "65px" }}
                      >
                        <div>
                          <Label check>
                            <Input
                              type="checkbox"
                              name="fri_mor"
                              checked={this.state.fri_mor}
                              onChange={(e) => {
                                handleChx(e);
                              }}
                            />{" "}
                          </Label>
                        </div>
                      </div>
                      <div
                        className="d-flex justify-content-center"
                        style={{ width: "65px" }}
                      >
                        <div>
                          <Label check>
                            <Input
                              type="checkbox"
                              name="fri_aft"
                              checked={this.state.fri_aft}
                              onChange={(e) => {
                                handleChx(e);
                              }}
                            />{" "}
                          </Label>
                        </div>
                      </div>
                      <div
                        className="d-flex justify-content-center"
                        style={{ width: "65px" }}
                      >
                        <div>
                          <Label check>
                            <Input
                              type="checkbox"
                              name="fri_eve"
                              checked={this.state.fri_eve}
                              onChange={(e) => {
                                handleChx(e);
                              }}
                            />{" "}
                          </Label>
                        </div>
                      </div>
                      <div
                        className="d-flex justify-content-center"
                        style={{ width: "65px" }}
                      >
                        <div>
                          <Label check>
                            <Input
                              type="checkbox"
                              name="fri_nig"
                              checked={this.state.fri_nig}
                              onChange={(e) => {
                                handleChx(e);
                              }}
                            />{" "}
                          </Label>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mt-2">
                      <div className="">
                        <div className="Title_schedule">Sa</div>
                      </div>
                      <div
                        className="d-flex justify-content-center"
                        style={{ width: "65px" }}
                      >
                        <div>
                          <Label check>
                            <Input
                              type="checkbox"
                              name="sat_mor"
                              checked={this.state.sat_mor}
                              onChange={(e) => {
                                handleChx(e);
                              }}
                            />{" "}
                          </Label>
                        </div>
                      </div>
                      <div
                        className="d-flex justify-content-center"
                        style={{ width: "65px" }}
                      >
                        <div>
                          <Label check>
                            <Input
                              type="checkbox"
                              name="sat_eve"
                              checked={this.state.sat_eve}
                              onChange={(e) => {
                                handleChx(e);
                              }}
                            />{" "}
                          </Label>
                        </div>
                      </div>
                      <div
                        className="d-flex justify-content-center"
                        style={{ width: "65px" }}
                      >
                        <div>
                          <Label check>
                            <Input
                              type="checkbox"
                              name="sat_nig"
                              checked={this.state.sat_nig}
                              onChange={(e) => {
                                handleChx(e);
                              }}
                            />{" "}
                          </Label>
                        </div>
                      </div>
                      <div
                        className="d-flex justify-content-center"
                        style={{ width: "65px" }}
                      >
                        <div>
                          <Label check>
                            <Input type="checkbox" />{" "}
                          </Label>
                        </div>
                      </div>
                    </div>
                    <hr />

                    <div
                      className="mt-1"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        maxWidth: "250px",
                      }}
                    >
                      <span className="Title_span">I have children</span>
                      <label className="toggle-switch">
                        <input
                          type="checkbox"
                          className="toggle"
                          name="have_children"
                          checked={this.state.have_children}
                          onChange={(e) => {
                            handleSwitch(e);
                          }}
                        />
                        <div className="slider round">
                          <span className="switch-active"></span>
                          <span className="switch-pause"></span>
                        </div>
                      </label>
                    </div>
                    <div
                      className="mt-1"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        maxWidth: "250px",
                      }}
                    >
                      <span className="Title_span">
                        I have a driving license
                      </span>
                      <label className="toggle-switch">
                        <input
                          type="checkbox"
                          className="toggle"
                          name="have_drive_license"
                          checked={this.state.have_drive_license}
                          onChange={(e) => {
                            handleSwitch(e);
                          }}
                        />
                        <div className="slider round">
                          <span className="switch-active"></span>
                          <span className="switch-pause"></span>
                        </div>
                      </label>
                    </div>
                    <div
                      className="mt-1"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        maxWidth: "250px",
                      }}
                    >
                      <span className="Title_span">I smoke</span>
                      <label className="toggle-switch">
                        <input
                          type="checkbox"
                          name="smoking"
                          className="toggle"
                          checked={this.state.smoking}
                          onChange={(e) => {
                            handleSwitch(e);
                          }}
                        />
                        <div className="slider round">
                          <span className="switch-active"></span>
                          <span className="switch-pause"></span>
                        </div>
                      </label>
                    </div>
                    <div
                      className="mt-1"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        maxWidth: "250px",
                      }}
                    >
                      <span className="Title_span">Available remotely</span>
                      <label className="toggle-switch">
                        <input
                          type="checkbox"
                          className="toggle"
                          name="remotely"
                          checked={this.state.remotely}
                          onChange={(e) => {
                            handleSwitch(e);
                          }}
                        />
                        <div className="slider round">
                          <span className="switch-active"></span>
                          <span className="switch-pause"></span>
                        </div>
                      </label>
                    </div>
                    <div
                      className="mt-1"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        maxWidth: "250px",
                      }}
                    >
                      <span className="Title_span">School Help</span>
                      <label className="toggle-switch">
                        <input
                          type="checkbox"
                          className="toggle"
                          name="school_help"
                          checked={this.state.school_help}
                          onChange={(e) => {
                            handleSwitch(e);
                          }}
                        />
                        <div className="slider round">
                          <span className="switch-active"></span>
                          <span className="switch-pause"></span>
                        </div>
                      </label>
                    </div>
                    <div
                      className="mt-1"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        maxWidth: "250px",
                      }}
                    >
                      <span className="Title_span" style={{ width: "75%" }}>
                        I have a experience with special needs children
                      </span>
                      <label className="toggle-switch">
                        <input
                          type="checkbox"
                          className="toggle"
                          name="have_experience_special"
                          checked={this.state.have_experience_special}
                          onChange={(e) => {
                            handleSwitch(e);
                          }}
                        />
                        <div className="slider round">
                          <span className="switch-active"></span>
                          <span className="switch-pause"></span>
                        </div>
                      </label>
                    </div>
                  </div>
                </Col>
                <Col sm={4}>
                  <div
                    className="mb-3"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      paddingTop: "10px",
                    }}
                    onClick={fileUpload}
                  >
                    <input
                      hidden
                      ref={this.selectedFile}
                      type="file"
                      name="user[image]"
                      onChange={onImgChange}
                    />
                    <img
                      alt="iCare"
                      src={this.state.imgSrc ? this.state.imgSrc : "empty.png"}
                      style={{ height: 180 }}
                    />
                  </div>
                  <div
                    className="left-line"
                    style={{
                      width: "70%",
                      paddingLeft: "15px",
                      paddingTop: "3px",
                      paddingBottom: "10px",
                    }}
                  >
                    <div style={{ marginLeft: "10px" }}>
                      <div className="mt-4">
                        <span style={{ fontSize: "13px" }}>Hourly Rate</span>
                      </div>
                      <InputGroup>
                        <Input
                          type="number"
                          name="rating"
                          value={this.state.rating}
                          onChange={(e) => {
                            handleChange(e);
                          }}
                          placeholder="0.00"
                          required
                        />
                        <InputGroupText style={{ minWidth: "60px" }}>
                          /hr
                        </InputGroupText>
                      </InputGroup>
                      <div className="mt-4">
                        <span className="Title_style">Address</span>
                      </div>
                      <FormGroup>
                        <Input
                          type="text"
                          name="city"
                          value={this.state.city}
                          required
                          onChange={(e) => {
                            handleChange(e);
                          }}
                          placeholder="City"
                        />
                      </FormGroup>
                      <FormGroup>
                        <Input
                          type="text"
                          name="street_name"
                          value={this.state.street_name}
                          onChange={(e) => {
                            handleChange(e);
                          }}
                          required
                          placeholder="Street Name"
                        />
                      </FormGroup>
                      <FormGroup>
                        <Input
                          type="text"
                          name="house_number"
                          value={this.state.house_number}
                          onChange={(e) => {
                            handleChange(e);
                          }}
                          placeholder="House Number"
                          required
                        />
                      </FormGroup>
                    </div>
                  </div>
                </Col>
              </Row>
              <Row className="mt-4">
                <Col sm={12} className="text-center">
                  <button
                    type="button"
                    className="btn btn-submit"
                    style={{ minWidth: "150px" }}
                    onClick={actionSubmit}
                  >
                    Submit
                  </button>
                  <div className="Layout_alwaysFilled mt-2">{situation}</div>
                </Col>
              </Row>
            </Form>
          </div>
        </div>
      );

      const links = MAP_LINKS[type];
      return <ShellNavigation body={babysitterBody} links={links} />;
    };
    // render redirection if the user is not logged in
    if (!user) {
      return <Navigate to="/" />;
    }
    if (type === "babysitter") {
      return renderBabysitter();
    } else if (type === "parent") {
      return renderParent();
    }
  }
}

export default ViewProfile;
