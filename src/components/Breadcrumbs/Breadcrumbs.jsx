import React from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import './Breadcrumbs.scss';

const Breadcrumbs = ({ paths }) => {
  const { t } = useTranslation();

  return (
    <div className="breadcrumbs">
      {paths.map((path, index) => (
        <span className="breadcrumbs__item" key={index}>
          {index > 0 && (
            <svg
              className="breadcrumbs__icon"
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
            >
              <path d="M5 9L8 6L5 3" stroke="#C8C8C8" strokeWidth="0.5" strokeLinecap="round" />
            </svg>
          )}
          <NavLink to={`/${path.link}`}>{t(path.name)}</NavLink>
        </span>
      ))}
    </div>
  );
};

export default Breadcrumbs;
