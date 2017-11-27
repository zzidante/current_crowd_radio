import React , {Component} from 'react';

class Footer extends Component {
  render() {
    return (
      <footer className="main-footer">
        <ul>
          <li>
            <a href="https://github.com/bgk-" target="_blank" rel="noreferrer noopener"><i className="fa fa-github-square"></i>
            <span className="dev-name"> Blake</span></a>       
          </li>
          <li>
            <a href="https://github.com/curtisbateson" target="_blank" rel="noreferrer noopener"><i className="fa fa-github-square"></i>
            <span className="dev-name"> Curtis</span></a>
          </li>
          <li>
            <a href="https://github.com/zzidante" target="_blank" rel="noreferrer noopener"><i className="fa fa-github-square"></i>
            <span className="dev-name"> Mel</span></a>
          </li>
        </ul>
      </footer>
    )
  }
}
  
export default Footer;