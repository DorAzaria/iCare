import React from 'react';

import AppKeys from '@shared/AppKeys';

const KEY_DESCRIPTION = AppKeys['DESCRIPTION'];
const KEY_ERROR_CODE = AppKeys['ERROR_CODE'];
const KEY_SESSION = AppKeys['SESSION'];
const KEY_NUMBER_PARENT = AppKeys['NUMBER_PARENT'];
const KEY_NUMBER_JOB = AppKeys['NUMBER_JOB'];
const KEY_TIME_A = AppKeys['TIME_A'];
const KEY_TIME_B = AppKeys['TIME_B'];
const KEY_TITLE = AppKeys['TITLE'];

class PartialMessageBox extends React.Component {

  render () {

    const { props } = this;

    const { author, contents } = props;

    let mainClass;

    if (author) {

      mainClass = 'PartialMessageBox_author';

    } else {

      mainClass = 'PartialMessageBox_other';

    }

    mainClass = `PartialMessageBox_main ${ mainClass }`;

    return (
      <div className={ mainClass }>
        <div className="PartialMessageBox_contents">
          <span>{ contents }</span>
        </div>
      </div>
    );

  }

}

export default PartialMessageBox;