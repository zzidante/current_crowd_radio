import React , {Component} from 'react';

class Footer extends Component {
  render() {
    return (
      <footer class="main-footer .navbar-fixed-bottom">
        <ul>
          <li><a href="#"><p className="dev-name">Blake</p></a></li>        
          <li><a href="#"><i className="fa fa-github-square"></i></a></li>
          <li><a href="#"><p className="dev-name">Curtis</p></a></li>
          <li><a href="#"><i className="fa fa-github-square"></i></a></li>
          <li><a href="#"><p className="dev-name">Mel</p></a></li>
          <li><a href="#"><i className="fa fa-github-square"></i></a></li>
        </ul>
      </footer>
    )
  }
}
  
export default Footer;