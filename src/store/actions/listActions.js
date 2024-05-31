import { SET_ADDRESSES, SET_CLEANERS, SET_CUSTOMERS, SET_JOBS, SET_ORDERS } from '../../constants/actionsRedux';
import { getAllAddresses, getAllCleaners, getAllCustomers, getAllJobs, getAllOrders } from '../../http/listsAPI';

export const setCleanersAction = (payload) => ({
  type: SET_CLEANERS,
  payload,
});

export const setCustomersAction = (payload) => ({
  type: SET_CUSTOMERS,
  payload,
});

export const setAddressesAction = (payload) => ({
  type: SET_ADDRESSES,
  payload,
});

export const setJobsAction = (payload) => ({
  type: SET_JOBS,
  payload,
});

export const setOrdersAction = (payload) => ({
  type: SET_ORDERS,
  payload,
});
