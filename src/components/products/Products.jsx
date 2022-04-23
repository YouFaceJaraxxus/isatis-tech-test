import React, { useEffect, useState } from 'react';
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
import Modal from 'react-modal/lib/components/Modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    border: '10px solid'
  },
};

const Products = () => {
  const { recipes, fetchingRecipes, currentRecipe } = useSelector((state) => state.recipes);

  const [isOpenModal, setOpenModal] = useState(false);

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

  const showCreateProductModal = () => {
    setOpenModal(true);
  }

  const closeCreateProductModal = () => {
    setOpenModal(false);
  }

  const handleCreateProduct = (e) => {
    e.preventDefault();
    console.log(e);
  }


  return (
    <div className={productsClasses.productsWrapper}>
      <h3>All Products:</h3>
      <Modal
        isOpen={isOpenModal}
        onRequestClose={closeCreateProductModal}
        style={customStyles}
      >
        <h4>Create Product</h4>
        <form className={productsClasses.createProductForm} onSubmit={handleCreateProduct}>
          <input type='text' placeholder='Product Name'></input>
          <input type='text' placeholder='Quantity'></input>
          <select>
            <option>Grams</option>
            <option>Milligrams</option>
            <option>Kilograms</option>
            <option>Milliliter</option>
            <option>Deciliter</option>
            <option>Liter</option>
          </select>
          <input type='submit' value='Create'></input>
        </form>
      </Modal>
      <Table data={recipes.map(recipe => {
        return {
            'ID':recipe.id, 
            'Material ID': recipe.rawMaterialId,
            'Name': recipe.name,
            'Quantity': recipe.quantity,
            'Unit': recipe.unit
          };
        })}></Table>
        <button className={productsClasses.createButton} onClick={showCreateProductModal}>Create Product</button>
    </div>
  )
}

export default Products;