import React from 'react';
import classNames from 'classnames/bind';
import classes from './navbarItem.module.scss';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { setLoggedIn } from '../../../redux/reducers/authSlice';
import { useDispatch } from 'react-redux';

const NavbarItem = ({
  route,
  text,
  marginLeft = false,
  marginRight = false,
  marginTop = false,
  marginBottom = false,
}) => {
  const cx = classNames.bind(classes);
  const history = useHistory();

  const dispatch = useDispatch();

  const handleClick = () => {
    console.log(text);
    if (text === 'Logout'){
      dispatch(setLoggedIn(false));
      history.push('/');
    }
    else if (route) {
      history.push(route);
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