import { get, post } from "../common/baseService"

const RECIPES_PATH = 'recipes';
export const getAllRecipes = () => {
  return get(RECIPES_PATH);
}

//recipe: quantity, unit
export const createRecipe = (recipe) => {
  const path = `${RECIPES_PATH}`;
  recipe.isDeleted = false;
  return post(path, recipe);
}