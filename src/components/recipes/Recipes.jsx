import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { get } from '../../services/common/baseService';
import { setFetchingRecipes } from '../../redux/reducers/recipesSlice';

const Recipes = () => {
  const { recipes, fetchingRecipes } = useSelector((state) => state.recipes);

  useEffect(() => {
    get('users').then((response) => console.log('response.data', response.data));
  }, [])
  const dispatch = useDispatch();
  const toggleFetchingRecipes = () => {
    dispatch(setFetchingRecipes(!fetchingRecipes));
  }
  return (
    <div>
      Hi I'm Recipes!;
      <Link to='/main'>Hello</Link>
      <button onClick={toggleFetchingRecipes}>TOGGLE FETCHING</button>
      {
        fetchingRecipes ?
          (
            <div>FETCHING RECIPES</div>
          )
          :
          (
            <div>NOT FETCHING RECIPES</div>
          )
      }
    </div>
  )
}

export default Recipes;