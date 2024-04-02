import React from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { pricingList } from '../../constants/settingsList';
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';
import './Settings.scss';

const Settings = () => {
  const { t } = useTranslation();

  const paths = [{ name: 'Settings', link: 'settings' }];

  return (
    <div className="settings">
      <Breadcrumbs paths={paths} />
      <div className="settings__wrap">
        <div className="settings__block">
          <h3 className="settings__subtitle">{t('pricing')}</h3>
          <ul className="settings__list">
            {pricingList.map((setting, index) => (
              <li className="settings__link" key={index}>
                <NavLink to={`/${setting.link}`}>{t(setting.name)}</NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Settings;
