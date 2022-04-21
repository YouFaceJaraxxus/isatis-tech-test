import dotenv from 'dotenv';

dotenv.config();

const { 
  REACT_APP_API_BASE_URL: API_BASE_URL,
  REACT_APP_API_POSTFIX: API_POSTFIX,
  REACT_APP_LIGHT_THEME: LIGHT_THEME,
  REACT_APP_DARK_THEME: DARK_THEME,
 } = process.env;

export {
  API_BASE_URL,
  API_POSTFIX,
  LIGHT_THEME,
  DARK_THEME
};
