import React from 'react';
import { ERROR, SUCCESS } from '../../common/config/config';
import cDialogClasses from './confirmationDialog.module.scss';
import classNames from 'classnames/bind';

const CANCEL_DEFAULT_TEXT = 'Cancel';
const CONFIRM_DEFAULT_TEXT = 'Yes';
const ConfirmationDialog = ({ isOpen, title, confirmText, cancelText, confirmAction, cancelAction, type }) => {
  const cx = classNames.bind(cDialogClasses);

  return isOpen && (
    <div className={cx({
      confirmationDialogWrapper: true,
      confirmationDialogGreen: type === SUCCESS,
      confirmationDialogRed: type === ERROR
    })}>
      <div className={cDialogClasses.title}>{title}</div>
      <div className={cDialogClasses.buttons}>
        <div className={cx({
          confirmationButton: true,
          confirmButton: true,
          confirmButtonGreen: type === SUCCESS,
          confirmButtonRed: type === ERROR,
        })} onClick={confirmAction}>{confirmText || CONFIRM_DEFAULT_TEXT}</div>
        <div className={cx({
          confirmationButton: true,
          cancelButton: true
        })} onClick={cancelAction}>{cancelText || CANCEL_DEFAULT_TEXT}</div>
      </div>
    </div>
  )
};

export default ConfirmationDialog;