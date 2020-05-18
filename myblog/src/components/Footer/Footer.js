import React from 'react';
import './Footer.css';

const Footer = (props) => {

    return <footer>
    <div className="container">
      <div className="row">
        <div className="col-sm-12">
          <div className="copyright-box">
            <p className="copyright">&copy; Copyright <strong>Shashikanth H R</strong>. All Rights Reserved</p>
            <div className="credits">
              Designed by <a href="#">Shashikanth H R</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>

}

export default Footer;