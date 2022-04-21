import React from 'react';
import navbarClasses from './navbar.module.scss';
import classNames from 'classnames/bind';
import NavbarLogo from './navbarLogo/NavbarLogo';
import NavbarItem from './navbarItem/NavbarItem';

const Navbar = () => {
  const cx = classNames.bind(navbarClasses);
  return (
    <div className={cx({
      navbarWrapper: true,
    })}>
      <NavbarLogo />
      <div className={navbarClasses.navbarItems}>
        <div className={navbarClasses.navbarLeft}>
          <NavbarItem route={'/recipes'} text={'Recipes'} marginLeft />
          <NavbarItem route={'/products'} text={'Products'} marginLeft />
        </div>
        <div className={navbarClasses.navbarRight}>
          <NavbarItem text={'Theme'} marginRight />
          <NavbarItem text={'Logout'} marginRight />
        </div>
      </div>
    </div>
  )
}

export default Navbar;