import React from 'react';
import classNames from 'classnames/bind';
import classes from './navbarItem.module.scss';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const NavbarItem = ({ route, text }) => {
  const cx = classNames.bind(classes);
  const history = useHistory();

  const navigate = () => {
    history.push(route)
  }

  return (
    <div className={classes.navbarItemWrapper} onClick={navigate}>
      <div>{text}</div>
    </div>
  )
};

export default NavbarItem;