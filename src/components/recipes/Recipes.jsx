import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  createRecipeAsync,
  getRecipesAsync, softDeleteRecipeAsync, updateRecipeAsync,
} from '../../redux/reducers/recipesSlice';
import { openSnackbar } from '../../redux/reducers/commonSlice';
import { SUCCESS } from '../../common/config/config';
import recipesClasses from './recipes.module.scss';
import classNames from 'classnames/bind';
import Table from '../table/Table';
import { useForm } from 'react-hook-form';
import Modal from 'react-modal/lib/components/Modal';
import { updateProductAsync } from '../../redux/reducers/productsSlice';

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


const Recipes = () => {
  const { recipes } = useSelector((state) => state.recipes);
  const cx = classNames.bind(recipesClasses);

  const {register, handleSubmit, setValue, reset} = useForm();

  const [recipeToUpdate, setRecipeToUpdate] = useState(null);
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
  }, [])
  const dispatch = useDispatch();

  const showCreateRecipeModal = () => {
    setOpenModal(true);
  }

  const closeCreateRecipeModal = () => {
    setOpenModal(false);
  }


  const updateRecipe = (recipe) => {
    Object.keys(recipe).forEach(key => key !== 'id' && key !== 'rawMaterialId' && setValue(key, recipe[key]));
    setRecipeToUpdate(recipe);
    showCreateRecipeModal();
  }

  const deleteRecipe = (recipeId) => {
    dispatch(softDeleteRecipeAsync(recipeId));
  }

  const handleFormSubmit = (data) => {
    if (recipeToUpdate) {
      dispatch(updateRecipeAsync({
        id: recipeToUpdate.id,
        body: {
          ...data,
        }
      }));
    } else {
      dispatch(createRecipeAsync(data));
    }
    setRecipeToUpdate(null);
    reset();
    closeCreateRecipeModal();  
  }

  return (
    <div className={recipesClasses.recipesWrapper}>
      <div className={recipesClasses.recipesTitle}>
        All recipes:
      </div>
      <Modal
        isOpen={isOpenModal}
        onRequestClose={closeCreateRecipeModal}
        style={customStyles}
      >
        {!recipeToUpdate && <h4>Create Product</h4>}
        {recipeToUpdate && <h4>Update Product</h4>}
        <form className={recipesClasses.createRecipeForm} onSubmit={handleSubmit(handleFormSubmit)}>
          <input type='text' placeholder='Name' name='name' {...register('name')} ></input>
          <input type='text' placeholder='Quantity' name='quantity' {...register('quantity')} ></input>
          <select name='unit' {...register('unit')}>
            <option>g</option>
            <option>kg</option>
            <option>mg</option>
            <option>l</option>
            <option>ml</option>
            <option>dl</option>
          </select>
          <input type='submit' value={recipeToUpdate ? 'Update' : 'Create'}></input>
        </form>
      </Modal>
        <Table data={recipes} headers={{
          id: 'ID',
          rawMaterialId: 'Raw Material ID',
          name: 'Name',
          quantity: 'Quantity',
          unit: 'Unit'
        }} handleUpdate={updateRecipe} handleDelete={deleteRecipe}/>
      
      <button className={recipesClasses.createButton} onClick={() => {
          setRecipeToUpdate(null);
          reset();
          showCreateRecipeModal();
          }}>Create Recipe</button>
    </div>
  )
}

export default Recipes;