import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createProduct, getAllProducts, getProductById, softDeleteProduct, updateProduct } from '../../services/products/productService';

export const getProductsAsync = createAsyncThunk(
  'products/getProducts',
  async () => {
    const response = await getAllProducts();
    return response.data;
  }
);

export const getProductByIdAsync = createAsyncThunk(
  'products/getProductById',
  async (id) => {
    const response = await getProductById(id);
    return response.data;
  }
);

export const createProductAsync = createAsyncThunk(
  'products/createProduct',
  async (product) => {
    const response = await createProduct(product);
    return response.data;
  },
);

export const updateProductAsync = createAsyncThunk(
  'products/updateProduct',
  //product has the "data" and the "id"
  async (product) => {
    const { body, id } = product;
    const response = await updateProduct(body, id);
    return response.data;
  },
);

export const softDeleteProductAsync = createAsyncThunk(
  'products/softDeleteProduct',
  //product has the "data" and the "id"
  async (id) => {
    const response = await softDeleteProduct(id);
    return response.data;
  },
);

const getArrayFromObject = (productObject) => Object.entries(productObject)
  .map(([key, value]) => {
    return {
      id: key,
      ...value,
      active: value.active? 'Yes' : 'No'
    }
  });

  const sortArrayByName = (array) => array.sort((a, b) => {
    const aName = a.name.toLowerCase();
    const bName = b.name.toLowerCase();
    return (aName<bName?-1:(aName>bName?1:0));
  })


export const productsSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    currentProduct: null,
    fetchingproducts: false,
    fetchingProduct: false,
    creatingProduct: false,
    updatingProduct: false,
    softDeletingProduct: false,
  },
  reducers: {
    setFetchingproducts: (state, action) => {
      state.fetchingproducts = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getProductsAsync.pending, (state) => {
      state.fetchingproducts = true;
    })
      .addCase(getProductsAsync.fulfilled, (state, action) => {
        //we can't get arrays from firebase, only objects, which we can turn into arrays and manipulate as arrays
        state.products = sortArrayByName(getArrayFromObject(action.payload).filter((product) => !product.isDeleted));
        state.fetchingproducts = false;
      })
      .addCase(getProductsAsync.rejected, (state) => {
        state.fetchingproducts = false;
      })
      .addCase(getProductByIdAsync.pending, (state) => {
        state.fetchingProduct = true;
      })
      .addCase(getProductByIdAsync.fulfilled, (state, action) => {
        state.currentProduct = { ...action.payload, id: action.meta.arg };
        state.fetchingProduct = false;
      })
      .addCase(getProductByIdAsync.rejected, (state) => {
        state.fetchingProduct = false;
      })
      .addCase(createProductAsync.pending, (state) => {
        state.creatingProduct = true;
      })
      .addCase(createProductAsync.fulfilled, (state, action) => {
        state.products = sortArrayByName([...state.products, {
          id: action.payload.name,
          rawMaterialId: action.payload.name,
          ...action.meta.arg,
        }]);
        state.creatingProduct = false;
      })
      .addCase(createProductAsync.rejected, (state) => {
        state.creatingProduct = false;
      })
      .addCase(updateProductAsync.pending, (state) => {
        state.updatingProduct = true;
      })
      .addCase(updateProductAsync.fulfilled, (state, action) => {
        state.products = sortArrayByName(state.products.map((product) => {
          if(product.id === action.meta.arg.id){
            //spread old recipe and overwrite data with new updated recipe's spread data
            return {
              ...product,
              ...action.payload
            };
          }
          else return product;
        }));
        state.updatingProduct = false;
      })
      .addCase(updateProductAsync.rejected, (state) => {
        state.updatingProduct = false;
      })
      .addCase(softDeleteProductAsync.pending, (state) => {
        state.softDeletingProduct = true;
      })
      .addCase(softDeleteProductAsync.fulfilled, (state, action) => {
        state.products = state.products.filter((product) => product.id !== action.meta.arg);
        state.softDeletingProduct = false;
      })
      .addCase(softDeleteProductAsync.rejected, (state) => {
        state.softDeletingProduct = false;
      })
  },
});

export const {
  setFetchingProducts
} = productsSlice.actions;

export default productsSlice.reducer;
