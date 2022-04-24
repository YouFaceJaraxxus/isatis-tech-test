import React from 'react';
import navbarClasses from './navbar.module.scss';
import classNames from 'classnames/bind';
import NavbarLogo from './navbarLogo/NavbarLogo';
import NavbarItem from './navbarItem/NavbarItem';
import { useDispatch, useSelector } from 'react-redux';
import { setNavbarDropdownOpen, setTheme } from '../../redux/reducers/commonSlice';
import NavbarDropdown from './navbarDropdown/NavbarDropdown';
import { LIGHT_THEME, DARK_THEME } from '../../common/config/config';
import { setLoggedIn } from '../../redux/reducers/authSlice';

const Navbar = () => {
  const cx = classNames.bind(navbarClasses);
  const { navbarDropdownOpen, theme } = useSelector((state) => state.common);
  const { isLoggedIn } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleBurgerClick = () => {
    dispatch(setNavbarDropdownOpen(!navbarDropdownOpen));
  }

  const logout = () => {
    dispatch(setLoggedIn(false));
  }

  const navbarDropdownOptions = [
    {
      id: 1,
      action: () => {
        dispatch(setTheme(LIGHT_THEME));
      },
      text: 'Light',
      closeDropdown: true,
    },
    {
      id: 2,
      action: () => {
        dispatch(setTheme(DARK_THEME));
      },
      text: 'Dark',
      closeDropdown: true,
    }
  ]

  return (
    <div className={cx({
      navbarWrapper: true,
      navbarPrimary: theme === DARK_THEME,
      navbarPrimaryLight: theme === LIGHT_THEME
    })}>
      <NavbarLogo />
      <div className={navbarClasses.navbarItems}>
        <div className={navbarClasses.navbarLeft}>
          {isLoggedIn && <NavbarItem route={'/recipes'} text={'Recipes'} marginLeft />}
          {isLoggedIn && <NavbarItem route={'/products'} text={'Products'} marginLeft />}
        </div>
        <div className={navbarClasses.navbarRight}>
          <NavbarDropdown text={'Theme'} marginRight options={navbarDropdownOptions} />
          {isLoggedIn && <NavbarItem text={'Logout'} marginRight route={'/login'} additionalAction={logout} />}
          {!isLoggedIn && <NavbarItem text={'Login'} marginRight route={'/login'} />}
        </div>
      </div>

      <div className={cx({
        navbarBurgerWrapper: true,
        navbarBurgerWrapperDark: theme === DARK_THEME,
        navbarBurgerWrapperLighter: theme === LIGHT_THEME
      })} onClick={handleBurgerClick}>
        <div></div>
        <div></div>
        <div></div>
      </div>

      <div className={cx({
        navbarItemsMobile: true,
        hideDropdown: !navbarDropdownOpen,
      })}>
        {isLoggedIn && <NavbarItem route={'/recipes'} text={'Recipes'} marginTop />}
        {isLoggedIn && <NavbarItem route={'/products'} text={'Products'} marginTop />}
        <NavbarDropdown text={'Theme'} marginTop options={navbarDropdownOptions} />
        {isLoggedIn && <NavbarItem text={'Logout'} marginTop marginBottom route={'/login'} additionalAction={logout} />}
        {!isLoggedIn && <NavbarItem text={'Login'} marginTop marginBottom route={'/login'} />}
      </div>
    </div>
  )
}

export default Navbar;