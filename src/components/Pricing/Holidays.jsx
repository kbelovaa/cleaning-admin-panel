import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getHolidays, updateHolidays } from '../../http/pricingAPI';
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';
import Table from '../Table/Table';

const Holidays = () => {
  const [holidays, setHolidays] = useState([]);
  const [loading, setLoading] = useState(true);
  const [savingLoading, setSavingLoading] = useState(false);

  const navigate = useNavigate();

  const { t } = useTranslation();

  const paths = [
    { name: 'Settings', link: 'settings' },
    { name: 'Pricing', link: 'settings' },
    { name: 'Holidays', link: 'holidays' },
  ];

  useEffect(() => {
    const getData = async () => {
      const result = await getHolidays();
      setHolidays(result.holidays);
      setLoading(false);
    };

    getData();
  }, []);

  const handleSavingData = async () => {
    setSavingLoading(true);
    const result = await updateHolidays(holidays);

    if (result.status === 201) {
      setSavingLoading(false);
      navigate('/settings');
    }
  };

  return (
    <div className="settings">
      <Breadcrumbs paths={paths} />
      {loading ? (
        <div className="spinner"></div>
      ) : (
        <div>
          <Table items={holidays} setItems={setHolidays} header={['holiday', 'date']} keys={['holiday', 'date']} />
          {savingLoading ? (
            <div className="spinner spinner_small"></div>
          ) : (
            <button className="btn pricing__btn" onClick={handleSavingData}>
              {t('save')}
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Holidays;
