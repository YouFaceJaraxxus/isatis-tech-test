import React from 'react';
import navbarClasses from './navbar.module.scss';
import classNames from 'classnames/bind';
import NavbarLogo from './navbarLogo/NavbarLogo';
import NavbarItem from './navbarItem/NavbarItem';

const Navbar = () => {
  const cx = classNames.bind(navbarClasses);
  return(
    <div className={cx({
      navbarWrapper: true,
    })}>
      <NavbarLogo />
      <NavbarItem route={'/recipes'} text={'Recipes'} />
      <NavbarItem route={'/products'} text={'Products'} />
    </div>
  )
}

export default Navbar;