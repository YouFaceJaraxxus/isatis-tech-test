import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createRecipeAsync, getRecipesAsync, setFetchingRecipes } from '../../redux/reducers/recipesSlice';

const Recipes = () => {
  const { recipes, fetchingRecipes } = useSelector((state) => state.recipes);

  useEffect(() => {
    dispatch(getRecipesAsync());
    /*dispatch((createRecipeAsync({
      quantity: 245.1,
      unit: 'g'
    })))*/
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
      {
        recipes && recipes.map((recipe) => !recipe.isDeleted && (
          <div key={recipe.id}>
            <div>
              ID: {recipe.id}
            </div>
            <div>
              RAW_MATERIAL_ID: {recipe.rawMaterialId}
            </div>
            <div>
              QUANTITY: {recipe.quantity}
            </div>
            <div>
              UNIT: {recipe.unit}
            </div>
          </div>
        ))
      }
    </div>
  )
}

export default Recipes;