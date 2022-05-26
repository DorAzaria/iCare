import React from 'react';

import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';

import AppContext, { defaultContext } from '@contexts/App';

import ViewIndex from '@components/Views/Index';
import ViewLogIn from '@components/Views/LogIn';
import ViewJobs from '@components/Views/Jobs';
import ViewRegister from '@components/Views/Register';
import ViewApply from '@components/Views/Apply';
import ViewRequests from '@components/Views/Requests';

import './index.css';

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = { ...defaultContext };
    this.state.app = this;

  }

  render () {

    const appContext = this.state;

    const viewIndex = <ViewIndex/>;
    const viewLogIn = <ViewLogIn/>;
    const viewJobs = <ViewJobs/>;
    const viewRegister = <ViewRegister/>;
    const viewApply = <ViewApply/>;
    const viewRequests = <ViewRequests/>;

    return (
      <AppContext.Provider value={ appContext }>
        <div className="App">
          <div className="App_layerBase">
            <BrowserRouter>
              <Routes>
                <Route path="/" element={ viewIndex }/>
                <Route path="/register" element={ viewRegister }/>
                <Route path="/log-in" element={ viewLogIn }/>
                <Route path="/jobs" element={ viewJobs }/>
                <Route path="/apply" element={ viewApply }/>
                <Route path="/requests" element={ viewRequests }/>
              </Routes>
            </BrowserRouter>
          </div>
          { /* <div className="App_layerPopup"></div> */ }
        </div>
      </AppContext.Provider>
    );

  }

}

export default App;
