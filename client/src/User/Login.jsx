import React , {Component} from 'react';
import axios from 'axios';

class Login extends Component{
handleUsernameChange = (event) => {
  window.setState({username: event.target.value})
}
handlePasswordChange = (event) => {
  window.setState({password: event.target.value})
}

login = (event) => {
  event.preventDefault()
  axios.put('http://localhost:8081/users', {
    username: window.getState().username,
    password: window.getState().password
  }).then( res => {
    console.log(res.data);
    const {userId} = res.data
    console.log(userId);
    if (userId){
      window.setState({userId, password: ''})
    }
  })
}

render(){
  return (
        <div>
          <form onSubmit={this.login}>
            <input type="email" placeholder="email" value={window.getState().username} onChange={this.handleUsernameChange}></input>
            <input type="password" placeholder="password" value={window.getState().password}onChange={this.handlePasswordChange}></input>
            <button type="submit" to='/Playlist/'>Submit</button>
          </form>
        </div>
    )
  }
}

export default Login