import $host from './index';

export const signUp = async (name, surname, email, password, role = 'admin') => {
  try {
    const { data } = await $host.post('api/auth/signup_web', { name, surname, email, password, role });
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
