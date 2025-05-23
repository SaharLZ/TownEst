import React from 'react';
import './Foot.css'; 

const Footer: React.FC = () => {
  return (
    <footer className="new_footer_area bg_color">
      <div className="new_footer_top">
       
          <div className="row">
            <div className="col">
              <div className="f_widget company_widget wow fadeInLeft" data-wow-delay="0.2s" style={{ visibility: 'visible', animationDelay: '0.2s', animationName: 'fadeInLeft' }}>
                <h3 className="f-title f_600 t_color f_size_18">Get in Touch</h3>
                <p>Don’t miss any updates of our new projects and designs.!</p>
                <form action="#" className="f_subscribe_two mailchimp" method="post" noValidate>
                  <input type="text " name="EMAIL" className="mai" placeholder="Email" />
                  <button className="btn btn_get btn_get_two" type="submit">Subscribe</button>
                  <p className="mchimp-errmessage" style={{ display: 'none' }}></p>
                  <p className="mchimp-sucmessage" style={{ display: 'none' }}></p>
                </form>
              </div>
            </div>
            <div className="col">
              <div className="f_widget about-widget pl_70 wow fadeInLeft" data-wow-delay="0.4s" style={{ visibility: 'visible', animationDelay: '0.4s', animationName: 'fadeInLeft' }}>
                <h3 className="f-title f_600 t_color f_size_18">TownEst</h3>
                <ul className="list-unstyled f_list">
                  <li><a href="#">Company</a></li>
                  <li><a href="#">Designs</a></li>
                  <li><a href="#">Projects</a></li>
                  <li><a href="#">Architects</a></li>
                </ul>
              </div>
            </div>
            <div className="col">
              <div className="f_widget about-widget pl_70 wow fadeInLeft" data-wow-delay="0.6s" style={{ visibility: 'visible', animationDelay: '0.6s', animationName: 'fadeInLeft' }}>
                <h3 className="f-title f_600 t_color f_size_18">Help</h3>
                <ul className="list-unstyled f_list">
                  <li><a href="#">FAQ</a></li>
                  <li><a href="#">Term &amp; conditions</a></li>
                  <li><a href="#">Support Policy</a></li>
                  <li><a href="#">Privacy</a></li>
                </ul>
              </div>
            </div>
            <div className="col">
              <div className="f_widget social-widget pl_70 wow fadeInLeft" data-wow-delay="0.8s" style={{ visibility: 'visible', animationDelay: '0.8s', animationName: 'fadeInLeft' }}>
                <h3 className="f-title f_600 t_color f_size_18">Team Solutions</h3>
                <div className="f_social_icon">
                  <a href="#" className="fab fa-facebook"> <img width="94" height="94" src="https://img.icons8.com/3d-fluency/94/facebook-circled.png" alt="facebook-circled"/></a>
                  <a href="#" className="fab fa-linkedin"><img width="94" height="94" src="https://img.icons8.com/3d-fluency/94/instagram-new.png" alt="instagram-new"/></a>
                  <a href="#" className="fab fa-twitter"><img width="94" height="94" src="https://img.icons8.com/3d-fluency/94/linkedin.png" alt="linkedin"/></a>
                  <a href="#" className="fab fa-pinterest"><img width="94" height="94" src="https://img.icons8.com/3d-fluency/94/twitter-logo.png" alt="twitter-logo"/></a>
                </div>
              </div>
            </div>
          </div>
       
        <div className="footer_bg">
          <div className="footer_bg_one"></div>
          <div className="footer_bg_two"></div>
        </div>
      </div>
      <div className="footer_bottom">
        <div className="containerh">
          
            <div >
              <p >© TownEst Inc. 2024 All rights reserved.</p>
            </div>
            <div>
              <p>Made with Sahar Louazi</p>
            </div>
          
        </div>
      </div>
    </footer>
  );
};

export default Footer;
