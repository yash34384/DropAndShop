import React from 'react';
import '../footer/Footer.css';
import logo from '../../../images/logo.png';

const linkToGmail = `https://accounts.google.com/signin/v2/identifier?service=mail&passive=true&rm=false&continue=https%3A%2F%2Fmail.google.com%2Fmail%2F%3Fhl%3Den%2F&ss=1&scc=1&ltmpl=default&ltmplcache=2&hl=en%2F&emr=1&osid=1&flowName=GlifWebSignIn&flowEntry=ServiceLogin`;

function Footer() {
  return (
    <>
      <div className="footer">
        <div className="upper">
          <div className="company">
            <div className="company-logo">
              <img src={logo} alt="logo" />
              <span className="name">Book Store</span>
            </div>
            <div className="descrip">
              DropAndShop is a highly creative, modern, visually stunning website
              that allows GJU students to buy and sell books over the internet.
              Through an e-commerce website.
              <br />
              It is based on MERN Technology.
            </div>
          </div>
          <div className="info">
            <div>
              <i class="fa-solid fa-map-location-dot"></i>
              <span>
                Guru Jambheshwar University of Science and Technology,
                Hisar-125001
              </span>
            </div>
            <div>
              <i class="fa-solid fa-envelope"></i>
              <span>DropAndShop@gmail.com</span>
            </div>
          </div>
          <div className="connect">
            <p>Quick links</p>
            <a href="/">Home</a>
            <a href="/products">Products</a>
            {/* <a href="/contact">Contact</a> */}
            <a href="/about">About</a>
          </div>
          <div className="bugs">
            <div className="box">
              <div>
                In case of bug reporting. Mail us at DropAndShop@gmail.com
              </div>
              <a rel="noreferrer" href={linkToGmail} target="_blank">
                Report Us
              </a>
            </div>
          </div>
        </div>
        <div className="lower">
          <div>&copy; 2022 All Rights Reserved by DropAndShop.</div>
          <div className="tags">
            <a
              rel="noreferrer"
              href="https://www.linkedin.com/in/yash-gupta-417206193"
              target="_blank"
            >
              <i class="fa-brands fa-linkedin"></i>
              <span>Yash Gupta</span>
            </a>
            <div>
              <i class="fa-solid fa-envelope"></i>
              <span>yash34384@gmail.com</span>
            </div>
            <a
              rel="noreferrer"
              href="https://twitter.com/yash_gupta_84?s=08"
              target="_blank"
            >
              <i class="fa-brands fa-twitter-square"></i>
              <span>@yash_gupta_84</span>
            </a>
            <a
              rel="noreferrer"
              href="https://yash-personal-portfolio.netlify.app/"
              target="_blank"
            >
              <i class="fa-solid fa-window-maximize"></i>
              <span>Personal website</span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
