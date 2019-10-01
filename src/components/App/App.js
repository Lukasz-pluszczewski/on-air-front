import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import './App.scss';

import config from '../../config';
import { SocketIoProvider } from '../../hooks/useSocketIo';
import LocalStatus from '../LocalStatus/LocalStatus';
import GlobalStatus from "../GlobalStatus/GlobalStatus";

const App = () => {
  return (
    <SocketIoProvider url={config.apiUrl}>
      <Router>
        <div className="App__container container">
          <Switch>
            <Route path="/global">
              <GlobalStatus/>
            </Route>
            <Route path="*">
              <LocalStatus/>
            </Route>
          </Switch>
        </div>
      </Router>
    </SocketIoProvider>
  );
};

export default App;
