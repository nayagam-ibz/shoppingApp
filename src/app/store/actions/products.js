import {
  All_PRODUCTS,
  ALL_CATALOGUE,
  CATALOGUE_MENU,
  GET_CART,
  MY_ORDERS,
  GET_PRODUCT_DETAIL
} from '../actions/types';
import {
  makeGETRequest,
  makePOSTRequest,
  makePUTRequest,
  makeDELETERequest,
  makeFormDataPOSTRequest,
  makeFormDataPUTRequest,
} from '../../utils/Axios';
import Products from '../../../app/json/products.json';
import Catalogue from '../../../app/json/catalogue.json';
import CatalogueMenu from '../../../app/json/catalogueMenu.json';
import Cart from '../../../app/json/cart.json';
import Orders from '../../../app/json/orders.json';
import Detail from '../../../app/json/details.json';

export function getProduct() {
  // const response = makeGETRequest('/products');
  return {
    type: All_PRODUCTS,
    payload: {data: {Products}},
  };
}

export function getCatalogue() {
  // const response = makeGETRequest('/products');
  return {
    type: ALL_CATALOGUE,
    payload: {data: {Catalogue}},
  };
}

export function getCatalogueMenu() {
  // const response = makeGETRequest('/products');
  return {
    type: CATALOGUE_MENU,
    payload: {data: {CatalogueMenu}},
  };
}

export function getProductDetail() {
  // const response = makeGETRequest('/products');
  return {
    type: GET_PRODUCT_DETAIL,
    payload: {data: {Detail}},
  };
}

export function getCart() {
  // const response = makeGETRequest('/products');
  return {
    type: GET_CART,
    payload: {data: {Cart}},
  };
}

export function getMyOrders() {
  // const response = makeGETRequest('/products');
  return {
    type: MY_ORDERS,
    payload: {data: {Orders}},
  };
}