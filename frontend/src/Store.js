import { legacy_createStore as createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { newProductReducer, productDetailsReducer, productReducer, productsReducer } from './reducers/ProductReducer';
import { forgotPasswordReducer, profileReducer, UserReducer } from './reducers/UserReducer';

const reducer = combineReducers({
  products: productsReducer,
  productDetails: productDetailsReducer,
  user: UserReducer,
  profile: profileReducer,
  forgotPassword: forgotPasswordReducer,
  newProduct: newProductReducer,
  product: productReducer
});

let initialState = {};
const middleware = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store;