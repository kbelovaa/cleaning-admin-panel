import {
  SET_ADDRESSES,
  SET_ADJUSTMENT_JOBS,
  SET_CANCELLED_JOBS,
  SET_CANCELLED_ORDERS,
  SET_CLEANERS,
  SET_CUSTOMERS,
  SET_JOBS,
  SET_ORDERS,
} from '../../constants/actionsRedux';

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

export const setAdjustmentJobsAction = (payload) => ({
  type: SET_ADJUSTMENT_JOBS,
  payload,
});

export const setCancelledJobsAction = (payload) => ({
  type: SET_CANCELLED_JOBS,
  payload,
});

export const setOrdersAction = (payload) => ({
  type: SET_ORDERS,
  payload,
});

export const setCancelledOrdersAction = (payload) => ({
  type: SET_CANCELLED_ORDERS,
  payload,
});
