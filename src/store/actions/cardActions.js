import { SET_ADDRESS, SET_CLEANER, SET_CLEANING, SET_CUSTOMER, SET_SUBSCRIPTION } from '../../constants/actionsRedux';

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
