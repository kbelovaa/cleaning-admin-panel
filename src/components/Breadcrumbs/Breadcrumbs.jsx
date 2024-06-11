import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import HistoryContext from '../../utils/HistoryContext';
import './Breadcrumbs.scss';

const Breadcrumbs = () => {
  const { t } = useTranslation();

  const history = useContext(HistoryContext);

  return (
    <div className="breadcrumbs">
      {history.map((path, index) => {
        const link = path.split('/')[1].replace(/_/g, ' ');
        const linkName = link.charAt(0).toUpperCase() + link.slice(1);
        return (
          <span className="breadcrumbs__item" key={index}>
            {index > 0 && (
              <svg
                className="breadcrumbs__icon"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path d="M9 19L15 13L9 7" stroke="#D8D8D8" strokeLinecap="round" />
              </svg>
            )}
            <NavLink to={`${path}`}>{t(linkName)}</NavLink>
          </span>
        );
      })}
    </div>
  );
};

export default Breadcrumbs;
