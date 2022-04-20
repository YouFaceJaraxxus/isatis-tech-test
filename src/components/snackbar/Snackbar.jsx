import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import snackbarClasses from './snackbar.module.scss';
import classNames from 'classnames/bind';
import { closeSnackbar } from '../../redux/reducers/commonSlice';

const SNACKBAR_HIDE_TIMEOUT = 2000;
const Snackbar = () => {
  const cx = classNames.bind(snackbarClasses);
  const dispatch = useDispatch();
  const { snackbarText, snackbarType, showSnackbar } = useSelector((state) => state.common);

  useEffect(() => {
    if (showSnackbar) {
      setTimeout(() => { dispatch(closeSnackbar()) }, SNACKBAR_HIDE_TIMEOUT);
    };
  }, [showSnackbar]);

  return (
    <div className={cx({
      snackbarWrapper: true,
    })}>
      <div>{snackbarText}</div>
      <div>{snackbarType}</div>
    </div>
  )
}

export default Snackbar;