import {
	All_PRODUCTS,
	ALL_CATALOGUE,
	CATALOGUE_MENU,
	GET_CART,
	MY_ORDERS,
	GET_PRODUCT_DETAIL,
} from '../actions/types';
import {handleResponse} from '../../utils/Axios';

export default function handleUsers(state = {}, action) {
	switch (action.type) {
		case All_PRODUCTS:
			return {...state, productsList: action.payload.data.Products.products};

		case ALL_CATALOGUE:
			return {...state, catalogueList: action.payload.data.Catalogue.catalogue};

		case CATALOGUE_MENU:
			return {
				...state,
				catalogueMenu: action.payload.data.CatalogueMenu.catalogue,
			};
		case GET_CART:
			return {...state, cartList: action.payload.data.Cart.cart};
		case MY_ORDERS:
			return {...state, myorders: action.payload.data.Orders.orders};
		case GET_PRODUCT_DETAIL:
			return {...state, productDetail: action.payload.data.Detail.product};
		default:
			return state;
	}
}