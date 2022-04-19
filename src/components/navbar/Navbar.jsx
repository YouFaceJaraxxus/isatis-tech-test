import React from 'react';
import navbarClasses from './navbar.module.scss';
import classNames from 'classnames/bind';
import NavbarLogo from './navbarLogo/NavbarLogo';

const Navbar = () => {
  const cx = classNames.bind(navbarClasses);
  return(
    <div className={cx({
      navbarWrapper: true,
    })}>
      <NavbarLogo />
    </div>
  )
}

export default Navbar;