import {
  All_PRODUCTS,
  ALL_CATALOGUE,
  CATALOGUE_MENU,
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
  EDIT_ADDRESS
} from '../actions/types';
import {
  makeGETRequest,
  makePOSTRequest,
  makePUTRequest,
  makeDELETERequest,
  makeFormDataPOSTRequest,
  makeFormDataPUTRequest,
} from '../../utils/Axios';
import products from '../../../app/json/products.json';
import catalogue from '../../../app/json/catalogue.json';
import catalogueMenu from '../../../app/json/catalogueMenu.json';
import cart from '../../../app/json/cart.json';
import orders from '../../../app/json/orders.json';
import detail from '../../../app/json/details.json';
import address from '../../../app/json/address.json';
import axios from "axios";

export function getProduct() {
  // const response = makeGETRequest('/products');
  return {
    type: All_PRODUCTS,
    payload: {data: products}
  };
}

export function getFavourite() {
  // const response = makeGETRequest('/products');
  return {
    type: GET_FAVOURITE,
    payload: {data: products},
  };
}

export function getCatalogue() {
  // const response = makeGETRequest('/products');
  return {
    type: ALL_CATALOGUE,
    payload: {data: catalogue},
  };
}

export function getCatalogueMenu() {
  // const response = makeGETRequest('/products');
  return {
    type: CATALOGUE_MENU,
    payload: {data: catalogueMenu},
  };
}

export function getProductDetail() {
  // const response = makeGETRequest('/products');
  return {
    type: GET_PRODUCT_DETAIL,
    payload: {data: detail},
  };
}

export function getCart() {
  // const response = makeGETRequest('/products');
  return {
    type: GET_CART,
    payload: {data: cart},
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
  }
}

export function getAllAddress() {
  const response = makeGETRequest(`/storefront/account/addresses`)
  return {
    type: GET_ALL_ADDRESS,
    payload: response
  }
}


export function editAddress(id) {
  const response = makeGETRequest(`/storefront/account/addresses/${id}`)
  return {
    type: EDIT_ADDRESS,
    payload: response
  }
}


export function deleteAddress(id) {
  const response = makeDELETERequest(`/storefront/account/addresses/${id}`)
  return {
    type: DELETE_ADDRESS,
    payload: response
  }
}

export function getCountries() {
  const response = makeGETRequest(`/storefront/countries`);
  return {
    type: GET_COUNTRIES,
    payload: response
  }
}

export function getStates(id) {
  const response = makeGETRequest(`/storefront/states?country_id=${id}`);
  return {
    type: GET_STATES,
    payload: response
  }
}

export function createAddress(reqParam, id) {
  let response = ''
  if(id===""){
    response = makePOSTRequest(`/storefront/account/addresses`,reqParam);
  }else{
    response = makePOSTRequest(`/storefront/account/addresses/${id}`,reqParam);
  }
  return {
    type: NEW_ADDRESS,
    payload: response
  }
}

