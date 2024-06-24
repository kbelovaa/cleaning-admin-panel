import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { checkEmail, register } from '../../http/authAPI';
import { getAllCleaners } from '../../http/listsAPI';
import { setCleanersAction } from '../../store/actions/listActions';
import { knowingWays } from '../../constants/constantsList';
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';
import PhoneField from '../PhoneField/PhoneField';
import CustomSelect from '../CustomSelect/CustomSelect';
import './Registration.scss';

const Registration = () => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isEmailUnique, setIsEmailUnique] = useState('');
  const [mobile, setMobile] = useState('');
  const [isMobileValid, setIsMobileValid] = useState(true);
  const [address, setAddress] = useState('');
  const [knowingWay, setKnowingWay] = useState('');
  const [knowingWayText, setKnowingWayText] = useState('');
  const [contractCheckbox, setContractCheckbox] = useState(false);
  const [passportCheckbox, setPassportCheckbox] = useState(false);
  const [insuranceCheckbox, setInsuranceCheckbox] = useState(false);
  const [areCredentialsValid, setAreCredentialsValid] = useState('');
  const [isFormValid, setIsFormValid] = useState(true);
  const [loading, setLoading] = useState(false);

  const { t } = useTranslation();

  const location = useLocation();
  const pathname = location.pathname.split('/')[2];

  const isForm = pathname === 'form';
  const isDiscover = pathname === 'discover';
  const isSummary = pathname === 'summary';

  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    const storedCleaner = sessionStorage.getItem('cleaner');
    if (storedCleaner) {
      const cleaner = JSON.parse(storedCleaner);
      setName(cleaner.name || '');
      setSurname(cleaner.surname || '');
      setEmail(cleaner.email || '');
      setMobile(cleaner.mobile || '');
      setAddress(cleaner.address || '');
      setKnowingWay(cleaner.knowingWay || '');
      setKnowingWayText(cleaner.knowingWayText || '');
      setContractCheckbox(cleaner.contractCheckbox || false);
      setPassportCheckbox(cleaner.passportCheckbox || false);
      setInsuranceCheckbox(cleaner.insuranceCheckbox || false);
    }
  }, []);

  useEffect(() => {
    const cleaner = {
      name,
      surname,
      email,
      mobile,
      address,
      knowingWay,
      knowingWayText,
      contractCheckbox,
      passportCheckbox,
      insuranceCheckbox,
    };
    sessionStorage.setItem('cleaner', JSON.stringify(cleaner));
  }, [
    name,
    surname,
    email,
    mobile,
    address,
    knowingWay,
    knowingWayText,
    contractCheckbox,
    passportCheckbox,
    insuranceCheckbox,
  ]);

  const handleEmailChange = (email) => {
    setEmail(email);
    setIsEmailUnique('');
    setAreCredentialsValid('');

    const isEmailValid = email === '' || /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/.test(email);
    setIsEmailValid(isEmailValid);
  };

  const goBack = () => {
    if (isDiscover) {
      navigate('/register/form');
    } else if (isSummary) {
      navigate('/register/discover');
    }
    setIsFormValid(true);
  };

  const handleFormSending = async (e) => {
    e.preventDefault();

    if (isForm) {
      if (name && surname && mobile && isMobileValid && email && isEmailValid && address) {
        setLoading(true);
        const result = await checkEmail(email);
        if (result.message && result.error) {
          setIsEmailUnique(result.message);
          setIsFormValid(false);
        } else {
          navigate('/register/discover');
          setIsFormValid(true);
        }
        setLoading(false);
      } else {
        setIsFormValid(false);
      }
    } else if (isDiscover) {
      if ((knowingWay && knowingWay !== 'Other') || (knowingWay && knowingWay === 'Other' && knowingWayText)) {
        navigate('/register/summary');
        setIsFormValid(true);
      } else {
        setIsFormValid(false);
      }
    } else if (isSummary) {
      if (contractCheckbox && passportCheckbox && insuranceCheckbox) {
        setLoading(true);
        const result = await register(name, surname, email, mobile, address, knowingWay, knowingWayText);
        if (result.message && result.error) {
          setIsFormValid(false);
        } else {
          const result = await getAllCleaners();
          if (result.status === 200) {
            dispatch(setCleanersAction(result.data.cleaners.reverse()));
          }
          navigate('/cleaners');
          sessionStorage.removeItem('cleaner');
          setIsFormValid(true);
        }
        setLoading(false);
      } else {
        setIsFormValid(false);
      }
    }
  };

  const checkIsFormValid = () => {
    if (isForm) {
      if (name && surname && mobile && isMobileValid && email && isEmailValid && address) {
        return true;
      }
    } else if (isDiscover) {
      if ((knowingWay && knowingWay !== 'Other') || (knowingWay && knowingWay === 'Other' && knowingWayText)) {
        return true;
      }
    } else if (isSummary) {
      if (contractCheckbox && passportCheckbox && insuranceCheckbox) {
        return true;
      }
    }

    return false;
  };

  return (
    <div className={`registration ${isFormValid ? 'valid' : 'invalid'}`}>
      <Breadcrumbs />
      <div className="card__title-wrap">
        <svg
          className={isForm ? 'hidden' : 'card__back'}
          onClick={goBack}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path d="M21 12L3 12" stroke="#2329D6" strokeLinecap="round" />
          <path d="M9 6L3 12L9 18" stroke="#2329D6" strokeLinecap="round" />
        </svg>
        <h2 className="card__title">Registration</h2>
      </div>
      <p className="card__step">Step {isForm ? 1 : isDiscover ? 2 : 3} / 3</p>
      {isForm && (
        <div className="registration__fields">
          <div className="registration__field-wrap">
            <label htmlFor="auth-name" className="registration__label">
              {t('name')}
            </label>
            <input
              id="auth-name"
              type="text"
              className={`input ${!name ? 'invalid-field' : ''}`}
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="off"
            />
          </div>
          <div className="registration__field-wrap">
            <label htmlFor="auth-surname" className="registration__label">
              {t('surname')}
            </label>
            <input
              id="auth-surname"
              type="text"
              className={`input ${!surname ? 'invalid-field' : ''}`}
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
              autoComplete="off"
            />
          </div>
          <div className="registration__field-wrap">
            <label htmlFor="auth-email" className="registration__label">
              {t('email')}
            </label>
            <input
              id="auth-email"
              type="email"
              className={`input ${!email || !isEmailValid || isEmailUnique ? 'invalid-field' : ''}`}
              value={email}
              onChange={(e) => handleEmailChange(e.target.value)}
              autoComplete="off"
            />
            <p className={isEmailValid ? 'hidden' : 'auth__note'}>{t('validEmailMessage')}</p>
            {isEmailUnique && (
              <p className="auth__note">{`${t('userWithEmail')} ${email} ${t(
                isEmailUnique.split(email)[1].trim(),
              )}`}</p>
            )}
          </div>
          <div className="registration__field-wrap">
            <PhoneField
              mobile={mobile}
              setMobile={setMobile}
              isMobileValid={isMobileValid}
              setIsMobileValid={setIsMobileValid}
            />
          </div>
          <div className="registration__field-wrap">
            <label htmlFor="auth-address" className="registration__label">
              {t('homeAddress')}
            </label>
            <input
              id="auth-address"
              type="text"
              className={`input ${!address ? 'invalid-field' : ''}`}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              autoComplete="off"
              placeholder="Street & nr, complex, building, apt. nr"
            />
          </div>
          <p
            className={
              !isFormValid && (!name || !surname || !mobile || !email || !address)
                ? 'auth__note registration__fill'
                : 'hidden'
            }
          >
            {t('fillInAllFieldsMessage')}
          </p>
        </div>
      )}
      {isDiscover && (
        <div className="registration__fields">
          <div className="registration__field-wrap">
            <span className="registration__label">{t('howDidYouHearAboutUs')}</span>
            <CustomSelect
              options={knowingWays}
              selectedOption={knowingWay}
              setSelectedOption={setKnowingWay}
              defaultOption={'Choose'}
            />
          </div>
          {knowingWay === 'Other' && (
            <div className="registration__field-wrap">
              <label htmlFor="other-version" className="registration__label">
                {t('writeOtherVersion')}
              </label>
              <input
                id="other-version"
                type="text"
                className={`input ${!knowingWayText ? 'invalid-field' : ''}`}
                value={knowingWayText}
                onChange={(e) => setKnowingWayText(e.target.value)}
                autoComplete="off"
              />
            </div>
          )}
          <p
            className={
              !isFormValid && (!knowingWay || (knowingWay === 'Other' && !knowingWayText))
                ? 'auth__note registration__fill'
                : 'hidden'
            }
          >
            {t('fillInAllFieldsMessage')}
          </p>
        </div>
      )}
      {isSummary && (
        <div className="registration__fields">
          <div className="summary">
            <div className="summary__values">
              <span className="summary__text">Name</span>
              <span className="summary__text">Surname</span>
              <span className="summary__text">Email</span>
              <span className="summary__text">Phone number</span>
              <span className="summary__text">Address</span>
            </div>
            <div className="summary__values">
              <span className="summary__text">{name}</span>
              <span className="summary__text">{surname}</span>
              <span className="summary__text">{email}</span>
              <span className="summary__text">+{mobile}</span>
              <span className="summary__text">{address}</span>
            </div>
          </div>
          <div className="checkbox">
            <input
              id="contract"
              type="checkbox"
              checked={contractCheckbox}
              onChange={() => setContractCheckbox((state) => !state)}
            />
            <div className="checkbox__tick" onClick={() => setContractCheckbox((state) => !state)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="15" viewBox="0 0 14 15" fill="none">
                <path
                  d="M11.6667 3.96484L5.25 10.3815L2.33333 7.46484"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <label htmlFor="contract" className="checkbox__label">
              Contract
            </label>
          </div>
          <div className="checkbox">
            <input
              id="passport"
              type="checkbox"
              checked={passportCheckbox}
              onChange={() => setPassportCheckbox((state) => !state)}
            />
            <div className="checkbox__tick" onClick={() => setPassportCheckbox((state) => !state)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="15" viewBox="0 0 14 15" fill="none">
                <path
                  d="M11.6667 3.96484L5.25 10.3815L2.33333 7.46484"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <label htmlFor="passport" className="checkbox__label">
              Passport
            </label>
          </div>
          <div className="checkbox">
            <input
              id="insurance"
              type="checkbox"
              checked={insuranceCheckbox}
              onChange={() => setInsuranceCheckbox((state) => !state)}
            />
            <div className="checkbox__tick" onClick={() => setInsuranceCheckbox((state) => !state)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="15" viewBox="0 0 14 15" fill="none">
                <path
                  d="M11.6667 3.96484L5.25 10.3815L2.33333 7.46484"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <label htmlFor="insurance" className="checkbox__label">
              Insurance
            </label>
          </div>
          <p
            className={
              !isFormValid && (!contractCheckbox || !passportCheckbox || !insuranceCheckbox)
                ? 'auth__note registration__fill'
                : 'hidden'
            }
          >
            {t('fillInAllFieldsMessage')}
          </p>
        </div>
      )}
      {loading ? (
        <div className="spinner spinner_small"></div>
      ) : (
        <button className={`btn ${checkIsFormValid() ? '' : 'inactive'}`} onClick={handleFormSending}>
          {isSummary ? t('create') : t('next')}
        </button>
      )}
    </div>
  );
};

export default Registration;
