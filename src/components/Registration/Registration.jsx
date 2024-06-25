import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { checkEmail, register } from '../../http/authAPI';
import { getAllCleaners } from '../../http/listsAPI';
import { setCleanersAction } from '../../store/actions/listActions';
import { knowingWays, levels } from '../../constants/constantsList';
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
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [level, setLevel] = useState('');
  const [comment, setComment] = useState('');
  const [contractCheckbox, setContractCheckbox] = useState(false);
  const [passportCheckbox, setPassportCheckbox] = useState(false);
  const [insuranceCheckbox, setInsuranceCheckbox] = useState(false);
  const [knowingWay, setKnowingWay] = useState('');
  const [knowingWayText, setKnowingWayText] = useState('');
  const [isFormValid, setIsFormValid] = useState(true);
  const [loading, setLoading] = useState(false);

  const { t } = useTranslation();

  const location = useLocation();
  const pathname = location.pathname.split('/')[2];

  const isForm = pathname === 'form';
  const isSummary = pathname === 'summary';
  const isDiscover = pathname === 'discover';

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
      setAddress1(cleaner.address1 || '');
      setAddress2(cleaner.address2 || '');
      setLevel(cleaner.level || '');
      setComment(cleaner.comment || '');
      setContractCheckbox(cleaner.contractCheckbox || false);
      setPassportCheckbox(cleaner.passportCheckbox || false);
      setInsuranceCheckbox(cleaner.insuranceCheckbox || false);
      setKnowingWay(cleaner.knowingWay || '');
      setKnowingWayText(cleaner.knowingWayText || '');
    }
  }, []);

  useEffect(() => {
    const cleaner = {
      name,
      surname,
      email,
      mobile,
      address1,
      address2,
      level,
      comment,
      contractCheckbox,
      passportCheckbox,
      insuranceCheckbox,
      knowingWay,
      knowingWayText,
    };
    sessionStorage.setItem('cleaner', JSON.stringify(cleaner));
  }, [
    name,
    surname,
    email,
    mobile,
    address1,
    address2,
    level,
    comment,
    contractCheckbox,
    passportCheckbox,
    insuranceCheckbox,
    knowingWay,
    knowingWayText,
  ]);

  const handleEmailChange = (email) => {
    setEmail(email);
    setIsEmailUnique('');

    const isEmailValid = email === '' || /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/.test(email);
    setIsEmailValid(isEmailValid);
  };

  const goBack = () => {
    if (isSummary) {
      navigate('/register/form');
    } else if (isDiscover) {
      navigate('/register/summary');
    }
    setIsFormValid(true);
  };

  const checkIsFormValid = () => {
    if (isForm) {
      if (name && surname && mobile && isMobileValid && email && isEmailValid && address1 && level) {
        return true;
      }
    } else if (isSummary) {
      if (name && surname && mobile && isMobileValid && email && isEmailValid && address1 && level && contractCheckbox && passportCheckbox && insuranceCheckbox) {
        return true;
      }
    } else if (isDiscover) {
      if (name && surname && mobile && isMobileValid && email && isEmailValid && address1 && level && contractCheckbox && passportCheckbox && insuranceCheckbox && ((knowingWay && knowingWay !== 'Other') || (knowingWay && knowingWay === 'Other' && knowingWayText))) {
        return true;
      }
    }

    return false;
  };

  const handleFormSending = async (e) => {
    e.preventDefault();

    if (isForm) {
      if (checkIsFormValid()) {
        setLoading(true);
        const result = await checkEmail(email);
        if (result.message && result.error) {
          setIsEmailUnique(result.message);
          setIsFormValid(false);
        } else {
          navigate('/register/summary');
          setIsFormValid(true);
        }
        setLoading(false);
      } else {
        setIsFormValid(false);
      }
    } else if (isSummary) {
      if (checkIsFormValid()) {
        navigate('/register/discover');
        setIsFormValid(true);
      } else {
        setIsFormValid(false);
      }
    } else if (isDiscover) {
      if (checkIsFormValid()) {
        setLoading(true);
        const result = await register(
          name,
          surname,
          email,
          mobile,
          address1,
          address2,
          level,
          comment,
          knowingWay,
          knowingWayText,
        );
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
      <p className="card__step">Step {isForm ? 1 : isSummary ? 2 : 3} / 3</p>
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
            <label htmlFor="auth-address1" className="registration__label">
              {t('homeAddress')}
            </label>
            <input
              id="auth-address1"
              type="text"
              className={`input registration__address ${!address1 ? 'invalid-field' : ''}`}
              value={address1}
              onChange={(e) => setAddress1(e.target.value)}
              autoComplete="off"
              placeholder="Streetname and number"
            />
            <input
              id="auth-address2"
              type="text"
              className="input"
              value={address2}
              onChange={(e) => setAddress2(e.target.value)}
              autoComplete="off"
              placeholder="Complex, building, apt. nr"
            />
          </div>
          <div className="registration__field-wrap small">
            <span className="registration__label">{t('level')}</span>
            <CustomSelect
              options={levels}
              selectedOption={level}
              setSelectedOption={setLevel}
              defaultOption={'Choose'}
            />
          </div>
          <div className="registration__field-wrap">
            <label htmlFor="auth-comment" className="registration__label">
              {t('comment')}
            </label>
            <input
              id="auth-comment"
              type="text"
              className="input"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              autoComplete="off"
            />
          </div>
          <p
            className={
              !isFormValid && (!name || !surname || !mobile || !email || !address1 || !level)
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
              <span className="summary__text">Home address</span>
              <span className="summary__text">Level</span>
              <span className="summary__text">Comment</span>
            </div>
            <div className="summary__values">
              <span className="summary__text">{name}</span>
              <span className="summary__text">{surname}</span>
              <span className="summary__text">{email}</span>
              <span className="summary__text">+{mobile}</span>
              <span className="summary__text">{`${address1}${address2 ? `, ${address2}` : ''}`}</span>
              <span className="summary__text">{level}</span>
              <span className="summary__text">{comment || '-'}</span>
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
      {loading ? (
        <div className="spinner spinner_small"></div>
      ) : (
        <button className={`btn ${checkIsFormValid() ? '' : 'inactive'}`} onClick={handleFormSending}>
          {isDiscover ? t('save') : t('next')}
        </button>
      )}
    </div>
  );
};

export default Registration;
