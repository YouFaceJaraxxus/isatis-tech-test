import classNames from 'classnames';
import React from 'react';
import cDialogClasses from './confirmationDialog.module.scss';

const CANCEL_DEFAULT_TEXT = 'Cancel';
const CONFIRM_DEFAULT_TEXT = 'Yes';
const ConfirmationDialog = ({ isOpen, title, confirmText, cancelText, confirmAction, cancelAction, type }) => {
  const cx = classNames.bind(cDialogClasses);

  return isOpen && (
    <div className={cDialogClasses.confirmationDialogWrapper}>
      <div className={cDialogClasses.title}>{title}</div>
      <div className={cDialogClasses.buttons}>
        <button className={cx({
          button: true,
          confirmButton: true
        })} onClick={confirmAction}>{confirmText || CONFIRM_DEFAULT_TEXT}</button>
        <button className={cx({
          button: true,
          cancelButton: true
        })} onClick={cancelAction}>{cancelText || CANCEL_DEFAULT_TEXT}</button>
      </div>
    </div>
  )
};

export default ConfirmationDialog;