import React, { Component } from 'react';
import api from '../api';
import validation from '../validation'
import { setState, getState } from '../index';
import PlacesAutocomplete from 'react-places-autocomplete';

class Profile extends Component {
  constructor(props) {
    super(props)
    api.getUser().then( user => {
      console.log(user)
      setState( {email: user.email, defaultLocation: user.default_location})
    })
    this.myStyles = {
      input: {
        display: "block",
        width: "100%",
        height: "34px",
        padding: "6px 12px",
        fontSize: "14px",
        lineHeight: "1.42857143",
        color: "#555",
        backgroundColor: "#fff",
        backgroundImage: "none",
        border: "1px solid #ccc",
        borderRadius: "4px"
      }
    };
    this.inputProps = {
      value: getState().defaultLocation,
      onChange: this.onChange,
      placeholder: "City",
      id: "register-location"
    };
  }

  handleUsernameChange = event =>
    setState({ username: event.target.value });

  handleNewPasswordChange = event =>
    setState({ newPassword: event.target.value });

  handleOldPasswordChange = event =>
    setState({ oldPassword: event.target.value });

  handleConfirmPasswordChange = event =>
    setState({ confirmPassword: event.target.value });

  handleEmailChange = event => 
    setState({ email: event.target.value });

  onChange = locationBar => 
    setState({ locationBar });

  updateUser = event => {
    event.preventDefault();
    const { username, email, locationBar } = getState();
    if (validation.updateUser(username, email, locationBar)) {
      api.updateUser(username, email, locationBar)
    }
  }

  updatePassword = event => {
    event.preventDefault();
    const { oldPassword, newPassword, confirmPassword } = getState();
    if (validation.updatePassword(oldPassword, newPassword, confirmPassword)) {
      api.updateUser(oldPassword, newPassword)
    }
  }

  render() {
  return (
  <section className="row">
  <div className="col-xs-2 col-sm-4 col-xl-5">
    Left
  </div>
  <section className="col-xs-8 col-sm-4 col-xl-2 form-row">

    <section>
      <form id="edit-account-form" onSubmit={this.updateUser}>
        <h3>Edit Your Account</h3>
        <div className="col-auto">
          <label className="username"></label>
          <input type="text" className="form-control" onChange={this.handleUsernameChange} value={getState().username} />
        </div>
  
        <div className="col-auto">
          <label className="email"></label>            
          <input type="text" className="form-control"onChange={this.handleEmailChange}  value={getState().email}  />
        </div>

        <div className="col-auto">
          <label className="default-location"></label>            
          <PlacesAutocomplete inputProps={this.inputProps} onChange={this.onChange} styles={this.myStyles} />
        </div>
  
        <div className="col-auto">
          <button type="submit" className="btn btn-primary">Update</button>
        </div>
      </form>
    </section>


    <section>
      <form id="change-password-form" onSubmit={this.updatePassword}>
        <h3>Change Your Password</h3>
        <div className="col-4">
          <label className="old-password"></label>
          <input type="text" className="form-control" placeholder="Old Password" onChange={this.handleOldPasswordChange} value={getState().oldPassword}  />
        </div>

        <div className="col">
          <label className="new-password"></label>            
          <input type="text" className="form-control" placeholder="New Password"onChange={this.handleNewPasswordChange}value={getState().newPassword}  />
        </div>

        <div className="col">
          <label className="confirm-new-password"></label>            
          <input type="text" className="form-control" placeholder="Confirm New Password"onChange={this.handleEmailChange}value={getState().confirmPassword}  />
        </div>

        <div className="col-auto">
          <button type="submit" className="btn btn-primary">Update</button>
        </div>
      </form>
    </section>    
  </section>

  <div className="col-xs-2 col-sm-3 col-xl-5">
    Right
  </div >
</section>)}
}

export default Profile