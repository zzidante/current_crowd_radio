import { setState } from './index'

export default {
  locationSearch(loc) {
    if ( !loc ){
      setState({warning: "City cannot be blank."})
      return
    } else if (/\d+/.test(loc))  {
      setState({warning: "City must not contain an address"})
      return
    } else if ( !/,/.test(loc)) {
      setState({warning: "Must have city and country."})
      return
    } else {
      return true
    }
  },
  register(username, email, password, confirmPassword, defaultLocation) {
    if (!username || !email || !password || !confirmPassword) {
      setState({ warning: "Please fill out all forms" });
      return;
    }
    if (password !== confirmPassword) {
      setState({ warning: "Passwords must match" });
      return ;
    } 
    if(this.locationSearch(defaultLocation)) {
      return true
    }
  },
  updateUser(username, email, defaultLocation) {
    if (!username || !email) {
      setState({ warning: "Please fill out all forms" });
      return;
    }
    if(this.locationSearch(defaultLocation)) {
      return true
    }
  },
  updatePassword(password, confirmPassword) {
    if (!password || !confirmPassword) {
      setState({ warning: "Please fill out all forms" });
      return;
    }
    if (password !== confirmPassword) {
      setState({ warning: "New password must match Confirm Password" });
      return;
    }
    return true
  }
}
