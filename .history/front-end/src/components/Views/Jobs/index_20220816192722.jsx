import React from "react";

import { Navigate } from "react-router-dom";

import AppContext from "@contexts/App";

import ShellNavigation from "@components/Shells/Navigation";

import PartialJobPost from "@components/Partials/JobPost";

import DatabaseDriver from "@database/Driver";

import AppKeys from "@shared/AppKeys";
import Links from "@shared/Links";

import { Input, Row, Col } from "reactstrap";

import "./index.css";

const KEY_NUMBER_JOB = AppKeys["NUMBER_JOB"];
const KEY_CHECK_FAMILY = AppKeys["CHECK_FAMILY"];
const KEY_CHECK_SITTER = AppKeys["CHECK_SITTER"];
const KEY_NUMBER_USER = AppKeys["NUMBER_USER"];
const MAP_LINKS = Links["MAP_LINKS"];

class ViewJobs extends React.Component {
  static contextType = AppContext;

  constructor(props) {
    super(props);

    this.state = {
      jobs: [],
      checkFamily: true,
      checkSitter: true,
      searchDescription: "",
      filterJobs: [],
      location: false,
      price: false,
      schedule: false,
      itemDataList: [],
    };
  }

  componentDidMount() {
    this.loadJobs();
  }

  loadJobs() {
    const { context } = this;
    const { user } = context;
    const numberUser = user.number;
    const parameters = {
      [KEY_NUMBER_USER]: numberUser,
    };
    DatabaseDriver.loadJobs(parameters)
      .then((jobs) => {
        this.setState({ jobs: jobs });
        this.setState({ filterJobs: jobs });
      })
      .catch((error) => {});
  }

  filterJobs() {
    const { state } = this;
    const { checkFamily, checkSitter } = state;

    const parameters = {
      [KEY_CHECK_FAMILY]: checkFamily,
      [KEY_CHECK_SITTER]: checkSitter,
    };

    DatabaseDriver.filterJobs(parameters)
      .then((jobs) => {
        this.setState({ jobs: jobs });
      })
      .catch((error) => {});
  }

  render() {
    const { context, state } = this;

    const { user } = context;

    // const { checkFamily, checkSitter } = state;

    // const actionFilter = () => {
    //   this.filterJobs();
    // };

    // const changeCheckValue = (key) => (event) => {
    //   const element = event.target;
    //   const value = element.checked;
    //   this.setState({ [key]: value });
    // };
    const handleSearchChange = (e) => {
      this.setState({ searchDescription: e.target.value });
    };
    const handleSearchSubmit = () => {
      const jobResult = this.state.jobs.filter((item) =>
        item.description.includes(this.state.searchDescription)
      );
      this.setState({ filterJobs: jobResult });
    };

    const handleSpecialSearch = (e) => {
      console.log(e.target.name);
      var tempLocation = this.state.location;
      var tempPrice = this.state.price;
      var tempSchedule = this.state.schedule;
      if (e.target.name === "location") {
        this.setState({ location: !this.state.location });
        tempLocation = !this.state.location;
      }
      if (e.target.name === "price") {
        this.setState({ price: !this.state.price });
        tempPrice = !this.state.price;
      }
      if (e.target.name === "schedule") {
        this.setState({ schedule: !this.state.schedule });
        tempSchedule = !this.state.schedule;
      }

      const parameters = {
        location: tempLocation,
        price: tempPrice,
        schedule: tempSchedule,
        user_number: user.number,
      };
      console.log(parameters);
      DatabaseDriver.filterJobs(parameters)
        .then((jobs) => {
          this.setState({ filterJobs: jobs });
        })
        .catch((error) => {
          console.log(error);
        });
    };

    const filterJobDiv = (
      <div className="filter-job-div">
        <div className="job-search">
          <div className="mt-3">
            <span className="job-title">Search </span>
            <span className="job-title-A "> Jobs</span>
          </div>
        </div>
        <Row className="mt-3 d-flex justify-content-center mb-5">
          <Col sm={8} className="m-1">
            <Input
              type="text"
              name="search"
              onChange={(e) => {
                handleSearchChange(e);
              }}
              placeholder="What you looking for?"
            />
          </Col>
          <Col sm={2} className="m-1">
            <button
              type="button"
              className="btn btn-search"
              onClick={handleSearchSubmit}
              style={{ minWidth: "150px" }}
            >
              Search
            </button>
          </Col>
        </Row>
      </div>
    );

    // render for parents
    const renderA = () => {
      const { filterJobs } = state;
      const { context } = this;
      const { user } = context;

      // const titleJobsAll = strings["TITLE_JOBS_ALL"];

      const makeJobElement = (job) => {
        const { [KEY_NUMBER_JOB]: key } = job;

        const key_job = "job_" + key;
        return (
          <div key={key_job} className="ViewJobsBabysitter_jobEntry">
            <PartialJobPost job={job} user={user} page_type={"job"} />
          </div>
        );
      };
      const elementsJob = filterJobs.map(makeJobElement);

      const body = (
        <div className="jobcontainer">
          <div className="ViewJobsParent_all">
            {filterJobDiv}
            <div className="filter-job-sub mt-5 mb-5">
              <Row className="text-center">
                <Col sm={6} className="p-1">
                  <button
                    type="button"
                    className={
                      this.state.location
                        ? "btn btn-help-active"
                        : "btn btn-help"
                    }
                    name="location"
                    onClick={(e) => handleSpecialSearch(e)}
                    style={{ minWidth: 150 , background: "plum" , color: "white" , borderColor: "white"}}
                  >
                    Location
                  </button>
                </Col>
                <Col sm={6} className="p-1">
                  <button
                    type="button"
                    name="price"
                    className={
                      this.state.price ? "btn btn-help-active" : "btn btn-help"
                    }
                    onClick={(e) => handleSpecialSearch(e)}
                    style={{ minWidth: 150 , background: "plum" , color: "white" , borderColor: "white"}}
                  >
                    Price
                  </button>
                </Col>
                {/* <Col sm={4} className="p-1">
                  <button
                    type="button"
                    name="schedule"
                    className={
                      this.state.schedule
                        ? "btn btn-help-active"
                        : "btn btn-help"
                    }
                    onClick={(e) => handleSpecialSearch(e)}
                    style={{ minWidth: 150 }}
                  >
                    Fits My Schedule
                  </button>
                </Col> */}
              </Row>
            </div>
            {/* <div className="ViewJobsParent_titleAll mt-4">
              <span className="Title_styleA">{ titleJobsAll }</span>
            </div> */}
            <div className="me-3 ms-3 mt-4" >
              <Row lg="2" md="2" sm="1" xs="1" style={{marginRight: "900px"}}>
                {elementsJob}
              </Row>
            </div>
          </div>
        </div>
      );

      const links = MAP_LINKS[type];

      return <ShellNavigation body={body} links={links} />;
    };

    // render redirection if the user is not logged in
    if (!user) {
      return <Navigate to="/" />;
    }

    const { type } = user;
    return renderA();
  }
}

export default ViewJobs;
