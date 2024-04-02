import $host from './index';

// cleaning types
export const getCleaningTypes = async () => {
  try {
    const { data } = await $host.get('api/services/get_service_types');
    return data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      return { message: error.response.data.message, error: true };
    }

    return { error: 'Unexpected error' };
  }
};

export const updateCleaningTypes = async (serviceTypes) => {
  try {
    const data = await $host.put('api/services/update_service_types', { serviceTypes });
    return data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      return { message: error.response.data.message, error: true };
    }

    return { error: 'Unexpected error' };
  }
};

// extra services

export const getExtraServices = async () => {
  try {
    const { data } = await $host.get('api/services/get_extra_services');
    return data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      return { message: error.response.data.message, error: true };
    }

    return { error: 'Unexpected error' };
  }
};

export const updateExtraServices = async (extraServices) => {
  try {
    const data = await $host.put('api/services/update_extra_services', { extraServices });
    return data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      return { message: error.response.data.message, error: true };
    }

    return { error: 'Unexpected error' };
  }
};

// sqm size pricing

export const getSqmSizePricing = async () => {
  try {
    const { data } = await $host.get('api/pricing/get_sqm_size_pricing');
    return data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      return { message: error.response.data.message, error: true };
    }

    return { error: 'Unexpected error' };
  }
};

export const updateSqmSizePricing = async (sqmSizePricing) => {
  try {
    const data = await $host.put('api/pricing/update_sqm_size_pricing', { sqmSizePricing });
    return data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      return { message: error.response.data.message, error: true };
    }

    return { error: 'Unexpected error' };
  }
};

// cleaning size pricing

export const getCleaningSizePricing = async () => {
  try {
    const { data } = await $host.get('api/pricing/get_cleaning_size_pricing');
    return data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      return { message: error.response.data.message, error: true };
    }

    return { error: 'Unexpected error' };
  }
};

export const updateCleaningSizePricing = async (cleaningSizePricing) => {
  try {
    const data = await $host.put('api/pricing/update_cleaning_size_pricing', { cleaningSizePricing });
    return data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      return { message: error.response.data.message, error: true };
    }

    return { error: 'Unexpected error' };
  }
};

// time pricing

export const getTimePricing = async () => {
  try {
    const { data } = await $host.get('api/pricing/get_time_pricing');
    return data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      return { message: error.response.data.message, error: true };
    }

    return { error: 'Unexpected error' };
  }
};

export const updateTimePricing = async (timePricing) => {
  try {
    const data = await $host.put('api/pricing/update_time_pricing', { timePricing });
    return data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      return { message: error.response.data.message, error: true };
    }

    return { error: 'Unexpected error' };
  }
};

// property pricing

export const getPropertyPricing = async () => {
  try {
    const { data } = await $host.get('api/pricing/get_property_pricing');
    return data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      return { message: error.response.data.message, error: true };
    }

    return { error: 'Unexpected error' };
  }
};

export const updatePropertyPricing = async (bedroomPrice, bathroomPrice, kitchenPrice) => {
  try {
    const data = await $host.put('api/pricing/update_property_pricing', { bedroomPrice, bathroomPrice, kitchenPrice });
    return data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      return { message: error.response.data.message, error: true };
    }

    return { error: 'Unexpected error' };
  }
};

// speed pricing

export const getSpeedPricing = async () => {
  try {
    const { data } = await $host.get('api/pricing/get_speed_pricing');
    return data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      return { message: error.response.data.message, error: true };
    }

    return { error: 'Unexpected error' };
  }
};

export const updateSpeedPricing = async (coefficientX1, coefficientX2, coefficientX3) => {
  try {
    const data = await $host.put('api/pricing/update_speed_pricing', { coefficientX1, coefficientX2, coefficientX3 });
    return data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      return { message: error.response.data.message, error: true };
    }

    return { error: 'Unexpected error' };
  }
};

// holidays

export const getHolidays = async () => {
  try {
    const { data } = await $host.get('api/pricing/get_holidays');
    return data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      return { message: error.response.data.message, error: true };
    }

    return { error: 'Unexpected error' };
  }
};

export const updateHolidays = async (holidays) => {
  try {
    const data = await $host.put('api/pricing/update_holidays', { holidays });
    return data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      return { message: error.response.data.message, error: true };
    }

    return { error: 'Unexpected error' };
  }
};

// salary

export const getSalaryCoeffs = async () => {
  try {
    const { data } = await $host.get('api/pricing/get_salary_coeffs');
    return data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      return { message: error.response.data.message, error: true };
    }

    return { error: 'Unexpected error' };
  }
};

export const updateSalaryCoeffs = async (orderTaxPercent, feePercent, socialSecurityPercent) => {
  try {
    const data = await $host.put('api/pricing/update_salary_coeffs', {
      orderTaxPercent,
      feePercent,
      socialSecurityPercent,
    });
    return data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      return { message: error.response.data.message, error: true };
    }

    return { error: 'Unexpected error' };
  }
};
