import React from 'react';
import classNames from 'classnames/bind';
import classes from './navbarItem.module.scss';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const NavbarItem = ({
  route,
  text,
  marginLeft = false,
  marginRight = false,
  marginTop = false,
  marginBottom = false,
  additionalAction,
}) => {
  const cx = classNames.bind(classes);
  const history = useHistory();

  const handleClick = () => {
    if (route) {
      history.push(route);
    }
    if (additionalAction) {
      additionalAction();
    }
  }

  return (
    <div className={cx({
      navbarItemWrapper: true,
      marginLeft: marginLeft,
      marginRight: marginRight,
      marginTop: marginTop,
      marginBottom: marginBottom
    })} onClick={handleClick}>
      <div>{text}</div>
    </div>
  )
};

export default NavbarItem;