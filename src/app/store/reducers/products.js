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
import {handleResponse} from '../../utils/Axios';

export default function handleUsers(state = {}, action) {
	switch (action.type) {
		case All_PRODUCTS:
			return {...state, productsList: handleResponse(action.payload).products};
		case GET_FAVOURITE:
			return {...state, allFavourite: handleResponse(action.payload).products};
		case ALL_CATALOGUE:
			return {
				...state,
				catalogueList: handleResponse(action.payload).catalogue,
			};
		case CATALOGUE_MENU:
			return {
				...state,
				catalogueMenu: handleResponse(action.payload).catalogue,
			};
		case GET_CART:
			return {...state, cartList: handleResponse(action.payload).cart};
		case MY_ORDERS:
			return {...state, myorders: handleResponse(action.payload).orders};
		case GET_PRODUCT_DETAIL:
		  console.log(action.payload.data)
			return {...state, productDetail: handleResponse(action.payload).product};
		case INITIAL_DATA:
			return {...state, initialData: handleResponse(action.payload).product};
		default:
			return state;
	}
}