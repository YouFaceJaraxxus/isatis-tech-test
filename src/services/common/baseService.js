import axios from 'axios';
import { API_BASE_URL, API_POSTFIX } from '../../common/config/config';

export const get = (path, options = {}, isRawUrl = false) => {
  const url = isRawUrl ? path : `${API_BASE_URL}${path}${API_POSTFIX}`
  return axios.get(url, options);
}