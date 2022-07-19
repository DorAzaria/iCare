import React from 'react';

import AppContext from '@contexts/App';

import ShellMainGate from '@components/Shells/MainGate';

import DatabaseDriver from '@database/Driver';

import AppKeys from '@shared/AppKeys';
import ErrorCodes from '@shared/ErrorCodes';

import './index.css';

const KEY_EMAIL = AppKeys['EMAIL'];
const KEY_ERROR_CODE = AppKeys['ERROR_CODE'];
const KEY_FIRST_NAME = AppKeys['FIRST_NAME'];
const KEY_LAST_NAME = AppKeys['LAST_NAME'];
const KEY_PASSWORD = AppKeys['PASSWORD'];
const KEY_USERNAME = AppKeys['USERNAME'];
const KEY_REGISTRATION_TYPE = AppKeys['REGISTRATION_TYPE'];
const KEY_LOC = AppKeys['LOC'];
const KEY_DESCRIPTION = AppKeys['DESCRIPTION'];
const KEY_AGE = AppKeys['AGE'];
const KEY_GENDER = AppKeys['GENDER'];
const KEY_EDUCATION = AppKeys['EDUCATION'];
const KEY_EXP_YEARS = AppKeys['EXP_YEARS'];
const KEY_SKILL = AppKeys['SKILL'];
const KEY_NUM_OF_CHILDREN = AppKeys['NUM_OF_CHILDREN'];

class ViewRegister extends React.Component {

  static contextType = AppContext;

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      situation: '',
      username: '',
      type: 'babysitter',

      loc:'',
      short_info:'',
      age:0,
      gender:0,
      education:'',
      exp_years:0,
      skill:0,

      num_of_children:0,

