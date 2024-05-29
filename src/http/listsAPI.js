import $host from './index';

export const getAllCleaners = async () => {
  try {
    const data = await $host.get('api/profile/get_cleaners');
    return data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      return { message: error.response.data.message, error: true };
    }

    return { error: 'Unexpected error' };
  }
};

export const getAllCustomers = async () => {
  try {
    const data = await $host.get('api/profile/get_customers');
    return data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      return { message: error.response.data.message, error: true };
    }

    return { error: 'Unexpected error' };
  }
};
