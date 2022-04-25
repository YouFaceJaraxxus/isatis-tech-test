import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  createRecipeAsync,
  getRecipesAsync, softDeleteRecipeAsync, updateRecipeAsync,
} from '../../redux/reducers/recipesSlice';
import { openSnackbar } from '../../redux/reducers/commonSlice';
import { ERROR, SUCCESS } from '../../common/config/config';
import recipesClasses from './recipes.module.scss';
import classNames from 'classnames/bind';
import Table from '../table/Table';
import { useForm } from 'react-hook-form';
import Modal from 'react-modal/lib/components/Modal';
import { getRawMaterialsAsync } from '../../redux/reducers/rawMaterialsSlice';
import ConfirmationDialog from '../confirmationDialog/ConfirmationDialog';
import modalStyles from '../../common/modalStyles';

const CONFIRM_DELETE_TITLE = 'Are you sure you want to delete the recipe?';
const initialConfirmDialogState = {
  isOpen: false,
  title: null,
  confirmText: null,
  cancelText: null,
  confirmAction: null,
  cancelAction: null,
  type: null,
}


const Recipes = () => {
  const { recipes } = useSelector((state) => state.recipes);
  const { rawMaterials } = useSelector((state) => state.rawMaterials);
  const cx = classNames.bind(recipesClasses);

  const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm();

  const [recipeToUpdate, setRecipeToUpdate] = useState(null);
  const [isOpenModal, setOpenModal] = useState(false);
  const [confirmDialogConfig, setConfirmDialogConfig] = useState(initialConfirmDialogState);

  useEffect(() => {
    const sampleRecipe = '-N07b1ZAnPJVFDZMmcpF';
    dispatch(getRecipesAsync())
      .then((response) => {
        //successful fetch
        if (response.payload) {
          dispatch(openSnackbar({
            text: 'Recipes fetched!',
            type: SUCCESS,
          }))
        }
      })

    dispatch(getRawMaterialsAsync());
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

  const closeDialog = () => {
    setConfirmDialogConfig(initialConfirmDialogState);
  }

  const handleDeleteRecipeClick = (recipeId) => {
    setConfirmDialogConfig({
      isOpen: true,
      title: CONFIRM_DELETE_TITLE,
      type: ERROR,
      confirmAction: () => { deleteRecipe(recipeId); closeDialog(); },
      cancelAction: closeDialog,
    });
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

  const handleCreateRecipeClick = () => {
    setRecipeToUpdate(null);
    reset();
    showCreateRecipeModal();
  }

  return (
    <div className={cx({
      recipesWrapper: true
    })}>
      <div className={recipesClasses.recipesTitle}>
        Recipes
      </div>
      <Modal
        isOpen={isOpenModal}
        onRequestClose={closeCreateRecipeModal}
        style={modalStyles}
        className={recipesClasses.modalWindow}
      >
        {!recipeToUpdate && <h4>Create Recipe</h4>}
        {recipeToUpdate && <h4>Update Recipe</h4>}
        <form className={recipesClasses.createRecipeForm} onSubmit={handleSubmit(handleFormSubmit)}>
          {errors.name && <label className={recipesClasses.errorMessage}>{errors.name.message}</label>}
          <input type='text' placeholder='Name' name='name' {...register('name', {required: 'Please enter recipe name.'})} ></input>
          {errors.quantity && <label className={recipesClasses.errorMessage}>{errors.quantity.message}</label>}
          <input type='text' placeholder='Quantity' name='quantity' {...register('quantity', {required: 'Please enter quantity.'})} ></input>
          {errors.rawMaterialId && <label className={recipesClasses.errorMessage}>{errors.rawMaterialId.message}</label>}
          <select name='rawMaterialId' {...register('rawMaterialId', {required: 'Please select raw material.'})}>
            {
              rawMaterials?.map((rawMaterial) => (
                <option value={rawMaterial.id} key={rawMaterial.id}>{rawMaterial.name}</option>
              ))
            }
          </select>
          {errors.unit && <label className={recipesClasses.errorMessage}>{errors.unit.message}</label>}
          <select name='unit' {...register('unit', {required: 'Please enter unit.'})}>
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
      <ConfirmationDialog {...confirmDialogConfig} />
      <Table data={recipes}
        headers={{
          id: 'ID',
          rawMaterialId: 'Raw Material ID',
          name: 'Name',
          quantity: 'Quantity',
          unit: 'Unit'
        }} 
        handleUpdate={updateRecipe} 
        handleDelete={handleDeleteRecipeClick}
        sizes={['lg', 'lg', 'lg', 'md', 'xs']}
      />

      <button className={recipesClasses.createButton} onClick={handleCreateRecipeClick}>Create Recipe</button>
    </div>
  )
}

export default Recipes;