import React from 'react';
import './About.css';
import MetaData from '../layout/MetaData';

const About = () => {
  return (
    <div className="about-me">
      <MetaData title={'About Developer'} />
      <div>DropAndShop Book Store</div>
      <p>
        DropAndShop online Book Store help GJU students to puchase second-hand
        affordable books and you can also help others by upload books so student
        can purchase it.
      </p>
      <p>
        This Project is develope by Yash Gupta. Student of B.Tech ( I.T. ) in
        Guru Jambheshwar University, Hisar.
      </p>
      <div>Email - yash.gupta.8642@gmail.com</div>
      <a
        rel="noreferrer"
        href="https://www.linkedin.com/in/yash-gupta-417206193"
        target="_blank"
      >
        Linked in
      </a>
      <a
        rel="noreferrer"
        href="https://yash-personal-portfolio.netlify.app/"
        target="_blank"
      >
        Personal portfolio
      </a>
    </div>
  );
};

export default About;
