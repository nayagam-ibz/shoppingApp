import {
	All_PRODUCTS,
	ALL_CATALOGUE,
	CATALOGUE_MENU,
	GET_CART,
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
		default:
			return state;
	}
}