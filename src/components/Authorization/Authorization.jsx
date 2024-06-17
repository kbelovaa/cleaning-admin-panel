import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { setIsAuthAction, setUserAction } from '../../store/actions/userActions';
import { signIn } from '../../http/authAPI';
import './Authorization.scss';

const Authorization = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [areCredentialsValid, setAreCredentialsValid] = useState('');
  const [isFormValid, setIsFormValid] = useState(true);
  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { t } = useTranslation();

  const handleAuth = (result) => {
    dispatch(setIsAuthAction(true));
    dispatch(setUserAction(result));
    navigate('/home');
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (email && password) {
      setLoading(true);
      const result = await signIn(email.toLowerCase(), password);
      if (result.message) {
        setAreCredentialsValid(result.message);
        setIsFormValid(false);
        setLoading(false);
      } else {
        setLoading(false);
        handleAuth(result);
      }
    } else {
      setIsFormValid(false);
    }
  };

  const handleEmailChange = (email) => {
    setEmail(email);
    setAreCredentialsValid('');
  };

  const handlePasswordChange = (password) => {
    setPassword(password);
    setAreCredentialsValid('');
  };

  const checkIsFormValid = () => {
    if (email && password) {
      return true;
    }

    return false;
  };

  return (
    <div className="container">
      <div className="auth">
        <h1 className="auth__title">{t('logIn')}</h1>
        <form className={`form ${isFormValid ? 'valid' : 'invalid'}`} onSubmit={handleFormSubmit}>
          <div className="form__fields">
            <div className="form__field-wrap">
              <label htmlFor="auth-email" className="form__label">
                {t('email')}
              </label>
              <input
                id="auth-email"
                type="text"
                className={`input ${
                  !email || (areCredentialsValid !== '' && areCredentialsValid !== 'Incorrect password')
                    ? 'invalid-field'
                    : ''
                }`}
                value={email}
                onChange={(e) => handleEmailChange(e.target.value)}
                autoComplete="off"
              />
            </div>
            <div className="form__field-wrap">
              <label htmlFor="auth-password" className="form__label">
                {t('password')}
              </label>
              <input
                id="auth-password"
                type={showPassword ? 'text' : 'password'}
                className={`input ${!password || areCredentialsValid === 'Incorrect password' ? 'invalid-field' : ''}`}
                value={password}
                onChange={(e) => handlePasswordChange(e.target.value)}
                autoComplete="off"
              />
              {areCredentialsValid && (
                <p className="auth__note">
                  {areCredentialsValid === 'Incorrect password'
                    ? t('incorrectPassword')
                    : `${t('userWithEmail')} ${email} ${t(areCredentialsValid.split(email)[1].trim())}`}
                </p>
              )}
              <p className={!isFormValid && (!email || !password) ? 'auth__note' : 'hidden'}>
                {t('fillInAllFieldsMessage')}
              </p>
              <span className={showPassword ? 'hidden' : 'form__eye'} onClick={() => setShowPassword(true)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="26" viewBox="0 0 25 26" fill="none">
                  <path
                    d="M7 16L5.5 18M20.5 13C19.8612 14.0647 19.041 15.1294 18.0008 16.001M18.0008 16.001C16.5985 17.176 14.7965 18 12.5 18M18.0008 16.001L18 16M18.0008 16.001L19.5 18M12.5 18C8.5 18 6 15.5 4.5 13M12.5 18V20.5M15.5 17.5L16.5 20M9.5 17.5L8.5 20"
                    stroke="#101112"
                    strokeWidth="1.2"
                  />
                </svg>
              </span>
              <span className={showPassword ? 'form__eye' : 'hidden'} onClick={() => setShowPassword(false)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="26" viewBox="0 0 25 26" fill="none">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M5.20513 13C6.66296 15.2936 8.9567 17.4 12.5 17.4C16.0433 17.4 18.3371 15.2936 19.7949 13C18.3371 10.7065 16.0433 8.60002 12.5 8.60002C8.9567 8.60002 6.66296 10.7065 5.20513 13ZM3.98551 12.6913C5.53974 10.101 8.20179 7.40002 12.5 7.40002C16.7982 7.40002 19.4603 10.101 21.0145 12.6913L21.1997 13L21.0145 13.3087C19.4603 15.8991 16.7982 18.6 12.5 18.6C8.20179 18.6 5.53974 15.8991 3.98551 13.3087L3.80029 13L3.98551 12.6913ZM12.5 9.90002C10.7879 9.90002 9.4 11.2879 9.4 13C9.4 14.7121 10.7879 16.1 12.5 16.1C14.2121 16.1 15.6 14.7121 15.6 13C15.6 11.2879 14.2121 9.90002 12.5 9.90002Z"
                    fill="#101112"
                  />
                </svg>
              </span>
            </div>
          </div>
          {loading ? (
            <div className="spinner spinner_small"></div>
          ) : (
            <button className={`btn ${checkIsFormValid() ? '' : 'inactive'}`} type="submit">
              {t('logIn')}
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default Authorization;
