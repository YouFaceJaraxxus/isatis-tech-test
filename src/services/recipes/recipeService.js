import { get } from "../common/baseService"

const RECIPES_PATH = 'recipes';
export const getAllRecipes = () => {
  return get(RECIPES_PATH);
}