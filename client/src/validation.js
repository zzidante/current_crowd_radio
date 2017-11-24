import { setState } from "./index";

const style = "danger";
const fillAllForms = {
  userMessage: { message: "Please fill out all forms", style }
};

export default {
  locationSearch(loc) {
    if (!loc) {
      setState({ userMessage: { message: "City cannot be blank.", style } });
      return;
    } else if (/\d+/.test(loc)) {
      setState({
        userMessage: { message: "City must not contain an address", style }
      });
      return;
    } else if (!/,/.test(loc)) {
      setState({
        userMessage: { message: "Must have city and country.", style }
      });
      return;
    } else {
      return true;
    }
  },
  register(username, email, password, confirmPassword, defaultLocation) {
    if (!username || !email || !password || !confirmPassword) {
      setState(fillAllForms);
      return;
    }
    if (password !== confirmPassword) {
      setState({ userMessage: { message: "Passwords must match", style } });
      return;
    }
    if (this.locationSearch(defaultLocation)) {
      return true;
    }
  },
  updateUser(username, email, defaultLocation) {
    if (!username || !email) {
      setState(fillAllForms);
      return;
    }
    if (this.locationSearch(defaultLocation)) {
      return true;
    }
  },
  updatePassword(password, confirmPassword) {
    if (!password || !confirmPassword) {
      setState(fillAllForms);
      return;
    }
    if (password !== confirmPassword) {
      setState({
        userMessage: {
          message: "New password must match Confirm Password",
          style
        }
      });
      return;
    }
    return true;
  }
};