      firstNameError:'',
      lastNameError:'',
      userNameError:'',
      emailError:'',
      pwdError:'',
      locError:'',
      shortInfoError:'',
      ageError:'',
      educationError:'',
      expYearsError:'',
      childrenNumError:''
    };
  }

  render () {

    const { context, state } = this;

    const { strings } = context;

    const { situation } = state;

    const labelBabysitter = strings['LABEL_BABYSITTER'];
    const labelEmail = strings['LABEL_EMAIL']
    const labelFirstName = strings['LABEL_FIRST_NAME'];
    const labelLastName = strings['LABEL_LAST_NAME'];
    const labelParent = strings['LABEL_PARENT'];
    const labelPassword = strings['LABEL_PASSWORD'];
    const labelRegister = strings['LABEL_REGISTER'];
    const labelType = strings['LABEL_TYPE'];
    const labelUsername = strings['LABEL_USERNAME'];
    const labelLoc = strings['LABEL_LOC'];
    const labelShortInfo = strings['LABEL_SHORT_INFO'];
    const labelAge = strings['LABEL_AGE'];
    const labelGender = strings['LABEL_GENDER'];
    const labelEducation = strings['LABEL_EDUCATION'];
    const labelExpYears = strings['LABEL_EXP_YEARS'];
    const labelSkills = strings['LABEL_SKILLS'];
    const labelNumOfChildren = strings['LABEL_NUM_OF_CHILDREN'];

    const titleRegister = strings['TITLE_REGISTER'];
    

    const situationFail = strings['MESSAGE_REGISTRATION_FAIL'];
    const situationSuccess = strings['MESSAGE_REGISTRATION_SUCCESS'];
    const situationTry = strings['MESSAGE_REGISTRATION_TRY'];

    const genderValue = {'male':0, 'female':1};
    const skillValue = {'child_care':0, 'school_help':1};
    const setValue = (key) => (event) => {

      const element = event.target;
      const value = element.value;
      if ( key === 'gender') {
        this.setState( {[key]: genderValue[value]});
      }
      else if ( key === 'skill') {
        this.setState ( {[key]: skillValue[value]});
      }
      else {
        this.setState({ [key]: value });
      }
    };

    const setType = (type) => () => {

      this.setState({ type: type });

    };

    const actionSubmit = () => {

      let { email, firstName, lastName, username, password, type, loc, short_info, age, gender, education, exp_years, skill, num_of_children } = state;
      this.setState ( {firstNameError:''});
      this.setState ( {lastNameError:''});
      this.setState ( {userNameError:''});
      this.setState ( {emailError:''});
      this.setState ( {pwdError:''});
      this.setState ( {locError:''});
      this.setState ( {shortInfoError:''});
      this.setState ( {ageError:''});
      this.setState ( {educationError:''});
      this.setState ( {childrenNumError:''});

      if ( firstName === '') {
        this.setState ( {firstNameError:' ( Required )'});
        return;        
      }
      if ( lastName === '') {
        this.setState ( {lastNameError:' ( Required )'});
        return;        
      }
      if ( username === '') {
        this.setState ( {userNameError:' ( Required )'});
        return;        
      }

      if ( email === '') {
        this.setState ( {emailError:' ( Required )'});
        return;        
      }
      if ( email.includes('@') === false) {
        this.setState ( {emailError:' ( Missing @ )'});
        return;        
      }
      if ( password.length < 6) {
        this.setState ( {pwdError:' ( Should be over 6 letters )'});
        return;        
      }
      if ( loc === '') {
        this.setState ( {locError:' ( Required )'});
        return;        
      }            
      if ( short_info === '') {
        this.setState ( {shortInfoError:' ( Required )'});
        return;        
      }
      if ( type ==='babysitter') {
        let age_num = Number ( age );
        if ( age_num === Infinity || String(age_num) !== age) {
          this.setState ( {ageError:' ( Age should be number)'});
          return;
        }

        if ( age_num < 19) {
          this.setState ( {ageError:' ( Should be over 19 )'});
          return;                
        }

        if ( education === '') {
          this.setState ( {educationError:' ( Required )'});
          return;        
        }

        let years_num = Number ( exp_years );
        if ( years_num === Infinity || String(years_num) !== exp_years) {
          this.setState ( {expYearsError:' ( Years should be number)'});
          return;
        }

        if ( exp_years === 0) {
          this.setState ( {expYearsError:' ( Should be over 0 )'});
        }
        num_of_children = 0;
      }
      else {
        age = 0;
        education = '';
        exp_years= 0;
        
        let num_of_children_num = Number(num_of_children);
        if ( num_of_children_num === Infinity || String(num_of_children_num) !== num_of_children) {
          this.setState ( {childrenNumError:' ( This should be number)'});
          return;
        }
        if ( num_of_children === 0) {
          this.setState ( {childrenNumError:' ( Should be over 0 )'});
        }
      }


      const request = {
        [KEY_EMAIL]: email,
        [KEY_FIRST_NAME]: firstName,
        [KEY_LAST_NAME]: lastName,
        [KEY_PASSWORD]: password,
        [KEY_USERNAME]: username,
        [KEY_REGISTRATION_TYPE]: type,
        [KEY_LOC]: loc,
        [KEY_DESCRIPTION]: short_info,
        [KEY_AGE]: age,
        [KEY_GENDER]: gender,
        [KEY_EDUCATION]: education,
        [KEY_EXP_YEARS]: exp_years,
        [KEY_SKILL]: skill,
        [KEY_NUM_OF_CHILDREN]: num_of_children
      };

      const registrationFail = () => {

        this.setState({ situation: situationFail });

      };

      const registrationSuccess = () => {

        this.setState({ situation: situationSuccess });
        window.location.href = '/';

      };

      const registrationTry = () => {
        console.log ( "registering...");
        DatabaseDriver.registerUser(request)
          .then((response) => {

            const errorCode = response[KEY_ERROR_CODE];

            if (errorCode !== ErrorCodes['ERROR_NONE']) {

              registrationFail();

            } else {

              registrationSuccess();

            }

          }).catch((error) => {

            registrationFail();

          });

      };

      this.setState({ situation: situationTry }, registrationTry);

    };
    const {locError, shortInfoError, ageError, educationError, expYearsError, childrenNumError} = state;
    const sitterBody = (
      <div>
        <div>
          <div className="Layout_inputLabel">
            <span> {labelLoc} </span>
            <span style = {{color:'red'}}> { locError }</span>
          </div>
          <div className="Layout_inputField">
            <input style = {{width:'100%'}}  type="text" onChange={ setValue('loc') }/>
          </div>
        </div>

        <div>
          <div className="Layout_inputLabel">
            <span> {labelShortInfo} </span>
            <span style = {{color:'red'}}> { shortInfoError }</span>
          </div>
          <div className="Layout_inputField">
            <textarea style = {{width:'100%'}} onChange={ setValue('short_info') }/>
          </div>
        </div>

        <div>
          <div className="Layout_inputLabel">
            <span> {labelAge} </span>
            <span style = {{color:'red'}}> { ageError }</span>
          </div>
          <div className="Layout_inputField">
            <input style = {{width:'100%'}}  type="text"  onChange={ setValue('age') }/>
          </div>
        </div>

        <div>
          <div className="Layout_inputLabel">
            <span> {labelGender} </span>
          </div>
            <select style = {{width:'100%'}} onChange = {setValue('gender')}>
              <option value ="male">Male</option>
              <option value = "female">Female</option>
            </select>
        </div>

        <div>
          <div className="Layout_inputLabel">
            <span> {labelEducation} </span>
            <span style = {{color:'red'}}> { educationError }</span>
          </div>
          <div className="Layout_inputField">
            <input style = {{width:'100%'}} type="text" onChange={ setValue('education') }/>
          </div>
        </div>


        <div>
          <div className="Layout_inputLabel">
            <span> {labelExpYears} </span>
            <span style = {{color:'red'}}> { expYearsError }</span>
          </div>
          <div className="Layout_inputField">
            <input style = {{width:'100%'}} type="text" onChange={ setValue('exp_years') }/>
          </div>
        </div>        

        <div>
          <div className="Layout_inputLabel">
            <span> {labelSkills} </span>
          </div>
          <div className="Layout_inputField">
            <select style = {{width:'100%'}} onChange = {setValue('skill')}>
              <option value ="child_care">Child Care</option>
              <option value = "school_help">School Help</option>
            </select>
          </div>
        </div>

        <button style = {{marginTop:10}} className="Button_navigation" onClick={ actionSubmit }>{ labelRegister }</button>
        <div className="Layout_alwaysFilled">{ situation }</div>
      </div>
    );

    const parentBody = (
      <div>
        <div>
          <div>
            <div className="Layout_inputLabel">
              <span> {labelLoc} </span>
              <span style = {{color:'red'}}> { locError }</span>
            </div>
            <div className="Layout_inputField">
              <input style = {{width:'100%'}} type="text" onChange={ setValue('loc') }/>
            </div>
          </div>

          <div>
            <div className="Layout_inputLabel">
              <span> {labelShortInfo} </span>
              <span style = {{color:'red'}}> { shortInfoError }</span>
            </div>
            <div className="Layout_inputField">
              <textarea style = {{width:'100%'}} onChange={ setValue('short_info') }/>
            </div>
          </div>

          <div className="Layout_inputLabel">
            <span> {labelNumOfChildren} </span>
            <span style = {{color:'red'}}> { childrenNumError }</span>
          </div>
          <div className="Layout_inputField">
            <input style = {{width:'100%'}} type="text" onChange={ setValue('num_of_children') }/>
          </div>
        </div>        
        <button style = {{marginTop:10}} className="Button_navigation" onClick={ actionSubmit }>{ labelRegister }</button>
        <div className="Layout_alwaysFilled">{ situation }</div>
      </div>
    );

    const {type, firstNameError, lastNameError, userNameError, emailError, pwdError} = state;
    
    const commonBody = (
      <div>
        <div className="ViewRegisterMainGate_title">
          <span className="Title_styleA">{ titleRegister }</span>
        </div>
        <div>
          <div className="Layout_inputLabel">
            <span>{ labelFirstName }</span>
            <span style = {{color:'red'}}> { firstNameError }</span>
          </div>
          <div className="Layout_inputField">
            <input style = {{width:'100%'}} type="text" onChange={ setValue('firstName') } required/>
          </div>
        </div>
        <div>
          <div className="Layout_inputLabel">
            <span>{ labelLastName }</span>
            <span style = {{color:'red'}}> { lastNameError }</span>
          </div>
          <div className="Layout_inputField">
            <input style = {{width:'100%'}} type="text" onChange={ setValue('lastName') } />
          </div>
        </div>
        <div>
          <div className="Layout_inputLabel">
            <span>{ labelUsername }</span>
            <span style = {{color:'red'}}> { userNameError }</span>
          </div>
          <div className="Layout_inputField">
            <input style = {{width:'100%'}} type="text" onChange={ setValue('username') } />
          </div>
        </div>
        <div>
          <div className="Layout_inputLabel">
            <span>{ labelEmail }</span>
            <span style = {{color:'red'}}> { emailError }</span>
          </div>
          <div className="Layout_inputField">
            <input style = {{width:'100%'}} type="text" onChange={ setValue('email') }/>
          </div>
        </div>
        <div>
          <div className="Layout_inputLabel">
            <span>{ labelPassword }</span>
            <span style = {{color:'red'}}> { pwdError }</span>
          </div>
          <div className="Layout_inputField">
            <input style = {{width:'100%'}} type="password" onChange={ setValue('password') }/>
          </div>
        </div>
        <div>
          <div className="Layout_inputLabel">
            <span>{ labelType }</span>
          </div>
          <div className="Layout_inputField Layout_radioRow">
            <div className="Layout_radioBox">
              <input type="radio" name="type" checked = {type === 'babysitter'} onChange={ setType('babysitter') } />
              <span className="Layout_radioBoxLabel">{ labelBabysitter }</span>
            </div>
            <div className="Layout_radioBox">
              <input type="radio" name="type" onChange={ setType('parent') } />
              <span className="Layout_radioBoxLabel">{ labelParent }</span>
            </div>
          </div>
        </div>
      </div>
    );

    if ( type ==='babysitter') {
      const body = (
        <div className="ViewRegisterMainGate">
          {commonBody}
          {sitterBody}
        </div>
      )
      return (<ShellMainGate body={ body }/>);
    }
    const body = (
      <div className="ViewRegisterMainGate">
        {commonBody}
        {parentBody}
      </div>
    )    
    return (<ShellMainGate body={ body }/>);
  }

}

export default ViewRegister;