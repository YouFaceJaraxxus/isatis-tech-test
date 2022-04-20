import dotenv from 'dotenv';

dotenv.config();

const { REACT_APP_API_BASE_URL: API_BASE_URL } = process.env;

export {
  API_BASE_URL,
};
