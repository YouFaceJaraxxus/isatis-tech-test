import React from 'react';
import classNames from 'classnames/bind';
import classes from './navbarItem.module.scss';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const NavbarItem = ({ route, text, marginLeft = false, marginRight = false }) => {
  const cx = classNames.bind(classes);
  const history = useHistory();

  const handleClick = () => {
    if(route){
      history.push(route);
    }
  }

  return (
    <div className={cx({
      navbarItemWrapper: true,
      marginLeft: marginLeft,
      marginRight: marginRight
    })} onClick={handleClick}>
      <div>{text}</div>
    </div>
  )
};

export default NavbarItem;