import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import userReducer from './reducers/userReducer';
import listReducer from './reducers/listReducer';
import cardReducer from './reducers/cardReducer';

const rootReducer = combineReducers({
  user: userReducer,
  list: listReducer,
  card: cardReducer,
});

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
