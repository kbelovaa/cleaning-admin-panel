import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { addAgent } from '../../http/authAPI';
import { getAllAgents } from '../../http/listsAPI';
import { setAgentsAction } from '../../store/actions/listActions';
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';
import PhoneField from '../PhoneField/PhoneField';

const AgentAdding = () => {
  const [name, setName] = useState('');
  const [agency, setAgency] = useState('');
  const [role, setRole] = useState('');
  const [email, setEmail] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [mobile, setMobile] = useState('');
  const [isMobileValid, setIsMobileValid] = useState(true);
  const [isFormValid, setIsFormValid] = useState(true);
  const [loading, setLoading] = useState(false);

  const { t } = useTranslation();

  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    const storedAgent = sessionStorage.getItem('agent');
    if (storedAgent) {
      const agent = JSON.parse(storedAgent);
      setName(agent.name || '');
      setAgency(agent.agency || '');
      setRole(agent.role || '');
      setEmail(agent.email || '');
      setMobile(agent.mobile || '');
    }
  }, []);

  useEffect(() => {
    const agent = {
      name,
      agency,
      role,
      email,
      mobile,
    };
    sessionStorage.setItem('agent', JSON.stringify(agent));
  }, [name, agency, role, email, mobile]);

  const handleEmailChange = (email) => {
    setEmail(email);

    const isEmailValid = email === '' || /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/.test(email);
    setIsEmailValid(isEmailValid);
  };

  const checkIsFormValid = () => {
    if (name && agency && role && ((mobile && isMobileValid) || !mobile) && ((email && isEmailValid) || !email)) {
      return true;
    }

    return false;
  };

  const handleFormSending = async (e) => {
    e.preventDefault();

    if (checkIsFormValid()) {
      setLoading(true);
      const result = await addAgent(name, agency, role, email, mobile);
      if (result.message && result.error) {
        setIsFormValid(false);
      } else {
        const result = await getAllAgents();
        if (result.status === 200) {
          dispatch(setAgentsAction(result.data.agents.reverse()));
        }
        navigate('/agents');
        sessionStorage.removeItem('agent');
        setIsFormValid(true);
      }
      setLoading(false);
    } else {
      setIsFormValid(false);
    }
  };

  return (
    <div className={`registration ${isFormValid ? 'valid' : 'invalid'}`}>
      <Breadcrumbs />
      <div className="card__title-wrap">
        <h2 className="card__title">Adding an agent</h2>
      </div>
      <div className="registration__fields">
        <div className="registration__field-wrap">
          <label htmlFor="name" className="registration__label">
            {t('name')}
          </label>
          <input
            id="name"
            type="text"
            className={`input ${!name ? 'invalid-field' : ''}`}
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="off"
          />
        </div>
        <div className="registration__field-wrap">
          <label htmlFor="agency" className="registration__label">
            {t('agency')}
          </label>
          <input
            id="agency"
            type="text"
            className={`input ${!agency ? 'invalid-field' : ''}`}
            value={agency}
            onChange={(e) => setAgency(e.target.value)}
            autoComplete="off"
          />
        </div>
        <div className="registration__field-wrap">
          <label htmlFor="role" className="registration__label">
            {t('role')}
          </label>
          <input
            id="role"
            type="text"
            className={`input ${!role ? 'invalid-field' : ''}`}
            value={role}
            onChange={(e) => setRole(e.target.value)}
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
            className={`input ${(email && !isEmailValid) || (!email && !mobile) ? 'invalid-field' : ''}`}
            value={email}
            onChange={(e) => handleEmailChange(e.target.value)}
            autoComplete="off"
          />
          <p className={isEmailValid ? 'hidden' : 'auth__note'}>{t('validEmailMessage')}</p>
        </div>
        <div className="registration__field-wrap">
          <PhoneField
            mobile={mobile}
            setMobile={setMobile}
            isMobileValid={isMobileValid}
            setIsMobileValid={setIsMobileValid}
            email={email}
          />
        </div>
        <p
          className={
            !isFormValid && (!name || !agency || !role || (!mobile && !email))
              ? 'auth__note registration__fill'
              : 'hidden'
          }
        >
          {t('fillInAllFieldsMessage')}
        </p>
      </div>
      {loading ? (
        <div className="spinner spinner_small"></div>
      ) : (
        <button className={`btn ${checkIsFormValid() ? '' : 'inactive'}`} onClick={handleFormSending}>
          {t('save')}
        </button>
      )}
    </div>
  );
};

export default AgentAdding;
