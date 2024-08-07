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

export const getAdjustmentJobs = async () => {
  try {
    const data = await $host.get('api/job/get_adjustment_jobs');
    return data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      return { message: error.response.data.message, error: true };
    }

    return { error: 'Unexpected error' };
  }
};

export const getCancelledJobs = async () => {
  try {
    const data = await $host.get('api/job/get_cancelled_jobs');
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

export const getContactRequests = async () => {
  try {
    const data = await $host.get('api/contact/get_requests');
    return data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      return { message: error.response.data.message, error: true };
    }

    return { error: 'Unexpected error' };
  }
};

export const getAllAgents = async () => {
  try {
    const data = await $host.get('api/agent/get_agents');
    return data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      return { message: error.response.data.message, error: true };
    }

    return { error: 'Unexpected error' };
  }
};
