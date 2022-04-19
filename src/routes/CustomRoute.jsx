import React from 'react';
import { Route } from 'react-router-dom';
import Layout from '../components/layout/Layout';

const CustomRoute = ({ path, exact, component: RouteComponent }) => {
  return (
    <Route
      path={path}
      exact={exact}
      render={(props) => {
        if (false) {
          return (
            <div>
              Implement a guard please!
            </div>
          );
        }
        else return (
          <Layout>
            <RouteComponent />
          </Layout>
        );
      }}
    />
  );
}

export default CustomRoute;