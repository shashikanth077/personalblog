import React from 'react';
import './Contact.css'
import background from '../../assets/images/overlay-bg.jpg';
import { TiLocationOutline,TiDevicePhone,TiMail } from "react-icons/ti";

const contact = (props) => {

    var sectionStyle = {
        backgroundImage: `url(${background})`
      };

    return  <section className="paralax-mf footer-paralax bg-image sect-mt4 route" style={sectionStyle}>
    <div className="overlay-mf"></div>
    <div className="container">
      <div className="row">
        <div className="col-sm-12">
          <div className="contact-mf">
            <div id="contact" className="box-shadow-full">
              <div className="row">
                <div className="col-md-6">
                  <div className="title-box-2">
                    <h5 className="title-left">
                      Send Message Us
                    </h5>
                  </div>
                  <div>
                    {props.form}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="title-box-2 pt-4 pt-md-0">
                    <h5 className="title-left">
                      Get in Touch
                    </h5>
                  </div>
                  <div className="more-info">
                    <p className="lead">
                        A successful website does three things:
                        It attracts the right kinds of visitors.
                        Guides them to the main services or product you offer.
                        Collect Contact details for future ongoing relation.
                    </p>
                    <ul className="list-ico">
                      <li><span><TiLocationOutline /></span> 2036 Benglore India</li>
                      <li><span><TiDevicePhone /></span> (91) 8123192799</li>
                      <li><span><TiMail /></span> shashikanth033@gmail.com</li>
                    </ul>
                  </div>
                  {/* <div className="socials">
                    <ul>
                      <li><a href=""><span className="ico-circle"><i className="ion-social-facebook"></i></span></a></li>
                      <li><a href=""><span className="ico-circle"><i className="ion-social-instagram"></i></span></a></li>
                      <li><a href=""><span className="ico-circle"><i className="ion-social-twitter"></i></span></a></li>
                      <li><a href=""><span className="ico-circle"><i className="ion-social-pinterest"></i></span></a></li>
                    </ul>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
}

export default contact;
