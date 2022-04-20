import dotenv from 'dotenv';

dotenv.config();

const { 
  REACT_APP_API_BASE_URL: API_BASE_URL,
  REACT_APP_API_POSTFIX: API_POSTFIX,
 } = process.env;

export {
  API_BASE_URL,
  API_POSTFIX,
};
