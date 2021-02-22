import axios from "axios";
import humps from "humps";
import {API_URL} from "@env"
import { AsyncStorage } from 'react-native';

console.log(API_URL)

import { APP_TOKEN } from "../../app/store/actions/types";
import store from '../../app/store/reducers'
const TOKEN = "Q3DNP2JnFHG8QRsGJeOwzMd2izvhBM32QAQuBpGIZ3k"

export const convertRequest = data => humps.decamelizeKeys(data)
export const convertResponse = data => humps.camelizeKeys(data)
const formatURL = (uri) => `${API_URL}${uri}`

export const handleResponse = response => ({ ...convertResponse(response.data) })
export const errorResponse = error => ({ errors: convertResponse(error.response.data.errors) })

axios.interceptors.request.use(async (config) => {
  // const userToken = await AsyncStorage.getItem('userToken')
  // config.headers.Authorization = 'Bearer ' + TOKEN
  config.headers.common['X-Spree-Token'] = APP_TOKEN;
  return config;
});

export const makeGETRequest = (uri, config = {}) => axios.get(formatURL(uri), config)
export const makePOSTRequest = (uri, body, config = {}) => axios.post(formatURL(uri), convertRequest(body), config)
export const makeDELETERequest = (uri, config = {}) => axios.delete(formatURL(uri), config)
export const makePATCHRequest = (uri, config = {}) => body => axios.patch(formatURL(uri), convertRequest(body), config)
export const makeFORMATPOSTRequest = (uri, body, config = {}) => axios.post(formatURL(uri), body, config)