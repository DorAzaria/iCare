import React from 'react';

import { Link, Navigate } from 'react-router-dom';

import AppContext from '@contexts/App';

import ShellNavigation from '@components/Shells/Navigation';

import PartialSitter from '@components/Partials/Sitter';
import PartialSitterProfile from '@components/Partials/SitterProfile';
import PartialJobPost from '@components/Partials/JobPost';
import PartialReview from '@components/Partials/Review';

import DatabaseDriver from '@database/Driver';

import AppKeys from '@shared/AppKeys';
import ErrorCodes from '@shared/ErrorCodes';
import Links from '@shared/Links';

import './index.css';

import ComponentHelpers from '@components/Helpers';

const { withSearchParams } = ComponentHelpers;


const KEY_NUMBER_USER = AppKeys['NUMBER_USER']
const KEY_NUMBER_TO = AppKeys['NUMBER_TO']
const KEY_NUMBER_PARENT = AppKeys['NUMBER_PARENT']
const KEY_NUMBER_FRIEND = AppKeys['NUMBER_FRIEND']
const KEY_NUMBER_JOB = AppKeys['NUMBER_JOB'];

const KEY_NUMBER_REVIEW = AppKeys['NUMBER_REVIEW']

const KEY_SESSION = AppKeys['SESSION'];

const KEY_RATING = AppKeys['RATING']
const KEY_DESCRIPTION = AppKeys['DESCRIPTION']
const KEY_ERROR_CODE = AppKeys['ERROR_CODE']


const MAP_LINKS = Links['MAP_LINKS'];

class ViewSitterProfile extends React.Component {

  static contextType = AppContext;

  constructor(props) {
    super(props);

    this.state = {
      title: '',
      description: '',
      rating:0,
      situation: '',
      sitter: null,
      reviews:[],
      jobs:[]
    };

  }

  componentDidMount() {
    this.loadSitter();
    this.loadReviews();
    this.loadJobs();
  }

  loadSitter () {

    const { context, props } = this;

    const { searchParams } = props;

    const numberUser = searchParams.get(KEY_NUMBER_USER);

    const parameters = {
      [KEY_NUMBER_USER]: numberUser,
    };

    DatabaseDriver.loadUsers(parameters)
      .then((sitter) => {
        console.log ( 'sitter');
        console.log ( sitter);
        this.setState({ sitter: sitter });

      })
      .catch((error) => {


      });

  }  

  loadReviews () {
    const { props } = this;
    const { searchParams } = props;

    const numberUser = searchParams.get(KEY_NUMBER_USER);    

    let parameters;

    parameters = {
      [KEY_NUMBER_TO]: numberUser,
    };


    DatabaseDriver.loadReviews(parameters)
      .then((reviews) => {
        console.log ( 'Reviews');
        console.log ( reviews);
        this.setState({ reviews: reviews });

      })
      .catch((error) => {


      });

  }
  loadJobs () {
    const { props } = this;
    const { searchParams } = props;

    const numberUser = searchParams.get(KEY_NUMBER_USER);    

    let parameters;

    parameters = {
      [KEY_NUMBER_PARENT]: numberUser,
    };


    DatabaseDriver.loadJobs(parameters)
      .then((jobs) => {
        console.log ( 'Jobs');
        console.log ( jobs);
        this.setState({ jobs: jobs });

      })
      .catch((error) => {


      });

  }  

  saveReview() {
    const { props, context } = this;
    const { searchParams } = props;
    const {description, rating} = this.state;
    const { strings, user } = context;

    const situationFail = strings['MESSAGE_JOBS_FAIL'];
    const situationSuccess = strings['MESSAGE_JOBS_SUCCESS'];

    const number_to = searchParams.get(KEY_NUMBER_USER);

    let request;
    const { session } = user;
    request = {
      [KEY_SESSION]: session,
      [KEY_NUMBER_TO]: number_to,
      [KEY_DESCRIPTION]:description,
      [KEY_RATING]:rating
    };

    const reviewFail = () => {
  
      this.setState({ situation: situationFail });
  
    };
  
    const reviewSuccess = (response) => {
  
      this.setState({ situation: situationSuccess });
  
      // reload jobs to refresh "all jobs" list
      this.loadReviews();
  
    };
    console.log ( 'saving...')
    console.log ( request);
    DatabaseDriver.saveReview(request)
    .then((response) => {

      const errorCode = response[KEY_ERROR_CODE];

      if (errorCode !== ErrorCodes['ERROR_NONE']) {

        reviewFail();

      } else {

        reviewSuccess(response);

      }

    }).catch((error) => {

      reviewFail();

    });

  }


