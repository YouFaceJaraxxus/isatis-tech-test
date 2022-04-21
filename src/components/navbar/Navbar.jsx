import React from 'react';
import navbarClasses from './navbar.module.scss';
import classNames from 'classnames/bind';
import NavbarLogo from './navbarLogo/NavbarLogo';
import NavbarItem from './navbarItem/NavbarItem';
import { useDispatch, useSelector } from 'react-redux';
import { setNavbarDropdownOpen, setTheme } from '../../redux/reducers/commonSlice';
import NavbarDropdown from './navbarDropdown/NavbarDropdown';
import { LIGHT_THEME, DARK_THEME } from '../../common/config/config';

const Navbar = () => {
  const cx = classNames.bind(navbarClasses);
  const { navbarDropdownOpen } = useSelector((state) => state.common);
  const dispatch = useDispatch();

  const handleBurgerClick = () => {
    dispatch(setNavbarDropdownOpen(!navbarDropdownOpen));
  }

  const navbarDropdownOptions = [
    {
      id:1,
      action: () => {
        dispatch(setTheme(LIGHT_THEME));
      },
      text: 'Light',
    },
    {
      id:2,
      action: () => {
        dispatch(setTheme(DARK_THEME));
      },
      text: 'Dark',
    }
  ]

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
          <NavbarDropdown text={'Theme'} marginRight options={navbarDropdownOptions}/>
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
        <NavbarDropdown text={'Theme'} marginTop options={navbarDropdownOptions}/>
        <NavbarItem text={'Logout'} marginTop marginBottom />
      </div>
    </div>
  )
}

export default Navbar;