import React , {Component} from 'react';
import { BrowserRouter as Router, Route, hashHistory, Link, Switch, withRouter } from 'react-router-dom';
import App from './App.jsx'
import Profile from './User/Profile.jsx';


class Routes extends Component{
  

  render(){
    return (
      <Router history={hashHistory}>
        <div>
          <Switch>
            <Route path="/" component={App}/>
            <Route path="/User" component={Profile}/>
          </Switch>
          </div>
    </Router>
    )
  }
}

export default Routes