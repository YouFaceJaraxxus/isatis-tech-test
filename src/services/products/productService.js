import { get, patch, post, put } from "../common/baseService"

const PRODUCTS_PATH = 'products';
export const getAllProducts = () => {
  return get(PRODUCTS_PATH);
}

export const getProductById = (id) => {
  return get(`${PRODUCTS_PATH}/${id}`);
};

//product: name, price, margin, image, recipe id, active, id
export const createProduct = (recipe) => {
  const path = `${PRODUCTS_PATH}`;
  recipe.isDeleted = false;
  return post(path, recipe);
}

//product: name, price, margin, image, recipe id, active, id: id of product
export const updateProduct = (recipe, id) => {
  const path = `${PRODUCTS_PATH}/${id}`;
  return put(path, recipe);
}

//product: id: id of recipe
export const softDeleteProduct = (id) => {
  const path = `${PRODUCTS_PATH}/${id}`;
  return patch(path, {
    isDeleted: true,
  });
}