import {
  All_PRODUCTS,
  ALL_CATALOGUE,
  CATALOGUE_MENU,
  GET_CART,
  MY_ORDERS,
  GET_PRODUCT_DETAIL,
  INITIAL_DATA,
  GET_FAVOURITE
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

export function getProduct() {
  // const response = makeGETRequest('/products');
  return {
    type: All_PRODUCTS,
    payload: {data: products},
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