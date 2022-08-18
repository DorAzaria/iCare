import React from "react";

import { Navigate } from "react-router-dom";

import AppContext from "@contexts/App";

import ShellNavigation from "@components/Shells/Navigation";

import PartialParentProfile from "@components/Partials/ParentProfile";
import PartialJobPost from "@components/Partials/JobPost";
import PartialReview from "@components/Partials/Review";

import DatabaseDriver from "@database/Driver";

import AppKeys from "@shared/AppKeys";
import ErrorCodes from "@shared/ErrorCodes";
import Links from "@shared/Links";

import "./index.css";

import ComponentHelpers from "@components/Helpers";

import { Button , Table} from "reactstrap";

const { withSearchParams } = ComponentHelpers;

const KEY_NUMBER_USER = AppKeys["NUMBER_USER"];
const KEY_NUMBER_TO = AppKeys["NUMBER_TO"];
const KEY_NUMBER_PARENT = AppKeys["NUMBER_PARENT"];
const KEY_NUMBER_JOB = AppKeys["NUMBER_JOB"];

const KEY_NUMBER_REVIEW = AppKeys["NUMBER_REVIEW"];

const KEY_SESSION = AppKeys["SESSION"];

const KEY_RATING = AppKeys["RATING"];
const KEY_DESCRIPTION = AppKeys["DESCRIPTION"];
const KEY_ERROR_CODE = AppKeys["ERROR_CODE"];

const MAP_LINKS = Links["MAP_LINKS"];

class ViewParentProfile extends React.Component {
  static contextType = AppContext;

  constructor(props) {
    super(props);

    this.state = {
      title: "",
      description: "",
      rating: 0,
      situation: "",
      sitter: null,
      reviews: [],
      jobs: [],
      reviewStatus: "",
      startPage: 0,
      curPage: 0,
      nPage: 1,
    };
  }

  componentDidMount() {
    this.loadSitter();
    this.loadReviews();
    this.loadUserSchedule();
    this.loadJobs();
  }

