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
    border: '10px solid'
  },
};

const Products = () => {
  const { products } = useSelector((state) => state.products);

  const { register, handleSubmit, setValue, reset } = useForm();

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
      })
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
    if (productToUpdate) {
      dispatch(updateProductAsync({
        id: productToUpdate.id,
        body: {
          ...data,
          active: data.active === 'yes' ? true : false,
        }
      }));
    } else {
      dispatch(createProductAsync({
        ...data,
        active: data.active === 'yes' ? true : false,
      }));
    }
    setProductToUpdate(null);
    reset();
    closeCreateProductModal();
  }


  return (
    <div className={productsClasses.productsWrapper}>
      <h3>All Products:</h3>
      <Modal
        isOpen={isOpenModal}
        onRequestClose={closeCreateProductModal}
        style={customStyles}
      >
        {!productToUpdate && <h4>Create Product</h4>}
        {productToUpdate && <h4>Update Product</h4>}
        <form className={productsClasses.createProductForm} onSubmit={handleSubmit(handleFormSubmit)}>
          <input type='text' placeholder='Name' name='name' {...register('name')} ></input>
          <input type='text' placeholder='Price' name='price' {...register('price')}></input>
          <input type='text' placeholder='Margin' name='margin' {...register('margin')}></input>
          <input type='text' placeholder='Recipe ID' name='recipeId' {...register('recipeId')}></input>
          <input type='text' placeholder='Active' name='active' {...register('active')}></input>
          <input type='text' placeholder='Image URL' name='image' {...register('image')}></input>
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