  render () {

    const { context, state } = this;

    const { strings, user } = context;

    const { situation } = state;

    const setValue = (key) => (event) => {

      const element = event.target;
      const value = element.value;
      console.log ( value);
      this.setState({ [key]: value });
  
    };  

    const actionSaveReview = () => {

      this.saveReview();

    };

    const actionAddWatchList = () => {
      const { props, context } = this;
      const { searchParams } = props;
      const { strings, user } = context;
  
      const situationFail = strings['MESSAGE_JOBS_FAIL'];
      const situationSuccess = strings['MESSAGE_JOBS_SUCCESS'];
  
      const number_friend = searchParams.get(KEY_NUMBER_USER);
  
      let request;
      const { session } = user;
      request = {
        [KEY_SESSION]: session,
        [KEY_NUMBER_FRIEND]: number_friend,
      };
  
      const watchFail = () => {
    
        this.setState({ situation: situationFail });
    
      };
    
      const watchSuccess = (response) => {
        console.log ( response);
    
        this.setState({ situation: situationSuccess });
   
      };
      console.log ( request);
      DatabaseDriver.saveWatch(request)
      .then((response) => {
  
        const errorCode = response[KEY_ERROR_CODE];
  
        if (errorCode !== ErrorCodes['ERROR_NONE']) {
  
          watchFail();
  
        } else {
  
          watchSuccess(response);
  
        }
  
      }).catch((error) => {
  
        watchFail();
  
      });
    }


    const makeJobElement = (job) => {
      const {[KEY_NUMBER_JOB]: key} = job;
      const key_job = 'job_' + key;      
      return (<PartialJobPost key = {key_job} job={ job }/>);

    };

    const makeReviewElement = (review) => {
      const {[KEY_NUMBER_REVIEW]:key} = review;
      const key_review = 'review_' + key;
      return (<PartialReview key = {key_review} review={ review }/>);
    }

    // render for babysitters from the parent
    const renderA = () => {

      const { reviews, sitter, jobs } = state;

      const { strings } = context;


      const titleSitterReviews = strings['TITLE_SITTER_REVIEWS'];
      const titleSitterJobs = strings['TITLE_SITTER_JOBS'];
      

      const elementsReview= reviews.map(makeReviewElement);
      const elementsJob = jobs.map(makeJobElement);


      const body = (
        <div className="ViewJobsBabysitter">

          <div className="ViewJobsBabysitter_all">
          <button className='Button_navigation'  style = {{float:'right'}} onClick={ actionAddWatchList }>Add To My Watch List</button>
            {<PartialSitterProfile sitter={ sitter }/>}
            <div style = {{margin:'10px 2px 10px 2px', border:'1px solid black',borderRadius: '5px'}}>
              <button className='Button_navigation' onClick={ actionSaveReview }>Leave Review</button>
              <span style = {{color:'blue', paddingLeft:'30px'}}>Rating: </span>
              <select style = {{width:'100px'}} onChange={ setValue('rating') }>
                <option value = "1" >1</option>
                <option value = "2">2</option>
                <option value = "3">3</option>
                <option value = "4">4</option>
                <option value = "5">5</option>
              </select>
              <textarea style = {{width:'100%'}} onChange={ setValue('description') }></textarea>
            </div>         

            <div className="ViewJobsBabysitter_titleAll">
              <span className="Title_styleA">{ titleSitterReviews }</span>
            </div>
            <div className="ViewJobsBabysitter_listAll">
              
              { elementsReview }
            </div>

            <div className="ViewJobsBabysitter_titleAll">
              <span className="Title_styleA">{ titleSitterJobs }</span>
            </div>
            <div className="ViewJobsBabysitter_listAll">
              { elementsJob }
            </div>            
          </div>
        </div>
      );

      const links = MAP_LINKS[type];

      return (<ShellNavigation body={ body } links={ links }/>);

    };    
    // render redirection if the user is not logged in
    if (!user) {

      return (<Navigate to="/"/>);

    }

    const { type } = user;

    switch (type) {

      case 'parent': {

        return renderA();

      }

      case 'babysitter': {

        return (<Navigate to="/"/>);

      }

      default:{
        return (<Navigate to="/"/>);
      }

    }

  }

}

export default withSearchParams(ViewSitterProfile);
