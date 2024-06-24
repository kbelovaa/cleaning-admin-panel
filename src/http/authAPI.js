import $host from './index';

export const checkEmail = async (email) => {
  try {
    const { data } = await $host.get(`api/auth/check_cleaner_email/${email}`);
    return data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      return { message: error.response.data.message, error: true };
    }

    return { error: 'Unexpected error' };
  }
};

export const signIn = async (email, password, role = 'admin') => {
  try {
    const { data } = await $host.post('api/auth/signin_web', { email, password, role });

    return data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      return { message: error.response.data.message };
    }

    return { error: 'Unexpected error' };
  }
};

export const register = async (
  name,
  surname,
  email,
  mobile,
  homeAddress1,
  homeAddress2,
  level,
  comment,
  knowingWay,
  knowingWayText,
  role = 'cleaner',
) => {
  try {
    const { data } = await $host.post('api/auth/signup_web', {
      name,
      surname,
      email,
      mobile,
      homeAddress1,
      homeAddress2,
      level,
      comment,
      knowingWay,
      knowingWayText,
      role,
    });

    return data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      return { message: error.response.data.message };
    }

    return { error: 'Unexpected error' };
  }
};

export const auth = async () => {
  try {
    const { data } = await $host.get('api/auth/auth_web');
    return data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      return { message: error.response.data.message };
    }

    return { error: 'Unexpected error' };
  }
};

export const logOut = async () => {
  try {
    const { data } = await $host.get('api/auth/logout_web');
    return data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      return { message: error.response.data.message };
    }

    return { error: 'Unexpected error' };
  }
};
