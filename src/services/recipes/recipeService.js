import { get, patch, post, put } from "../common/baseService"

const RECIPES_PATH = 'recipes';
export const getAllRecipes = () => {
  return get(RECIPES_PATH);
}

export const getRecipeById = (id) => {
  return get(`${RECIPES_PATH}/${id}`);
};

//recipe: name, quantity, unit
export const createRecipe = (recipe) => {
  const path = `${RECIPES_PATH}`;
  recipe.isDeleted = false;
  return post(path, recipe);
}

//recipe: name, quantity, unit, id: id of recipe
export const updateRecipe = (recipe, id) => {
  const path = `${RECIPES_PATH}/${id}`;
  return put(path, recipe);
}

//recipe: id: id of recipe
export const softDeleteRecipe = (id) => {
  const path = `${RECIPES_PATH}/${id}`;
  return patch(path, {
    isDeleted: true,
  });
}