import React from 'react';
import { useSelector } from 'react-redux';
import { Route } from 'react-router-dom';
import Home from '../components/home/Home';
import Layout from '../components/layout/Layout';


const CustomRoute = ({ path, exact, component: RouteComponent }) => {

  const { isLoggedIn } = useSelector((state) => state.auth);
  return (
    <Route
      path={path}
      exact={exact}
      render={(props) => {
        if (!isLoggedIn && path !== '/' && path !== '/login') {
          return (
            <Layout>
              <Home />
            </Layout>
          );
        } else if (isLoggedIn && path === '/login') {
          return (
            <Layout>
              <Home />
            </Layout>
          );
        } else return (
          <Layout>
            <RouteComponent />
          </Layout>
        );
      }}
    />
  );
}

export default CustomRoute;