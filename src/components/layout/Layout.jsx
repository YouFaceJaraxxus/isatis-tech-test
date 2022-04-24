import React from 'react';
import { useSelector } from 'react-redux';
import Navbar from '../navbar/Navbar';
import Snackbar from '../snackbar/Snackbar';

const Layout = ({ children }) => {
  const { showSnackbar } = useSelector((state) => state.common);
  return (
    <>
      <Navbar />
      {children}
      {showSnackbar && <Snackbar />}
    </>
  )
};

export default Layout;