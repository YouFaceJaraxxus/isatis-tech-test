import React from 'react';
import classNames from 'classnames/bind';
import classes from './navbarLogo.module.scss';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const NavbarLogo = () => {
  const cx = classNames.bind(classes);
  const history = useHistory();

  const navigateToHome = () => {
    history.push('/')
  }

  return (
    <div className={classes.navbarLogoWrapper} onClick={navigateToHome}>
      <img className={classes.navbarImage} src='./logo192.png' alt='logo' />
    </div>
  )
};

export default NavbarLogo;