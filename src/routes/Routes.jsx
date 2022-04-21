import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import Default from '../components/default/Default';
import Home from '../components/home/Home';
import Products from '../components/products/Products';
import Recipes from '../components/recipes/Recipes';
import CustomRoute from './CustomRoute';

const Routes = () => {
  return (
    <Router>
      <Switch>
        <CustomRoute path="/recipes" exact component={Recipes}></CustomRoute>
        <CustomRoute path="/products" exact component={Products}></CustomRoute>
        <CustomRoute path="/home" exact component={Home}></CustomRoute>
        <CustomRoute path="/" component={Default}></CustomRoute>
      </Switch>
    </Router>
  )
};

export default Routes;