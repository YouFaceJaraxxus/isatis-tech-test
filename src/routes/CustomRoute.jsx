import React from 'react';
import { useSelector } from 'react-redux';
import { Route } from 'react-router-dom';
import Home from '../components/home/Home';
import Layout from '../components/layout/Layout';
import Login from '../components/login/Login';
import Recipes from '../components/recipes/Recipes';


const CustomRoute = ({ path, exact, component: RouteComponent, isGuarded = true }) => {

  const { isLoggedIn, checkedIsLoggedIn } = useSelector((state) => state.auth);

  const renderComponent = () => {
    if(!checkedIsLoggedIn || !isGuarded) return <Home />
    if(!isLoggedIn && path !== '/home' && path !== '/login'){
      return <Login />
    }else if(isLoggedIn && path === '/login'){
      return <Recipes />
    }else return <RouteComponent />
  }

  return (
    <Route
      path={path}
      exact={exact}
      render={(props) => (
        <Layout>
          {renderComponent()}
        </Layout>
      )}
    />
  );
}

export default CustomRoute;