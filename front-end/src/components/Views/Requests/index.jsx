import React from 'react';

import {Navigate } from 'react-router-dom';

import AppContext from '@contexts/App';

import ShellNavigation from '@components/Shells/Navigation';
import PartialChatRequest from '@components/Partials/ChatRequest';
import PartialJobPost from '@components/Partials/JobPost';

import DatabaseDriver from '@database/Driver';

import AppKeys from '@shared/AppKeys';
import ErrorCodes from '@shared/ErrorCodes';
import Links from '@shared/Links';

import { Button, Row, Col, Form, FormGroup, Label, Input } from 'reactstrap';

import './index.css';


const KEY_APPLICATIONS = AppKeys['APPLICATIONS'];
const KEY_DESCRIPTION = AppKeys['DESCRIPTION'];
const KEY_ERROR_CODE = AppKeys['ERROR_CODE'];
const KEY_JOB = AppKeys['JOB'];
const KEY_SESSION = AppKeys['SESSION'];
const KEY_NUMBER_APPLICATION = AppKeys['NUMBER_APPLICATION'];
const KEY_NUMBER_JOB = AppKeys['NUMBER_JOB'];
const KEY_NUMBER_USER =  AppKeys['NUMBER_USER'];
const KEY_REGISTRATION_TYPE = AppKeys['REGISTRATION_TYPE'];
const KEY_TIME_A = AppKeys['TIME_A'];
const KEY_TIME_B = AppKeys['TIME_B'];
const KEY_TITLE = AppKeys['TITLE'];
const KEY_APPLIED_JOBS = AppKeys['APPLIED_JOBS']
const KEY_POSTED_JOBS = AppKeys['POSTED_JOBS']

const MAP_LINKS = Links['MAP_LINKS'];

class ViewRequests extends React.Component {

  static contextType = AppContext;

  constructor(props) {
    super(props);

    this.state = {
      title: '',
      description: '',
      timeA: '1970-01-01 00:00',
      timeB: '1970-01-01 00:00',
      situation: '',
      posted_jobs: [],
      applied_jobs:[],
    };

  }

  componentDidMount() {

    this.loadApplications();

  }

  loadApplications () {

    const { context } = this;

    const { user } = context;

    const { number, type } = user;

    const parameters = {
      [KEY_NUMBER_USER]: number,
      [KEY_REGISTRATION_TYPE]: type,
    };

    DatabaseDriver.loadApplications(parameters)
      .then((data) => {

        this.setState({ applied_jobs: data[KEY_APPLIED_JOBS] });
        this.setState({ posted_jobs: data[KEY_POSTED_JOBS] });
      })
      .catch((error) => {


      });

  }

