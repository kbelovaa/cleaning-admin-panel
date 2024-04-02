import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import settingsIcon from '../../images/settings.svg';
import exitIcon from '../../images/exit.svg';
import { logOut } from '../../http/authAPI';
import { setIsAuthAction, setUserAction } from '../../store/actions/userActions';
import './Header.scss';

const Header = () => {
  const user = useSelector((state) => state.user);

  const [isLanguageOpened, setIsLanguageOpened] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { t, i18n } = useTranslation();
  const { language } = i18n;
  const availableLanguages = Object.keys(i18n.options.resources);

  const lngRef = useRef(null);
  const settingsRef = useRef(null);
  const settingsIconRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (lngRef.current && !lngRef.current.contains(e.target)) {
        setIsLanguageOpened(false);
      }
    };

    if (isLanguageOpened) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isLanguageOpened]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        settingsRef.current &&
        !settingsRef.current.contains(e.target) &&
        settingsIconRef.current &&
        !settingsIconRef.current.contains(e.target)
      ) {
        setIsSettingsOpen(false);
      }
    };

    if (isSettingsOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSettingsOpen]);

  const openLanguages = () => {
    setIsLanguageOpened((state) => !state);
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('language', lng);
    document.documentElement.lang = lng;
    setIsLanguageOpened(false);
  };

  const openSettings = () => {
    setIsSettingsOpen((state) => !state);
  };

  const handleSettingsClick = () => {
    setIsSettingsOpen(false);
    navigate('/settings');
  };

  const handleLogOut = () => {
    setIsSettingsOpen(false);
    logOut();
    dispatch(setIsAuthAction(false));
    dispatch(
      setUserAction({
        id: '',
        name: '',
        surname: '',
        email: '',
        role: '',
      }),
    );
    navigate('/');
  };

  return (
    <header id="header" className="header-section">
      <div className="container head">
        <div className="header">
          <nav className="header__menu">
            {/* <div className="language-wrap">
              <div className={`language ${isLanguageOpened ? 'opened' : ''}`} ref={lngRef}>
                <div className="language__selected" onClick={openLanguages}>
                  <span className="language__value">{language}</span>
                  <svg
                    className="language__arrow"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path d="M6 9L12 15L18 9" stroke="#B0B0B0" strokeLinecap="round" />
                  </svg>
                </div>
                <div className="language__variants">
                  {availableLanguages.map((elem, index) => (
                    <span
                      key={index}
                      className={`language__value ${elem !== language ? 'not-selected' : ''}`}
                      onClick={() => changeLanguage(elem)}
                    >
                      {elem}
                    </span>
                  ))}
                </div>
              </div>
            </div> */}
            <div className="settings-modal__icon icon" ref={settingsIconRef} onClick={openSettings}>
              <img src={settingsIcon} alt="Settings" />
            </div>
            <div ref={settingsRef} className={isSettingsOpen ? 'settings-modal__window' : 'hidden'}>
              <ul className="settings-modal__list">
                <li className="settings-modal__item" onClick={handleSettingsClick}>
                  <img src={settingsIcon} alt="Settings" />
                  <span className="settings-modal__label">{t('settings')}</span>
                </li>
                <li className="settings-modal__item" onClick={handleLogOut}>
                  <img src={exitIcon} alt="Settings" />
                  <span className="settings-modal__label">{t('logOut')}</span>
                </li>
              </ul>
              <span className="settings-modal__account">
                {`${user.name.charAt(0).toUpperCase() + user.name.slice(1).toLowerCase()} ${
                  user.surname.charAt(0).toUpperCase() + user.surname.slice(1).toLowerCase()
                }`}
              </span>
              <span className="settings-modal__role">{t('administrator')}</span>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
