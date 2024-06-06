import { SET_CLEANER, SET_CUSTOMER, SET_ADDRESS, SET_CLEANING, SET_SUBSCRIPTION } from '../../constants/actionsRedux';

const defaultState = {
  cleaner: null,
  customer: null,
  address: null,
  cleaning: null,
  subscription: null,
};

const cardReducer = (state = defaultState, action) => {
  switch (action.type) {
    case SET_CLEANER:
      return { ...state, cleaner: action.payload };
    case SET_CUSTOMER:
      return { ...state, customer: action.payload };
    case SET_ADDRESS:
      return { ...state, address: action.payload };
    case SET_CLEANING:
      return { ...state, cleaning: action.payload };
    case SET_SUBSCRIPTION:
      return { ...state, subscription: action.payload };
    default:
      return state;
  }
};

export default cardReducer;
