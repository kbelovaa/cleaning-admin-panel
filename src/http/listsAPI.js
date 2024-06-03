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

export const getAllAddresses = async () => {
  try {
    const data = await $host.get('api/address/get_all_addresses');
    return data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      return { message: error.response.data.message, error: true };
    }

    return { error: 'Unexpected error' };
  }
};

export const getAllJobs = async () => {
  try {
    const data = await $host.get('api/job/get_all_jobs_admin');
    return data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      return { message: error.response.data.message, error: true };
    }

    return { error: 'Unexpected error' };
  }
};

export const getAllOrders = async () => {
  try {
    const data = await $host.get('api/order/get_all_orders');
    return data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      return { message: error.response.data.message, error: true };
    }

    return { error: 'Unexpected error' };
  }
};

export const getCancelledOrders = async () => {
  try {
    const data = await $host.get('api/order/get_cancelled_orders');
    return data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      return { message: error.response.data.message, error: true };
    }

    return { error: 'Unexpected error' };
  }
};
