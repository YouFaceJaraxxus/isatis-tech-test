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
import Table from '../table/Table';
import productsClasses from './products.module.scss'

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

  console.log(recipes);
  return (
    <div className={productsClasses.productsWrapper}>
      <h3>All Products:</h3>
      <Table data={recipes.map(recipe => {
        return {
            'ID':recipe.id, 
            'Material ID': recipe.rawMaterialId,
            'Name': recipe.name,
            'Quantity': recipe.quantity,
            'Unit': recipe.unit
          };
        })}></Table>
        <button className={productsClasses.createButton}>Create Product</button>
    </div>
  )
}

export default Products;