  render () {

    const { context, state } = this;

    const { strings, user } = context;

    const { title, description, timeA, timeB, situation } = state;

    const { session } = user;

    const labelDescription = strings['LABEL_DESCRIPTION'];
    const labelScheduleStart = strings['LABEL_SCHEDULE_START'];
    const labelScheduleEnd = strings['LABEL_SCHEDULE_END'];
    const labelTitle = strings['LABEL_TITLE'];

    const situationFail = strings['MESSAGE_JOBS_FAIL'];
    const situationSuccess = strings['MESSAGE_JOBS_SUCCESS'];
    const situationTry = strings['MESSAGE_JOBS_TRY'];
    
    const setValue = (key) => (event) => {

      const element = event.target;
      const value = element.value;
      this.setState({ [key]: value });

    };

    const setTime = (key) => (event) => {

      const element = event.target;
      const datetime = element.value;
      const post_date = datetime.split('T')[0];
      const post_time = datetime.split('T')[1];
      const post_datetime = post_date + ' ' + post_time;

      if (datetime) {
        this.setState({ [key]: post_datetime });
      }

    };

    const actionSubmit = () => {

      const request = {
        [KEY_SESSION]: session,
        [KEY_TITLE]: title,
        [KEY_DESCRIPTION]: description,
        [KEY_TIME_A]: timeA,
        [KEY_TIME_B]: timeB,
      };

      const jobsFail = () => {

        this.setState({ situation: situationFail });

      };

      const jobsSuccess = (response) => {
        this.setState({ situation: situationSuccess });

      };

      const jobsTry = () => {

        DatabaseDriver.saveJob(request)
          .then((response) => {
            const errorCode = response[KEY_ERROR_CODE];

            if (errorCode === ErrorCodes['ERROR_NONE']) {
              jobsSuccess(response);

            } else {
              jobsFail();

            }

          }).catch((error) => {

            jobsFail();

          });

      };

      this.setState({ situation: situationTry }, jobsTry);

    };

    const actionRefresh = () => {

      this.loadApplications();

    };    

    const addNewJobDiv = 
      <div className="add-job-div">
        <Form>
          <FormGroup className = "add-job-row">
            <Label for="title" style = {{color:'blue'}}>{ labelTitle } :</Label>
            <Input type="text" name="title" id="title" onChange={ setValue('title') } placeholder="Title" required />
          </FormGroup>
          <FormGroup className = "add-job-description-row">
            <Label for="description" style = {{color:'blue'}}>{ labelDescription } :</Label>
            <textarea style = {{width:'100%'}} id="description" name="description" className='form-control' onChange={ setValue('description') }></textarea>
          </FormGroup>
          <Row>
            <Col sm={6}>
              <FormGroup className = "add-job-row">
                <Label for="scheduleStart" style = {{color:'blue'}}>{ labelScheduleStart } :</Label>
                <Input type="datetime-local" name="timeA" id="scheduleStart" onChange={ setTime('timeA') } required />
              </FormGroup>
            </Col>
            <Col sm={6}>
              <FormGroup className = "add-job-row">
                <Label for="scheduleEnd" style = {{color:'blue'}}>{ labelScheduleEnd } :</Label>
                <Input type="datetime-local" name="timeB" id="scheduleEnd" onChange={ setTime('timeB') } required />
              </FormGroup>
            </Col>
          </Row>
          
          <Row lg = "2" md = "2" sm = "2" xs = "2" className='mt-4'>
            <Col>
              <Button color = "success" onClick={ actionSubmit } style = {{marginLeft:100}}>Add New Job</Button>
            </Col>
            <Col>
              <Button color = "primary" onClick={ actionRefresh } style = {{marginLeft:40}}>REFRESH All Jobs</Button>
            </Col>
          </Row>
        </Form>
        
        
        <div className="Layout_alwaysFilled">{ situation }</div>
      </div>

    // render for parents
    const renderA = () => {

      const { posted_jobs, applied_jobs } = state;

      const { strings } = context;

      const titlePostedJobs = strings['TITLE_POSTED_JOBS'];
      const titleAppliedJobs = strings['TITLE_APPLIED_JOBS'];
      
      const makePostedJobElement = (application) => {
        const {
          [KEY_NUMBER_APPLICATION]: numberApplication,
        } = application;
        const posted_key = 'posted_job_' + numberApplication;
        return (
          <div key={ posted_key }>
            <PartialChatRequest application={ application} job_type = {'posted'}/>
          </div>
        );

      };

      const makePostedJobsElement = (jobApplication) => {
        const {
          [KEY_NUMBER_JOB]: key,
          [KEY_APPLICATIONS]: applications,
        } = jobApplication;

        const elementsApplication = applications.map(makePostedJobElement);
        const application_key = 'application_' + key;
        const {context} = this;
        const {user} = context;
        return (
          <div key={ application_key } className="ViewRequestsParent_singleApplication">
            <Row lg = "2" md = "2" sm="1" xs = "1" >
              <Col>
                <PartialJobPost job={ jobApplication} user = {user} page_type = {'posted'}/>
              </Col>
              <Col>
                <div className="ViewRequestsParent_applications">
                  { elementsApplication }
                </div>
              </Col>
            </Row>
          </div>
        );

      };

      const makeAppliedJobElement = (jobApplication) => {

        const {
          [KEY_JOB]: job,
          [KEY_NUMBER_APPLICATION]: key,
        } = jobApplication;


        const applied_job_key = 'applied_job_' + key;

        const {context} = this;
        const {user} = context;

        return (
          <div key={ applied_job_key } className="ViewRequestsBabysitter_singleApplication">
            <Row lg = "2" md = "2" sm = "1" xs = "1">
              <Col>
                <PartialJobPost job={ job } user = {user} page_type = {'applied'}/>
              </Col>
              <Col>
                <div className="ViewRequestsBabysitter_applications">
                <PartialChatRequest application={ jobApplication } job_type = {'applied'}/>
              </div>
              </Col>
            </Row>
          </div>
        );

      };      

      const elementsPostedJob = posted_jobs.map(makePostedJobsElement);
      const elementsAppliedJob = applied_jobs.map(makeAppliedJobElement);

      const body = (
        <div className="ViewRequestsParent container">
          {addNewJobDiv}
          <div className="ViewRequestsParent_titleAll mt-4">
            <span className="Title_styleA">{ titlePostedJobs }</span>
          </div>
          <div className="ViewRequestsParent_listAll">
            { elementsPostedJob }
          </div>
          <div className="ViewRequestsBabysitter_titleAll">
              <span className="Title_styleA">{ titleAppliedJobs }</span>
          </div>
          <div className="ViewRequestsBabysitter_listAll">
            { elementsAppliedJob }
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
    return renderA();
  }

}

export default ViewRequests;
