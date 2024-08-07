import React, { useMemo } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Header from '../Header/Header';
import './Sidebar.scss';

const Sidebar = () => {
  const { t } = useTranslation();

  const { pathname } = useLocation();

  const isHidden = useMemo(() => {
    const regex = /^(\/customer\/|\/cleaner\/|\/cleaning\/|\/address\/|\/subscription\/|\/agent\/)/;
    return regex.test(pathname);
  }, [pathname]);

  return (
    <div className={`page ${isHidden && 'reduced'}`}>
      <div className="background"></div>
      <div className="container side">
        <div className="sidebar">
          <span className="sidebar__project">{`${t('project')}:\u00A0SDL`}</span>
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
              <ul className="sidebar__sublist">
                <li className="sidebar__item">
                  <NavLink
                    className={`sidebar__link ${pathname.startsWith('/register') ? 'active' : ''}`}
                    to="/register/form"
                  >
                    + {t('register')}
                  </NavLink>
                </li>
              </ul>
            </li>
            <li className="sidebar__item">
              <NavLink className="sidebar__link" to="/customers">
                {t('customers')}
              </NavLink>
            </li>
            <li className="sidebar__item">
              <NavLink className="sidebar__link" to="/requests">
                {t('requests')}
              </NavLink>
              <ul className="sidebar__sublist">
                <li className="sidebar__item">
                  <NavLink className="sidebar__link" to="/unconfirmed_requests">
                    {t('unconfirmed')}
                  </NavLink>
                </li>
                <li className="sidebar__item">
                  <NavLink className="sidebar__link" to="/cancelled_requests">
                    {t('cancelled')}
                  </NavLink>
                </li>
              </ul>
            </li>
            <li className="sidebar__item">
              <NavLink className="sidebar__link" to="/jobs">
                {t('jobs')}
              </NavLink>
              <ul className="sidebar__sublist">
                <li className="sidebar__item">
                  <NavLink className="sidebar__link" to="/adjustments">
                    {t('adjustments')}
                  </NavLink>
                </li>
                <li className="sidebar__item">
                  <NavLink className="sidebar__link" to="/cancelled_jobs">
                    {t('cancelled')}
                  </NavLink>
                </li>
              </ul>
            </li>
            <li className="sidebar__item">
              <NavLink className="sidebar__link" to="/contact_requests">
                {t('contactRequests')}
              </NavLink>
            </li>
            <li className="sidebar__item">
              <NavLink className="sidebar__link" to="/agents">
                {t('agents')}
              </NavLink>
              <ul className="sidebar__sublist">
                <li className="sidebar__item">
                  <NavLink
                    className={`sidebar__link ${pathname.startsWith('/add_agent') ? 'active' : ''}`}
                    to="/add_agent"
                  >
                    + {t('add')}
                  </NavLink>
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <div className={`content ${isHidden && 'expanded'}`}>
          <Header />
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
