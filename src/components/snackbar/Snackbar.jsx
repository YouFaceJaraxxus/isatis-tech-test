import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import snackbarClasses from './snackbar.module.scss';
import classNames from 'classnames/bind';
import { closeSnackbar } from '../../redux/reducers/commonSlice';
import { ERROR, SUCCESS } from '../../common/config/config';

const SNACKBAR_HIDE_TIMEOUT = 4000;
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
      snackbarError: snackbarType === ERROR,
      snackbarSuccess: snackbarType === SUCCESS
    })}>
      <div className={snackbarClasses.text}>{snackbarText}</div>
      <div className={snackbarClasses.closeIcon} onClick={() => { dispatch(closeSnackbar()); }}>&#x2716;</div>
    </div>
  )
}

export default Snackbar;