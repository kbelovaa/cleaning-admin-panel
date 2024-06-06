import {
  SET_ACTIVE_JOBS,
  SET_ADDRESS,
  SET_ADJUSTMENT_JOBS,
  SET_CANCELLED_JOBS,
  SET_CANCELLED_ORDERS,
  SET_CLEANER,
  SET_CLEANERS,
  SET_CLEANING,
  SET_CUSTOMER,
  SET_CUSTOMERS,
  SET_ORDERS,
  SET_PAST_JOBS,
  SET_SUBSCRIPTION,
} from '../../constants/actionsRedux';

export const setCleanersAction = (payload) => ({
  type: SET_CLEANERS,
  payload,
});

export const setCustomersAction = (payload) => ({
  type: SET_CUSTOMERS,
  payload,
});

export const setActiveJobsAction = (payload) => ({
  type: SET_ACTIVE_JOBS,
  payload,
});

export const setPastJobsAction = (payload) => ({
  type: SET_PAST_JOBS,
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

export const setCleanerAction = (payload) => ({
  type: SET_CLEANER,
  payload,
});

export const setCustomerAction = (payload) => ({
  type: SET_CUSTOMER,
  payload,
});

export const setAddressAction = (payload) => ({
  type: SET_ADDRESS,
  payload,
});

export const setCleaningAction = (payload) => ({
  type: SET_CLEANING,
  payload,
});

export const setSubscriptionAction = (payload) => ({
  type: SET_SUBSCRIPTION,
  payload,
});
