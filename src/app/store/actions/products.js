import {
  GET_PRODUCTS,
  GET_CATEGORIES,
  GET_CART,
  MY_ORDERS,
  GET_PRODUCT_DETAIL,
  INITIAL_DATA,
  GET_FAVOURITE,
  GET_ALL_ADDRESS,
  DELETE_ADDRESS,
  GET_COUNTRIES,
  GET_STATES,
  NEW_ADDRESS,
  UPDATE_ADDRESS,
  USER_LOGIN,
  USER_REGISTRATION,
  GET_SUB_PRODUCTS,
  ADD_FAVOURITE,
  ADD_TO_CART,
  GET_CART_ITEMS
} from '../actions/types';
import {
  makeGETRequest,
  makePOSTRequest,
  makePUTRequest,
  makeDELETERequest,
  makeFormDataPOSTRequest,
  makeFormDataPUTRequest,
} from '../../utils/Axios';
import cart from '../../../app/json/cart.json';
import orders from '../../../app/json/orders.json';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

export function getCategories() {
  const response = makeGETRequest('/storefront/taxons');
  return {
    type: GET_CATEGORIES,
    payload: response,
  };
}

export function getProducts(id) {
  const response = makeGETRequest(`/storefront/taxons/products?id=${id}`);
  return {
    type: GET_PRODUCTS,
    payload: response,
  };
}

export function getSubProduct(id) {
  const response = makeGETRequest(`/storefront/taxons/products?id=${id}`);
  return {
    type: GET_SUB_PRODUCTS,
    payload: response,
  };
}

export function getProductDetail(id) {
  const response = makeGETRequest(`/storefront/products/${id}`);
  return {
    type: GET_PRODUCT_DETAIL,
    payload: response
  };
}

export function addRemoveFavourite(id) {
  const response = makePOSTRequest(`/storefront/favorite_products/add_or_remove_favorite`, {product_id: id});
  return {
    type: ADD_FAVOURITE,
    payload: response,
  };
}

export function getFavourite() {
  const response = makeGETRequest(`/storefront/favorite_products`);
  return {
    type: GET_FAVOURITE,
    payload: response
  };
}

export function addToCart(id) {
  const response = makePOSTRequest(`/storefront/cart/add_item`, {variant_id: id});
  return{
    type: ADD_TO_CART,
    payload: response
  }
}


export function getCartItems() {
  const response = makeGETRequest(`/storefront/cart`);
  return {
    type: GET_CART_ITEMS,
    payload: response
  };
}

export function getMyOrders() {
  // const response = makeGETRequest('/products');
  return {
    type: MY_ORDERS,
    payload: {data: orders},
  };
}

export function setInitialData(data) {
  // const response = makeGETRequest(`/users/common_details`)
  return {
    type: INITIAL_DATA,
    payload: {data: data},
  };
}

export function getAllAddress() {
  const response = makeGETRequest(`/storefront/account/addresses`);
  return {
    type: GET_ALL_ADDRESS,
    payload: response,
  };
}

export function updateAddress(id) {
  const response = makeGETRequest(`/storefront/account/addresses/${id}`);
  return {
    type: UPDATE_ADDRESS,
    payload: response,
  };
}

export function deleteAddress(id) {
  const response = makeDELETERequest(`/storefront/account/addresses/${id}`);
  return {
    type: DELETE_ADDRESS,
    payload: response,
  };
}

export function getCountries() {
  const response = makeGETRequest(`/storefront/countries`);
  return {
    type: GET_COUNTRIES,
    payload: response,
  };
}

export function getStates(id) {
  const response = makeGETRequest(`/storefront/states?country_id=${id}`);
  return {
    type: GET_STATES,
    payload: response,
  };
}

export function createAddress(reqParam, id) {
  let response = '';
  if (id === '') {
    response = makePOSTRequest(`/storefront/account/addresses`, reqParam);
  } else {
    response = makePOSTRequest(`/storefront/account/addresses/detail_update`, reqParam);
  }
  return {
    type: NEW_ADDRESS,
    payload: response,
  };
}

export function userLogin(reqParam) {
  const response = makePOSTRequest(`/storefront/sign_in`, reqParam);
  return {
    type: USER_LOGIN,
    payload: response,
  };
}
export function userRegistration(reqParam) {
  const response = makePOSTRequest(`/storefront/sign_up`, reqParam);
  return {
    type: USER_REGISTRATION,
    payload: response,
  };
}

export async function CurrentUser() {
  try {
    const token = await AsyncStorage.getItem('token');
    return token;
  } catch (error) {
    return error;
  }
}
export function StoreUserToken(authToken) {
  try {
    const token = AsyncStorage.setItem('token', authToken);
    return token;
  } catch (error) {
    return error;
  }
}