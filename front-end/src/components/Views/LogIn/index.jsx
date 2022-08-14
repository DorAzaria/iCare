import React from 'react';
import { Link } from 'react-router-dom';
import AppContext from '@contexts/App';

import ShellMainGate  from '@components/Shells/MainGate';

import DatabaseDriver from '@database/Driver';

import AppKeys from '@shared/AppKeys';
import ErrorCodes from '@shared/ErrorCodes';

import './index.css';

import { Button, Input, Container, Row, Form, FormGroup, Label, Col, FormFeedback, FormText } from 'reactstrap';

const KEY_ERROR_CODE = AppKeys['ERROR_CODE'];
const KEY_FIRST_NAME = AppKeys['FIRST_NAME'];
const KEY_LAST_NAME = AppKeys['LAST_NAME'];
const KEY_NUMBER_USER = AppKeys['NUMBER_USER'];
const KEY_REGISTRATION_TYPE = AppKeys['REGISTRATION_TYPE'];
const KEY_PASSWORD = AppKeys['PASSWORD'];
const KEY_USERNAME = AppKeys['USERNAME'];
const KEY_SESSION = AppKeys['SESSION'];

const TIMEOUT_LOG_IN = 2400; // milliseconds

class ViewLogIn extends React.Component {

  static contextType = AppContext;

  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      situation: '',
      validate: {
        emailState: '',
      },
    };

  }

  render () {

    const { context, state } = this;

    const { strings, user, app } = context;

    // render for when the user is not logged in.
    const renderB = () => {

      const { username, password, situation } = state;

      const setValue = (key, event) => {
        const element = event.target;
        const value = element.value;
        this.setState({ [key]: value });
  
      };
      
      const situationFail = strings['MESSAGE_LOG_IN_FAIL'];
      const situationSuccess = strings['MESSAGE_LOG_IN_SUCCESS'];
      const situationTry = strings['MESSAGE_LOG_IN_TRY'];

      const labelLogIn = strings['LABEL_LOG_IN'];
      const labelRegister = strings['LABEL_REGISTER'];
      const labelPassword = strings['LABEL_PASSWORD'];
      // const labelUsername = strings['LABEL_USERNAME'];
      const labelEmail = strings['LABEL_EMAIL']

      const titleLogIn = strings['TITLE_LOG_IN'];

      const validateEmail = (e) => {
        const emailRex =
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
        const { validate } = this.state;
    
        if (emailRex.test(e.target.value)) {
          validate.emailState = 'has-success';
        } else {
          validate.emailState = 'has-danger';
        }
    
        this.setState({ validate });
      };
      const handleChange = (e) => {
        setValue(e.target.name, e);
      }

      const actionSubmit = (e) => {
        e.preventDefault();
        const request = {
          [KEY_PASSWORD]: password,
          [KEY_USERNAME]: username,
        };
        const loadUser = (response) => () => {

          const session = response[KEY_SESSION];
          const firstName = response[KEY_FIRST_NAME];
          const lastName = response[KEY_LAST_NAME];
          const number = response[KEY_NUMBER_USER];
          const type = response[KEY_REGISTRATION_TYPE];
          const avatar = response['userAvatar'];
          const user = { session, firstName, lastName, number, type, avatar };
          sessionStorage.setItem ( 'user', JSON.stringify(user));

          app.setState({ user: user });

        };
  
        const logInFail = () => {
  
          this.setState({ situation: situationFail });
  
        };
  
        const logInSuccess = (response) => {
  
          this.setState({ situation: situationSuccess });

          setTimeout(loadUser(response), TIMEOUT_LOG_IN);
  
        };
  
        const logInTry = () => {
          console.log ( 'trying log in');
          DatabaseDriver.logInUser(request)
            .then((response) => {
              console.log ( 'response');
              console.log ( response);
              const errorCode = response[KEY_ERROR_CODE];
  
              if (errorCode !== ErrorCodes['ERROR_NONE']) {
  
                logInFail();
  
              } else {
  
                logInSuccess(response);
  
              }
  
            }).catch((error) => {
  
              logInFail();
  
            });
  
        };
  
        this.setState({ situation: situationTry }, logInTry);
  
      };

      const body = (
        <Container>
          <Row className='justify-content-md-center'>
            <div className="ViewLogInMainGate">
              <div className="ViewLogInMainGate_title">
                <span className="Title_styleA">{ titleLogIn }</span>
              </div>
              <Form style={{padding: '15px'}}>
                <FormGroup>
                  <Label for="Email" >{labelEmail}</Label>
                  <Input 
                    type="username" 
                    name="username" 
                    id="Email" 
                    valid={this.state.validate.emailState === "has-success"}
                    invalid={this.state.validate.emailState === "has-danger"}
                    onChange={(e) => {
                      validateEmail(e);
                      handleChange(e);
                    }}
                    placeholder="admin@admin.com" 
                  />
                  <FormFeedback>
                    Please input a correct email.
                  </FormFeedback>
                  <FormText>
                    <span className='text-muted' style={{fontSize: '10px'}}>We'll never share your email with anyone else</span>
                  </FormText>
                  
                </FormGroup>
                <FormGroup>
                  <Label for="password">{labelPassword}</Label>
                  <Input type="password" name="password" id="password" onChange={(e) => {handleChange(e)} } placeholder="********" />
                </FormGroup>
                <Row className='mb-4'>
                  <Col sm={6}>
                    <FormGroup check>
                      <Label check>
                        <Input type="checkbox" />{' '}
                          <span className='text-dark' style={{fontSize: '14px'}}>Check me out</span>
                      </Label>
                    </FormGroup>
                  </Col>
                  <Col sm={6} className="text-end">
                    <Link style={{fontSize: '12px', textDecoration: 'none'}} to="/">
                      <span className='text-dark'>Did you forgot your password?</span>
                    </Link>
                  </Col>
                </Row>
                <Row className='mb-3'>
                  <Col sm={12} className="text-center" style={{display: 'flex', justifyContent: 'space-evenly', alignItems: 'center'}}>
                    <Button color = "dark" onClick={ actionSubmit } style={{minWidth: '150px'}}>{ labelLogIn }</Button>
                    <Link to="/register">
                      <button type='button' className='btn btn-register' style={{minWidth: '150px'}}>{labelRegister}</button>
                    </Link>
                    
                  </Col>
                </Row>
                
                <div className="Layout_alwaysFilled">{ situation }</div>
              </Form>
            </div>
          </Row>
        </Container>
        
      );

      return (<ShellMainGate body={ body }/>);
      

    };

    if (user) { // logged-in

      //return renderA();
      window.location.href = "/";

    } else { // not logged-in
      return renderB();

    }

  }

}

export default ViewLogIn;
