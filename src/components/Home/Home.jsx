import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import './Home.scss';

const Home = () => {
  const user = useSelector((state) => state.user);

  const { t } = useTranslation();

  return (
    <div className="home">
      <h2 className="home__title">{`${t('welcome')}, ${
        user.name.charAt(0).toUpperCase() + user.name.slice(1).toLowerCase()
      }!`}</h2>
    </div>
  );
};

export default Home;
