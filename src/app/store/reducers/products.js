import {
	GET_PRODUCTS,
	GET_CATEGORIES,
	GET_CART,
	MY_ORDERS,
	GET_PRODUCT_DETAIL,
	INITIAL_DATA,
	GET_FAVOURITE,
	GET_ALL_ADDRESS,
	GET_COUNTRIES,
	GET_STATES,
	NEW_ADDRESS,
	UPDATE_ADDRESS,
	UNAUTH_USER,
	GET_SUB_PRODUCTS,
	ADD_FAVOURITE
} from '../actions/types';
import {handleResponse} from '../../utils/Axios';
const initialState = {
	loggedIn: false,
	unauthReq: false,
};
export default function handleUsers(state = initialState, action) {
	if (!(action.payload && action.payload.data)) return state;
	switch (action.type) {
		case GET_PRODUCTS:
			return {...state, productsList: handleResponse(action.payload).products};
		case GET_SUB_PRODUCTS:
			return {
				...state,
				allSubProducts: handleResponse(action.payload).products,
			};
		case GET_CATEGORIES:
			return {
				...state,
				allCategories: handleResponse(action.payload).taxons,
			};

		case UNAUTH_USER:
			return {...state, unauthReq: true};
		case GET_CART:
			return {...state, cartList: handleResponse(action.payload).cart};
		case MY_ORDERS:
			return {...state, myorders: handleResponse(action.payload).orders};
		case GET_PRODUCT_DETAIL:
			return {...state, productDetail: handleResponse(action.payload)};
		case INITIAL_DATA:
			return {...state, initialData: handleResponse(action.payload).product};
		case GET_ALL_ADDRESS:
			return {...state, allAddress: handleResponse(action.payload).data};
		case UPDATE_ADDRESS:
			return {...state, editAddress: handleResponse(action.payload)};
		case GET_COUNTRIES:
			return {...state, countries: handleResponse(action.payload).countries};
		case GET_STATES:
			return {...state, states: handleResponse(action.payload).states};
		case NEW_ADDRESS:
			return {...state, ...action.payload};
	  case ADD_FAVOURITE: 
	    return { ...state, favourite: handleResponse(action.payload)};		
		case GET_FAVOURITE:
			return {...state, favouriteList: handleResponse(action.payload).favoriteProducts};
		default:
			return state;
	}
}
