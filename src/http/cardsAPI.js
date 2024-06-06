import $host from './index';

export const getCustomer = async (id) => {
  try {
    const data = await $host.get(`api/profile/get_customer_info/${id}`);
    return data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      return { message: error.response.data.message, error: true };
    }

    return { error: 'Unexpected error' };
  }
};
