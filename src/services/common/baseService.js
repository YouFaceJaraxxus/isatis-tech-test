import axios from 'axios';
import { API_BASE_URL, API_POSTFIX } from '../../common/config/config';

export const get = (path, orderByKey = null, config = {}, isRawUrl = false) => {
  const orderBy = orderByKey? `?orderBy=\"${orderByKey}\"` : '';
  console.log('orderBy', orderBy);
  const url = isRawUrl ? path : `${API_BASE_URL}${path}${API_POSTFIX}${orderBy}`;
  return axios.get(url, config);
}

export const post = (path, data, config = {}, isRawUrl = false) => {
  const url = isRawUrl ? path : `${API_BASE_URL}${path}${API_POSTFIX}`;
  const dataJson = JSON.stringify(data);
  return axios.post(url, dataJson, config);
}

export const put = (path, data, config = {}, isRawUrl = false) => {
  const url = isRawUrl ? path : `${API_BASE_URL}${path}${API_POSTFIX}`;
  const dataJson = JSON.stringify(data);
  return axios.put(url, dataJson, config);
}

export const patch = (path, data, config = {}, isRawUrl = false) => {
  const url = isRawUrl ? path : `${API_BASE_URL}${path}${API_POSTFIX}`;
  const dataJson = JSON.stringify(data);
  return axios.patch(url, dataJson, config);
}