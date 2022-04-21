import React from 'react';
import { Link } from 'react-router-dom';
import homeClasses from './home.module.scss';

const Home = () => {
  return(
    <div className={homeClasses.homeWrapper}>
      <p className={homeClasses.homeTitle}>
        Welcome to our bakery!
      </p>
      <p className={homeClasses.homeSubtitle}>
        Check out our products! Enjoy!
      </p>
    </div>
  )
}

export default Home;