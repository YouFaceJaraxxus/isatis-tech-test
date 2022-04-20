import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import Default from '../components/default/Default';
import Main from '../components/main/Main';
import Recipes from '../components/recipes/Recipes';
import CustomRoute from './CustomRoute';

const Routes = () => {
  return (
    <Router>
      <Switch>
        <CustomRoute path="/main" exact component={Main}></CustomRoute>
        <CustomRoute path="/recipes" exact component={Recipes}></CustomRoute>
        <CustomRoute path="/" component={Default}></CustomRoute>
      </Switch>
    </Router>
  )
};

export default Routes;