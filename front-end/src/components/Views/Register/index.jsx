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
      type: '',
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

    const titleRegister = strings['TITLE_REGISTER'];

    const situationFail = strings['MESSAGE_REGISTRATION_FAIL'];
    const situationSuccess = strings['MESSAGE_REGISTRATION_SUCCESS'];
    const situationTry = strings['MESSAGE_REGISTRATION_TRY'];

    const setValue = (key) => (event) => {

      const element = event.target;
      const value = element.value;
      this.setState({ [key]: value });

    };

    const setType = (type) => () => {

      this.setState({ type: type });

    };

    const actionSubmit = () => {

      const { email, firstName, lastName, username, password, type } = state;

      const request = {
        [KEY_EMAIL]: email,
        [KEY_FIRST_NAME]: firstName,
        [KEY_LAST_NAME]: lastName,
        [KEY_PASSWORD]: password,
        [KEY_USERNAME]: username,
        [KEY_REGISTRATION_TYPE]: type,
      };

      const registrationFail = () => {

        this.setState({ situation: situationFail });

      };

      const registrationSuccess = () => {

        this.setState({ situation: situationSuccess });

      };

      const registrationTry = () => {

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

    const body = (
      <div className="ViewRegisterMainGate">
        <div className="ViewRegisterMainGate_title">
          <span className="Title_styleA">{ titleRegister }</span>
        </div>
        <div className="Layout_labeledInput">
          <div className="Layout_inputLabel">
            <span>{ labelFirstName }</span>
          </div>
          <div className="Layout_inputField">
            <input type="text" onChange={ setValue('firstName') }/>
          </div>
        </div>
        <div className="Layout_labeledInput">
          <div className="Layout_inputLabel">
            <span>{ labelLastName }</span>
          </div>
          <div className="Layout_inputField">
            <input type="text" onChange={ setValue('lastName') } />
          </div>
        </div>
        <div className="Layout_labeledInput">
          <div className="Layout_inputLabel">
            <span>{ labelUsername }</span>
          </div>
          <div className="Layout_inputField">
            <input type="text" onChange={ setValue('username') } />
          </div>
        </div>
        <div className="Layout_labeledInput">
          <div className="Layout_inputLabel">
            <span>{ labelEmail }</span>
          </div>
          <div className="Layout_inputField">
            <input type="text" onChange={ setValue('email') }/>
          </div>
        </div>
        <div className="Layout_labeledInput">
          <div className="Layout_inputLabel">
            <span>{ labelPassword }</span>
          </div>
          <div className="Layout_inputField">
            <input type="password" onChange={ setValue('password') }/>
          </div>
        </div>
        <div className="Layout_labeledInput">
          <div className="Layout_inputLabel">
            <span>{ labelType }</span>
          </div>
          <div className="Layout_inputField Layout_radioRow">
            <div className="Layout_radioBox">
              <input type="radio" name="type" onChange={ setType('babysitter') } />
              <span className="Layout_radioBoxLabel">{ labelBabysitter }</span>
            </div>
            <div className="Layout_radioBox">
              <input type="radio" name="type" onChange={ setType('parent') } />
              <span className="Layout_radioBoxLabel">{ labelParent }</span>
            </div>
          </div>
        </div>
        <button className="Button_navigation" onClick={ actionSubmit }>{ labelRegister }</button>
        <div class="Layout_alwaysFilled">{ situation }</div>
      </div>
    );

    return (<ShellMainGate body={ body }/>);

  }

}

export default ViewRegister;