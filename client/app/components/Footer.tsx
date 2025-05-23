import React from 'react';
import './Footer.css'
const Footer = () => {
  return (
    <footer className="footer">
       <video
        className="footer_video"
        muted
        loop
        autoPlay
        src="//cdn.shopify.com/s/files/1/0526/6905/5172/t/5/assets/footer.mp4?v=29581141968431347981633714450"
      >
        <source
          src="//cdn.shopify.com/s/files/1/0526/6905/5172/t/5/assets/footer.mp4?v=29581141968431347981633714450"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>

      <div className="container">
        <div className="footer_inner">
          <div className="c-footer">
            <div className="layout">
              <div className="layout_item w-50">
                <div className="newsletter">
                  <h3 className="newsletter_title">
                    Get updates on fun stuff you probably want to know about in your inbox.
                  </h3>
                  <form action="">
                    <input type="text" placeholder="Email Address" />
                    <button>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                        <path fill="none" d="M0 0h24v24H0z" />
                        <path d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z" />
                      </svg>
                    </button>
                  </form>
                </div>
              </div>

              <div className="layout_item w-25">
                <nav className="c-nav-tool">
                  <h4 className="c-nav-tool_title">Menu</h4>
                  <ul className="c-nav-tool_list">
                    <li>
                      <a href="/collections/all" className="c-link">Shop All</a>
                    </li>
                    <li>
                      <a href="/pages/about-us" className="c-link">About Us</a>
                    </li>
                    <li>
                      <a href="/blogs/community" className="c-link">Community</a>
                    </li>
                    <li>
                      <a href="#" className="c-link">Vibes</a>
                    </li>
                  </ul>
                </nav>
              </div>

              <div className="layout_item w-25">
                <nav className="c-nav-tool">
                  <h4 className="c-nav-tool_title">Support</h4>
                  <ul className="c-nav-tool_list">
                    <li className="c-nav-tool_item">
                      <a href="/pages/shipping-returns" className="c-link">Shipping &amp; Returns</a>
                    </li>
                    <li className="c-nav-tool_item">
                      <a href="/pages/help" className="c-link">Help &amp; FAQ</a>
                    </li>
                    <li className="c-nav-tool_item">
                      <a href="/pages/terms-conditions" className="c-link">Terms &amp; Conditions</a>
                    </li>
                    <li className="c-nav-tool_item">
                      <a href="/pages/privacy-policy" className="c-link">Privacy Policy</a>
                    </li>
                    <li className="c-nav-tool_item">
                      <a href="/pages/contact" className="c-link">Contact</a>
                    </li>
                    <li className="c-nav-tool_item">
                      <a href="/account/login" className="c-link">Login</a>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>

            <div className="layout c-2">
              <div className="layout_item w-50">
                <ul className="flex">
                  <li>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32">
                      <path fill="none" d="M0 0h24v24H0z" />
                      <path d="M12 6.654a6.786 6.786 0 0 1 2.596 5.344A6.786 6.786 0 0 1 12 17.34a6.786 6.786 0 0 1-2.596-5.343A6.786 6.786 0 0 1 12 6.654zm-.87-.582A7.783 7.783 0 0 0 8.4 12a7.783 7.783 0 0 0 2.728 5.926 6.798 6.798 0 1 1 .003-11.854zm1.742 11.854A7.783 7.783 0 0 0 15.6 12a7.783 7.783 0 0 0-2.73-5.928 6.798 6.798 0 1 1 .003 11.854z" />
                    </svg>
                  </li>
                  <li>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32">
                      <path fill="none" d="M0 0h24v24H0z" />
                      <path d="M1 4h22v2H1V4zm0 14h22v2H1v-2zm18.622-3.086l-.174-.87h-1.949l-.31.863-1.562.003c1.005-2.406 1.75-4.19 2.236-5.348.127-.303.353-.457.685-.455.254.002.669.002 1.245 0L21 14.912l-1.378.003zm-1.684-2.062h1.256l-.47-2.18-.786 2.18zM7.872 9.106l1.57.002-2.427 5.806-1.59-.001c-.537-2.07-.932-3.606-1.184-4.605-.077-.307-.23-.521-.526-.622-.263-.09-.701-.23-1.315-.419v-.16h2.509c.434 0 .687.21.769.64l.62 3.289 1.574-3.93zm3.727.002l-1.24 5.805-1.495-.002 1.24-5.805 1.495.002zM14.631 9c.446 0 1.01.138 1.334.267l-.262 1.204c-.293-.118-.775-.277-1.18-.27-.59.009-.954.256-.954.493 0 .384.632.578 1.284.999.743.48.84.91.831 1.378-.01.971-.831 1.929-2.564 1.929-.791-.012-1.076-.078-1.72-.306l.272-1.256c.656.274.935.361 1.495.361.515 0 .956-.207.96-.568.002-.257-.155-.384-.732-.702-.577-.317-1.385-.756-1.375-1.64C12.033 9.759 13.107 9 14.63 9z" />
                    </svg>
                  </li>
                  <li>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32">
                      <path fill="none" d="M0 0h24v24H0z" />
                      <path d="M15 17a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15zM2 2h4v20H2V2z" />
                    </svg>
                  </li>
                  <li>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32">
                      <path fill="none" d="M0 0h24v24H0z" />
                      <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1-6v2h2v-2h1a2.5 2.5 0 0 0 2-4 2.5 2.5 0 0 0-2-4h-1V6h-2v2H8v8h3zm-1-3h4a.5.5 0 1 1 0 1h-4v-1zm0-3h4a.5.5 0 1 1 0 1h-4V10z" />
                    </svg>
                  </li>
                </ul>
              </div>
            </div>

            <div className="layout c-2">
              <div className="layout_item w-100">
                <p className="footer_copyright">Copyright &copy; 2024 | All Rights Reserved.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
