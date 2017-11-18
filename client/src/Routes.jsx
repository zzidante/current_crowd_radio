import React , {Component} from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, hashHistory, Link, Switch } from 'react-router-dom';
import App from './App.jsx'
import User from './User.jsx';


class Routes extends Component{
  render(){
    return (
      <Router history={hashHistory}>
        <div>
        <form>
          <input type="email" placeholder="email" onChange={this.handleEmailChange}></input>
          <input type="password" placeholder="password" onChange={this.handlePasswordChange}></input>
          <button type="submit">Submit</button>
        </form>
        {/* <Link to="/Guest/" component={App}>Guest</Link> */}
          <Switch>
            <Route exact path="/"/>
            <Route path="/Playlist" component={App}/>
            <Route path="/User" component={User}/>
          </Switch>
          </div>
    </Router>
    )
  }
}

export default Routes