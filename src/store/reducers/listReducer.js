import { SET_ADDRESSES, SET_CLEANERS, SET_CUSTOMERS, SET_JOBS, SET_ORDERS } from '../../constants/actionsRedux';

const defaultState = {
  cleaners: [],
  customers: [],
  addresses: [],
  jobs: [],
  orders: [],
};

const listReducer = (state = defaultState, action) => {
  switch (action.type) {
    case SET_CLEANERS:
      return { ...state, cleaners: action.payload };
    case SET_CUSTOMERS:
      return { ...state, customers: action.payload };
    case SET_ADDRESSES:
      return { ...state, addresses: action.payload };
    case SET_JOBS:
      return { ...state, jobs: action.payload };
    case SET_ORDERS:
      return { ...state, orders: action.payload };
    default:
      return state;
  }
};

export default listReducer;
