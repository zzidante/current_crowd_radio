export default {
  locationSearch(loc) {
    if ( !loc ){
      window.setState({warning: "City cannot be blank."})
      return
    } else if (/\d+/.test(loc))  {
      window.setState({warning: "City must not contain an address"})
      return
    } else if ( !/,/.test(loc)) {
      window.setState({warning: "Must have city and country."})
      return
    } else {
      return true
    }
  },
  register(username, email, password, confirmPassword, defaultLocation) {
    if (!username || !email || !password || !confirmPassword) {
      window.setState({ warning: "Please fill out all forms" });
      return;
    }
    if (password !== confirmPassword) {
      window.setState({ warning: "Passwords must match" });
      return ;
    } 
    if(this.locationSearch(defaultLocation)) {
      return true
    }
  },
  updateUser(username, email, defaultLocation) {
    console.log("VALID -- ", defaultLocation);
    if (!username || !email) {
      window.setState({ warning: "Please fill out all forms" });
      return;
    }
    if(this.locationSearch(defaultLocation)) {
      return true
    }
  },
  updatePassword(password, confirmPassword) {
    if (!password || !confirmPassword) {
      window.setState({ warning: "Please fill out all forms" });
      return;
    }
    if (password !== confirmPassword) {
      window.setState({ warning: "New password must match Confirm Password" });
      return;
    }
    return true
  }
}
