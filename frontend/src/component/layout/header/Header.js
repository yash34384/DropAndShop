import React from 'react';
import '../header/Header.css';
import logo from '../../../images/logo.png';

function Header() {
  return (
    <>
      <div className="navbar" id="navbar">
        <div className="logo-div">
          <img src={logo} alt="website logo" className="logo" />
          <span className="title">Book Store</span>
        </div>
        <div className="options">
          <a href="/">Home</a>
          <a href="/products">Products</a>
          {/* <a href="/contact">Contact</a> */}
          <a href="/about">About</a>
          <a href="/search">
            <i class="fa-solid fa-magnifying-glass icon"></i>
          </a>
          <a href="/login">
            <i class="fa-solid fa-id-badge icon"></i>
          </a>
        </div>
      </div>
      <a href="#navbar">
        <i class="fa-solid fa-circle-up top"></i>
      </a>
    </>
  );
}

export default Header;
