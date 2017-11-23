import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  browserHistory,
  Switch,
} from "react-router-dom";
import App from "./App.jsx";
import Profile from "./User/Profile.jsx";
import NotFound from "./NotFound.jsx";
class Routes extends Component {
  render() {
    return (
      <div>
        <Router history={browserHistory}>
          <Switch>
            <Route exact path="/"component={App} />
            <Route path="/Profile" component={Profile} />
            <Route path="/*" component={NotFound} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default Routes;
