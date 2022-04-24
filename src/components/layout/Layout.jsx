import classNames from 'classnames/bind';
import React from 'react';
import { useSelector } from 'react-redux';
import { DARK_THEME, LIGHT_THEME } from '../../common/config/config';
import Navbar from '../navbar/Navbar';
import Snackbar from '../snackbar/Snackbar';
import layoutClasses from './layout.module.scss';

const Layout = ({ children }) => {
  const { showSnackbar, theme } = useSelector((state) => state.common);
  const cx = classNames.bind(layoutClasses);
  return (
    <div className={cx({
      layoutWrapper: true,
      layoutWrapperSecondary: theme === DARK_THEME,
      layoutWrapperSecondaryLighter: theme === LIGHT_THEME,
    })}>
      <Navbar />
      <div className={cx({
        bodyWrapperSecondary: theme === DARK_THEME,
        bodyWrapperSecondaryLighter: theme === LIGHT_THEME,
      })}>
        {children}
      </div>
      {showSnackbar && <Snackbar />}
    </div>
  )
};

export default Layout;