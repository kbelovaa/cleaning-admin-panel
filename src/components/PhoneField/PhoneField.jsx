import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import PhoneInput from 'react-phone-input-2';
import { isValidNumber } from 'libphonenumber-js';
import 'react-phone-input-2/lib/style.css';
import './PhoneField.scss';

const PhoneField = ({ mobile, setMobile, isMobileValid, setIsMobileValid, email }) => {
  const ipCountry = useSelector((state) => state.user.ipCountry);

  const { t } = useTranslation();

  const handleMobileChange = (value, country) => {
    setMobile(value);
    if (country.countryCode) {
      const phoneNumber = value === '' || isValidNumber(value, country.countryCode.toUpperCase());
      setIsMobileValid(!!phoneNumber);
    }
  };

  return (
    <div className="phone-field">
      <label htmlFor="mobile" className="registration__label">
        {t('mobile')}
      </label>
      <PhoneInput
        value={mobile}
        onChange={handleMobileChange}
        country={ipCountry}
        enableSearch={true}
        inputClass={`${!ipCountry && !mobile ? 'default' : ''} ${(mobile && !isMobileValid) || (!mobile && !email) ? 'invalid-field' : ''}`}
        buttonClass={`${!ipCountry && !mobile ? 'hidden' : ''} ${(mobile && !isMobileValid) || (!mobile && !email) ? 'invalid-field' : ''}`}
        autoFormat
      />
      <p className={isMobileValid ? 'hidden' : 'auth__note'}>{t('validMobileMessage')}</p>
    </div>
  );
};

export default PhoneField;
