import React from 'react';
import navbarClasses from './navbar.module.scss';
import classNames from 'classnames/bind';
import NavbarLogo from './navbarLogo/NavbarLogo';
import NavbarItem from './navbarItem/NavbarItem';
import { useDispatch, useSelector } from 'react-redux';
import { setNavbarDropdownOpen } from '../../redux/reducers/commonSlice';

const Navbar = () => {
  const cx = classNames.bind(navbarClasses);
  const { navbarDropdownOpen } = useSelector((state) => state.common);
  const dispatch = useDispatch();

  const handleBurgerClick = () => {
    dispatch(setNavbarDropdownOpen(!navbarDropdownOpen));
  }
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

      <div className={cx({
        navbarBurgerWrapper: true,
        navbarBurgerWrapperLighter: navbarDropdownOpen
      })} onClick={handleBurgerClick}>
        <div></div>
        <div></div>
        <div></div>
      </div>

      <div className={cx({
        navbarItemsMobile: true,
        hideDropdown: !navbarDropdownOpen,
      })}>
        <NavbarItem route={'/recipes'} text={'Recipes'} marginTop />
        <NavbarItem route={'/products'} text={'Products'} marginTop />
        <NavbarItem text={'Theme'} marginTop />
        <NavbarItem text={'Logout'} marginTop marginBottom />
      </div>
    </div>
  )
}

export default Navbar;