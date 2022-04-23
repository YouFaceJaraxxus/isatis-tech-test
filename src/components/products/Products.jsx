import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  createRecipeAsync,
  getRecipeByIdAsync,
  getRecipesAsync,
  setFetchingRecipes,
  softDeleteRecipeAsync,
  updateRecipeAsync
} from '../../redux/reducers/recipesSlice';
import { openSnackbar } from '../../redux/reducers/commonSlice';
import { SUCCESS } from '../../common/config/config';

const Products = () => {
  const { recipes, fetchingRecipes, currentRecipe } = useSelector((state) => state.recipes);

  useEffect(() => {
    const sampleRecipe = '-N07b1ZAnPJVFDZMmcpF';
    dispatch(getRecipesAsync())
    .then((response) => {
      //successful fetch
      if(response.payload){
        dispatch(openSnackbar({
          text: 'Recipes fetched!',
          type: SUCCESS,
        }))
      }
    })
    dispatch(getRecipeByIdAsync(sampleRecipe));
    /*dispatch(updateRecipeAsync({
      id: sampleRecipe,
      body: {
        quantity: 3512.100,
        unit: 'kg',
      },
    }));*/
    //dispatch(softDeleteRecipeAsync(sampleRecipe))
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
      Hi I'm Products!;
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
        recipes && recipes.map((recipe) => (
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
      {
        currentRecipe && (
          <div>
            <h1>CURRENT RECIPE</h1>
            <div>
              ID: {currentRecipe.id}
            </div>
            <div>
              RAW_MATERIAL_ID: {currentRecipe.rawMaterialId}
            </div>
            <div>
              QUANTITY: {currentRecipe.quantity}
            </div>
            <div>
              UNIT: {currentRecipe.unit}
            </div>
          </div>
        )
      }
    </div>
  )
}

export default Products;