  loadUserSchedule() {
    const { props } = this;

    const { searchParams } = props;

    const numberUser = searchParams.get(KEY_NUMBER_USER);
    // const numberUser = user.number;

    

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


  loadSitter() {
    const { props } = this;
    const { searchParams } = props;

    const numberUser = searchParams.get(KEY_NUMBER_USER);
    // const numberUser = user.number;
    console.log("sitter", numberUser);
    const parameters = {
      [KEY_NUMBER_USER]: numberUser,
    };

    DatabaseDriver.loadUsers(parameters)
      .then((sitter) => {
        console.log("sitter");
        console.log(sitter);
        this.setState({ sitter: sitter });
      })
      .catch((error) => {});
  }

  loadReviews() {
    const { props } = this;
    const { searchParams } = props;

    const numberUser = searchParams.get(KEY_NUMBER_USER);
    let parameters;

    parameters = {
      [KEY_NUMBER_TO]: numberUser,
    };

    DatabaseDriver.loadReviews(parameters)
      .then((reviews) => {
        console.log("Reviews");
        console.log(reviews);
        this.setState({ reviews: reviews });
      })
      .catch((error) => {});
  }
  loadJobs() {
    const { props } = this;
    const { searchParams } = props;
    const numberUser = searchParams.get(KEY_NUMBER_USER);

    let parameters;

    parameters = {
      [KEY_NUMBER_PARENT]: numberUser,
    };

    DatabaseDriver.loadJobs(parameters)
      .then((jobs) => {
        console.log("Jobs");
        console.log(jobs);
        this.setState({ jobs: jobs });
      })
      .catch((error) => {});
  }

  saveReview() {
    const { props, context } = this;
    const { searchParams } = props;
    const { description, rating } = this.state;
    const { user } = context;

    const number_to = searchParams.get(KEY_NUMBER_USER);

    let request;
    const { session } = user;
    request = {
      [KEY_SESSION]: session,
      [KEY_NUMBER_TO]: number_to,
      [KEY_DESCRIPTION]: description,
      [KEY_RATING]: rating,
    };

    const reviewFail = (errorCode) => {
      if (errorCode === ErrorCodes["ERROR_GENERIC"]) {
        this.setState({
          reviewStatus:
            "You have failed to leave review owing to network problem",
        });
      } else {
        this.setState({
          reviewStatus: "You have already left review to the parents",
        });
      }
    };

    const reviewSuccess = (response) => {
      this.setState({
        reviewStatus: "You have successfully left review to the parents",
      });

      // reload jobs to refresh "all jobs" list
      this.loadReviews();
    };
    console.log("saving...");
    console.log(request);
    DatabaseDriver.saveReview(request)
      .then((response) => {
        const errorCode = response[KEY_ERROR_CODE];

        if (errorCode !== ErrorCodes["ERROR_NONE"]) {
          reviewFail(errorCode);
        } else {
          reviewSuccess(response);
        }
      })
      .catch((error) => {
        reviewFail(ErrorCodes["ERROR_GENERIC"]);
      });
  }

  render() {
    const { context, state } = this;

    const { user } = context;

    const setValue = (key) => (event) => {
      const element = event.target;
      const value = element.value;
      console.log(value);
      this.setState({ [key]: value });
    };

    const actionSaveReview = () => {
      this.saveReview();
    };

    const makeJobElement = (job) => {
      const { [KEY_NUMBER_JOB]: key } = job;
      const key_job = "job_" + key;
      return (
        <PartialJobPost
          key={key_job}
          job={job}
          user={user}
          page_type={"profile"}
        />
      );
    };

    const makeReviewElement = (review) => {
      const { [KEY_NUMBER_REVIEW]: key } = review;
      const key_review = "review_" + key;
      return <PartialReview key={key_review} review={review} />;
    };

    const makePageElement = (page) => {
      let key_page = "page_" + page["number"];
      if (page["number"] === page["current"]) {
        return (
          <a
            key={key_page}
            href="#foo"
            className="active"
            onClick={() => currentPage(page["number"])}
          >
            {page["number"] + 1}
          </a>
        );
      } else {
        return (
          <a
            key={key_page}
            href="#foo"
            onClick={() => currentPage(page["number"])}
          >
            {page["number"] + 1}
          </a>
        );
      }
    };

    const addPage = (n) => {
      let { startPage, curPage, nPage } = state;
      curPage += n;
      if (curPage < 0) {
        curPage = 0;
      }
      if (curPage >= nPage) {
        curPage = nPage - 1;
      }
      if (curPage < startPage) {
        startPage = curPage;
      }
      if (curPage > startPage + 4) {
        startPage = curPage - 4;
      }
      this.setState({ startPage: startPage });
      this.setState({ curPage: curPage });
    };

    const currentPage = (curPage) => {
      let { startPage, nPage } = state;
      if (curPage < 0) {
        curPage = 0;
      }
      if (curPage >= nPage) {
        curPage = nPage - 1;
      }
      if (curPage < startPage) {
        startPage = curPage;
      }
      if (curPage > startPage + 4) {
        startPage = curPage - 4;
      }
      this.setState({ startPage: startPage });
      this.setState({ curPage: curPage });
    };

    // render for babysitters from the parent
    const renderA = () => {
      const { reviews, sitter, jobs, reviewStatus, startPage, curPage, nPage } =
        state;

      const { strings,
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
       } = context;

      const titleParentReviews = strings["TITLE_PARENT_REVIEWS"];
      const titleParentJobs = strings["TITLE_PARENT_JOBS"];

      let pageReviews = [];
      let startReview = curPage * 5;
      let endReview = startReview + 5;
      if (endReview > reviews.length) {
        endReview = reviews.length;
      }
      for (let i = startReview; i < endReview; i++) {
        pageReviews.push(reviews[i]);
      }
      const elementsReview = pageReviews.map(makeReviewElement);

      let endPage = startPage + 5;
      if (endPage >= nPage) endPage = nPage;
      let pages = [];
      for (let i = startPage; i < endPage; i++) {
        pages.push({ number: i, current: curPage });
      }
      let elementsPage = pages.map(makePageElement);

      const elementsJob = jobs.map(makeJobElement);

      const body = (
        <div className="ViewParentProfile container">
          {<PartialParentProfile sitter={sitter} />}

          <div className="ViewJobsBabysitter_titleAll" style={{marginTop: 40}}>
              <span className="Title_styleA" style={{width: '80%', marginLeft: 130, marginTop: 20}}>Availability</span>
            </div>

            <div className="leave-review-div" style={{height: 390}}>
                <Table striped>
                <thead>
                  <tr>
                    <th> </th>
                    <th style={{textAlign: 'center'}}>Morning</th>
                    <th style={{textAlign: 'center'}}>Afternoon</th>
                    <th style={{textAlign: 'center'}}>Evening</th>
                    <th style={{textAlign: 'center'}}>Night</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row" style={{textAlign: 'center'}}>Sunday</th>
                    <td style={{textAlign: 'center'}}>{this.state.sun_mor ? "✔" : ""}</td>
                    <td style={{textAlign: 'center'}}>{this.state.sun_aft ? "✔" : ""}</td>
                    <td style={{textAlign: 'center'}}>{this.state.sun_eve ? "✔" : ""}</td>
                    <td style={{textAlign: 'center'}}>{this.state.sun_nig ? "✔" : ""}</td>
                  </tr>
                  <tr>
                    <th scope="row" style={{textAlign: 'center'}}>Monday</th>
                    <td style={{textAlign: 'center'}}>{this.state.mon_mor ? "✔" : ""}</td>
                    <td style={{textAlign: 'center'}}>{this.state.mon_aft ? "✔" : ""}</td>
                    <td style={{textAlign: 'center'}}>{this.state.mon_eve ? "✔" : ""}</td>
                    <td style={{textAlign: 'center'}}>{this.state.mon_nig ? "✔" : ""}</td>
                  </tr>
                  <tr>
                    <th scope="row" style={{textAlign: 'center'}}>Tuesday</th>
                    <td style={{textAlign: 'center'}}>{this.state.tue_mor ? "✔" : ""}</td>
                    <td style={{textAlign: 'center'}}>{this.state.tue_aft ? "✔" : ""}</td>
                    <td style={{textAlign: 'center'}}>{this.state.tue_eve ? "✔" : ""}</td>
                    <td style={{textAlign: 'center'}}>{this.state.tue_nig ? "✔" : ""}</td>
                  </tr>
                  <tr>
                    <th scope="row" style={{textAlign: 'center'}}>Wednsday</th>
                    <td style={{textAlign: 'center'}}>{this.state.wed_mor ? "✔" : ""}</td>
                    <td style={{textAlign: 'center'}}>{this.state.wed_aft ? "✔" : ""}</td>
                    <td style={{textAlign: 'center'}}>{this.state.wed_eve ? "✔" : ""}</td>
                    <td style={{textAlign: 'center'}}>{this.state.wed_nig ? "✔" : ""}</td>
                  </tr>
                  <tr>
                    <th scope="row" style={{textAlign: 'center'}}>Thursday</th>
                    <td style={{textAlign: 'center'}}>{this.state.thu_mor ? "✔" : ""}</td>
                    <td style={{textAlign: 'center'}}>{this.state.thu_aft ? "✔" : ""}</td>
                    <td style={{textAlign: 'center'}}>{this.state.thu_eve ? "✔" : ""}</td>
                    <td style={{textAlign: 'center'}}>{this.state.thu_nig ? "✔" : ""}</td>
                  </tr>
                  <tr>
                    <th scope="row" style={{textAlign: 'center'}}>Friday</th>
                    <td style={{textAlign: 'center'}}>{this.state.fri_mor ? "✔" : ""}</td>
                    <td style={{textAlign: 'center'}}>{this.state.fri_aft ? "✔" : ""}</td>
                    <td style={{textAlign: 'center'}}>{this.state.fri_eve ? "✔" : ""}</td>
                    <td style={{textAlign: 'center'}}>{this.state.fri_nig ? "✔" : ""}</td>
                  </tr>
                  <tr>
                    <th scope="row" style={{textAlign: 'center'}}>Saturday</th>
                    <td style={{textAlign: 'center'}}>{this.state.sat_mor ? "✔" : ""}</td>
                    <td style={{textAlign: 'center'}}>{this.state.sat_aft ? "✔" : ""}</td>
                    <td style={{textAlign: 'center'}}>{this.state.sat_eve ? "✔" : ""}</td>
                    <td style={{textAlign: 'center'}}>{this.state.sat_nig ? "✔" : ""}</td>
                  </tr>
                </tbody>

                </Table>
            </div>

            <div className="ViewJobsBabysitter_titleAll" style={{marginTop: 40}}>
              <span className="Title_styleA" style={{width: '80%', marginLeft: 130, marginTop: 20}}>{titleParentReviews}</span>
            </div>

          <div className="leave-review-div">
            <Button
              color="secondary"
              className="Button_navigation"
              onClick={actionSaveReview}
            >
              Leave Review
            </Button>
            <span style={{ color: "black", paddingLeft: "30px" }}>Rating: </span>
            <select style={{ width: "100px", marginBottom: 20  }} onChange={setValue("rating")}>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
            <span style={{ color: "black" }}>{reviewStatus}</span>
            <textarea
              style={{ width: "100%", border: "1px plum solid" }}
              onChange={setValue("description")}
            ></textarea>
          </div>

          <div style={{width: '80%', marginLeft: 130}}> 

          <div className="ViewJobsBabysitter_listAll mt-4">
            {elementsReview}
          </div>
          <div>
            <div className="pagination" style={{ float: "right" }}>
              <a href="#foo" onClick={() => addPage(-1)}>
                &laquo;
              </a>
              <span>{elementsPage}</span>
              <a href="#foo" onClick={() => addPage(1)}>
                &raquo;
              </a>
              <span style={{ color: "white" }}>!</span>
            </div>

            <div style={{ paddingTop: 30 }}>
              <span className="Title_styleA">{titleParentJobs}</span>
            </div>
            <div className="ViewJobsBabysitter_listAll">{elementsJob}</div>
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

    switch (type) {
      case "babysitter": {
        return renderA();
      }

      case "parent": {
        return renderA();
      }

      default: {
        return <Navigate to="/" />;
      }
    }
  }
}

export default withSearchParams(ViewParentProfile);
