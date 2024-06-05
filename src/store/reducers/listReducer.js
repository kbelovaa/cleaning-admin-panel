import {
  SET_ADDRESSES,
  SET_CANCELLED_JOBS,
  SET_CANCELLED_ORDERS,
  SET_CLEANERS,
  SET_CUSTOMERS,
  SET_ACTIVE_JOBS,
  SET_PAST_JOBS,
  SET_ADJUSTMENT_JOBS,
  SET_ORDERS,
} from '../../constants/actionsRedux';

const defaultState = {
  cleaners: [],
  customers: [],
  addresses: [],
  activeJobs: [],
  pastJobs: [],
  adjustmentJobs: [],
  cancelledJobs: [],
  orders: [],
  cancelledOrders: [],
};

const listReducer = (state = defaultState, action) => {
  switch (action.type) {
    case SET_CLEANERS:
      return { ...state, cleaners: action.payload };
    case SET_CUSTOMERS:
      return { ...state, customers: action.payload };
    case SET_ADDRESSES:
      return { ...state, addresses: action.payload };
    case SET_ACTIVE_JOBS:
      return { ...state, activeJobs: action.payload };
    case SET_PAST_JOBS:
      return { ...state, pastJobs: action.payload };
    case SET_ADJUSTMENT_JOBS:
      return { ...state, adjustmentJobs: action.payload };
    case SET_CANCELLED_JOBS:
      return { ...state, cancelledJobs: action.payload };
    case SET_ORDERS:
      return { ...state, orders: action.payload };
    case SET_CANCELLED_ORDERS:
      return { ...state, cancelledOrders: action.payload };
    default:
      return state;
  }
};

export default listReducer;
