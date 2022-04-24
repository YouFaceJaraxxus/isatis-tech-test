import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { openSnackbar } from '../../redux/reducers/commonSlice';
import { ERROR, SUCCESS } from '../../common/config/config';
import Table from '../table/Table';
import productsClasses from './products.module.scss'
import Modal from 'react-modal/lib/components/Modal';
import { createProductAsync, getProductsAsync, softDeleteProductAsync, updateProductAsync } from '../../redux/reducers/productsSlice';
import { useForm } from 'react-hook-form';
import ConfirmationDialog from '../confirmationDialog/ConfirmationDialog';
import { getRecipesAsync } from '../../redux/reducers/recipesSlice';
import { getRawMaterialsAsync } from '../../redux/reducers/rawMaterialsSlice';
import { ErrorMessage } from '@hookform/error-message';

const CONFIRM_DELETE_TITLE = 'Are you sure you want to delete the product?';
const initialConfirmDialogState = {
  isOpen: false,
  title: null,
  confirmText: null,
  cancelText: null,
  confirmAction: null,
  cancelAction: null,
  type: null,
}

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '20%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
};

const Products = () => {
  const { products } = useSelector((state) => state.products);
  const { recipes } = useSelector((state) => state.recipes);
  const { rawMaterials } = useSelector((state) => state.rawMaterials);

  const { register, handleSubmit, setValue, reset, setError, formState: { errors } } = useForm();

  const [isOpenModal, setOpenModal] = useState(false);

  const [confirmDialogConfig, setConfirmDialogConfig] = useState(initialConfirmDialogState);

  const [productToUpdate, setProductToUpdate] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductsAsync())
      .then((response) => {
        //successful fetch
        if (response.payload) {
          dispatch(openSnackbar({
            text: 'Products fetched!',
            type: SUCCESS,
          }))
        }
      });
      dispatch(getRecipesAsync());
      dispatch(getRawMaterialsAsync());
  }, []);

  const showCreateProductModal = () => {
    setOpenModal(true);
  }

  const closeCreateProductModal = () => {
    setOpenModal(false);
  }

  const deleteProduct = (productId) => {
    dispatch(softDeleteProductAsync(productId));
  }

  const closeDialog = () => {
    setConfirmDialogConfig(initialConfirmDialogState);
  }

  const handleDeleteProductClick = (productId) => {
    setConfirmDialogConfig({
      isOpen: true,
      title: CONFIRM_DELETE_TITLE,
      type: ERROR,
      confirmAction: () => { deleteProduct(productId); closeDialog(); },
      cancelAction: closeDialog,
    });
  }

  const updateProduct = (product) => {
    Object.keys(product).forEach(key => key !== 'id' && setValue(key, product[key]));
    setProductToUpdate(product);
    showCreateProductModal();
  }

  const handleFormSubmit = (data) => {
    console.log(data);

    if (data.price === '' && data.margin === '') {
      setError('priceMargin', { type: {
          required: "Please enter price or margin."
        }
      });
      return;
    }
    const recipe = recipes.find( r => r.id === data.recipeId);
    const rawMaterial = rawMaterials.find(rm => rm.id === recipe.rawMaterialId);
    console.log(recipe);
    console.log(rawMaterial);
    if(data.price === '') {
      data.price = (rawMaterial.price * recipe.quantity) + ((rawMaterial.price * recipe.quantity * data.margin) / 100)
    } else {
      data.margin = ((data.price - rawMaterial.price * recipe.quantity) * 100) / (rawMaterial.price * recipe.quantity);
    }

    if (productToUpdate) {
      dispatch(updateProductAsync({
        id: productToUpdate.id,
        body: {
          ...data
        }
      }));
    } else {
      dispatch(createProductAsync({
        ...data
      }));
    }
    setProductToUpdate(null);
    reset();
    closeCreateProductModal();
  }


  return (
    <div className={productsClasses.productsWrapper}>
      <div className={productsClasses.productsTitle}>Products</div>
      <Modal
        isOpen={isOpenModal}
        onRequestClose={closeCreateProductModal}
        style={customStyles}
      >
        {!productToUpdate && <h4>Create Product</h4>}
        {productToUpdate && <h4>Update Product</h4>}
        <form className={productsClasses.createProductForm} onSubmit={handleSubmit(handleFormSubmit)}>
          {errors.name && <label className={productsClasses.errorMessage}>Please enter product name.</label>}
          <input type='text' placeholder='Name' name='name' {...register('name', { required: 'Please enter product name.' })} ></input>
          {errors.priceMargin && <label className={productsClasses.errorMessage}>Please enter product price or margin.</label>}
          <input type='number' step='.01' placeholder='Price' name='price' {...register('price')}></input>
          <input type='number' step='.01' placeholder='Margin' name='margin' {...register('margin')}></input>
          {errors.recipeId && <label className={productsClasses.errorMessage}>Please select recipe for product.</label>}
          <select name='recipeId' {...register('recipeId', { required: 'Please select recipe.' })}>
            {
              recipes?.map((recipe) => !recipe.isDeleted && (
                <option value={recipe.id} key={recipe.id}>{recipe.name}</option>
              ))  
            }
          </select>
          {errors.image && <label className={productsClasses.errorMessage}>Please enter product image URL.</label>}
          <input type='text' placeholder='Image URL' name='image' {...register('image', { required: 'Please enter product image URL.' })}></input>
          <div className={productsClasses.checkBox}>
            <input type='checkbox' id='active' name='active' {...register('active')}></input>
            <label htmlFor='active'>Active</label>
          </div>
          <input type='submit' value={productToUpdate ? 'Update' : 'Create'}></input>
        </form>
      </Modal>
      <ConfirmationDialog {...confirmDialogConfig} />
      <Table 
      data={products} 
      headers={{
        id: 'ID',
        name: 'Name',
        price: 'Price',
        margin: 'Margin',
        recipeId: 'Recipe ID',
        active: 'Active',
        image: 'Image'
      }} 
      handleDelete={handleDeleteProductClick} 
      handleUpdate={updateProduct} 
      sizes={['lg', 'lg', 's', 'xs', 'lg', 'xs', 'lg']}
      />
      <button className={productsClasses.createButton} onClick={() => {
        setProductToUpdate(null);
        reset();
        showCreateProductModal();
      }}>Create Product</button>
    </div>
  )
}

export default Products;