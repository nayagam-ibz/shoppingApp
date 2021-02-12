import { createStore, combineReducers, applyMiddleware } from 'redux';
import ProductReducer from './products';
import { reducer as formReducer } from 'redux-form';
import ReduxPromise from 'redux-promise';

const rootReducer = combineReducers({
  products: ProductReducer,	
  form: formReducer
})
const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);
export default createStoreWithMiddleware(rootReducer)