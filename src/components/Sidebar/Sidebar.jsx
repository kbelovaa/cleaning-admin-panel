import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Header from '../Header/Header';
import './Sidebar.scss';

const Sidebar = () => {
  const { t } = useTranslation();

  return (
    <div className="page">
      <div className="background"></div>
      <div className="container side">
        <div className="sidebar">
          <span className="sidebar__project">{`${t('project')}: SDL`}</span>
          <ul className="sidebar__list">
            <li className="sidebar__item">
              <NavLink className="sidebar__link" to="/">
                {t('home')}
              </NavLink>
            </li>
            <li className="sidebar__item">
              <NavLink className="sidebar__link" to="/cleaners">
                {t('cleaners')}
              </NavLink>
            </li>
            <li className="sidebar__item">
              <NavLink className="sidebar__link" to="/customers">
                {t('customers')}
              </NavLink>
            </li>
            <li className="sidebar__item">
              <NavLink className="sidebar__link" to="/addresses">
                {t('addresses')}
              </NavLink>
            </li>
            <li className="sidebar__item">
              <NavLink className="sidebar__link" to="/jobs">
                {t('jobs')}
              </NavLink>
              <ul className="sidebar__sublist">
                <li className="sidebar__item">
                  <NavLink className="sidebar__link" to="/jobs_needing_adjustment">
                    {t('needingAdjustment')}
                  </NavLink>
                </li>
                <li className="sidebar__item">
                  <NavLink className="sidebar__link" to="/jobs_cancelled">
                    {t('cancelled')}
                  </NavLink>
                </li>
              </ul>
            </li>
            <li className="sidebar__item">
              <NavLink className="sidebar__link" to="/requests">
                {t('requests')}
              </NavLink>
              <ul className="sidebar__sublist">
                <li className="sidebar__item">
                  <NavLink className="sidebar__link" to="/requests_unconfirmed">
                    {t('unconfirmed')}
                  </NavLink>
                </li>
                <li className="sidebar__item">
                  <NavLink className="sidebar__link" to="/requests_cancelled">
                    {t('cancelled')}
                  </NavLink>
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <div className="content">
          <Header />
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
