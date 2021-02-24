import axios from "axios";
import humps from "humps";
import {API_URL} from "@env"
import AsyncStorage from '@react-native-community/async-storage';
// const API_URL = "http://192.168.1.110:3000"

import { APP_TOKEN, UNAUTH_USER} from "../../app/store/actions/types";
import store from '../../app/store/reducers'
export const convertRequest = data => humps.decamelizeKeys(data)
export const convertResponse = data => humps.camelizeKeys(data)
const formatURL = (uri) => `${API_URL}${uri}`
export const handleResponse = response => ({ ...convertResponse(response.data) })
export const errorResponse = error => ({ errors: convertResponse(error.response.data.errors) })
axios.interceptors.request.use(async (config) => {
  const userToken = await AsyncStorage.getItem('token')
  config.headers.Authorization = 'Bearer ' + userToken
  config.headers.common['X-Spree-Token'] = APP_TOKEN;
  config.headers.post['Content-Type'] = "application/json";
  return config;
});

axios.interceptors.response.use(function (response) {
  return response;
}, (error) => {
  if (error.response && (error.response.status === 401 || error.response.status === 'unauthorized')) {
    store.dispatch({ type: UNAUTH_USER });
  }
  return Promise.reject(error);
});
export const makeGETRequest = (uri, config = {}) => axios.get(formatURL(uri), config)
export const makePOSTRequest = (uri, body, config = {}) => axios.post(formatURL(uri), convertRequest(body), config)
export const makeDELETERequest = (uri, config = {}) => axios.delete(formatURL(uri), config)
export const makePATCHRequest = (uri, config = {}) => body => axios.patch(formatURL(uri), convertRequest(body), config)
export const makePUTRequest = (uri, config = {}) => body => axios.put(formatURL(uri), config)
export const makeFORMATPOSTRequest = (uri, body, config = {}) => axios.post(formatURL(uri), body, config)