import axios from 'axios';
import { API_BASE_URL } from '../../common/config/config';

export const get = (path, options = {}, isRawUrl = false) => {
  console.log('getting');
  const url = `${isRawUrl? '' : API_BASE_URL}${path}`
  return axios.get(url, options);
}