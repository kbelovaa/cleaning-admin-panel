import { SET_IP_COUNTRY, SET_IS_AUTH, SET_USER } from '../../constants/actionsRedux';

export const setIsAuthAction = (payload) => ({
  type: SET_IS_AUTH,
  payload,
});

export const setIpCountryAction = (payload) => ({
  type: SET_IP_COUNTRY,
  payload,
});

export const setUserAction = (payload) => ({
  type: SET_USER,
  payload,
});
