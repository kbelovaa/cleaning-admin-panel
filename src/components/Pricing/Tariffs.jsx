import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { getTimePricing, updateTimePricing } from '../../http/pricingAPI';
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';
import Table from '../Table/Table';

const Tariffs = () => {
  const [tariffs, setTariffs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [savingLoading, setSavingLoading] = useState(false);

  const { t } = useTranslation();

  const navigate = useNavigate();

  const paths = [
    { name: 'Settings', link: 'settings' },
    { name: 'Pricing', link: 'settings' },
    { name: 'Tariffs', link: 'tariffs' },
  ];

  useEffect(() => {
    const getData = async () => {
      const result = await getTimePricing();
      const tariffs = result.timePricing;
      const parsedTariffs = tariffs.map((elem) => ({
        _id: elem._id,
        tariff: `${t('tariff')} ${elem.tariffNumber}`,
        day: elem.isWeekend ? 'Non-working' : 'Working',
        startTime: elem.startTime,
        endTime: elem.endTime,
        coefficient: elem.coefficient,
      }));
      setTariffs(parsedTariffs);
      setLoading(false);
    };

    getData();
  }, []);

  const handleSavingData = async () => {
    setSavingLoading(true);
    const parsedTariffs = tariffs.map((elem) => ({
      startTime: elem.startTime,
      endTime: elem.endTime,
      isWeekend: elem.day.toLowerCase() === 'non-working',
      coefficient: Number(elem.coefficient),
      tariffNumber: Number(elem.tariff.split(' ')[1]),
    }));
    const result = await updateTimePricing(parsedTariffs);

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
          <Table
            items={tariffs}
            setItems={setTariffs}
            header={['tariff', 'day', 'timeFrom', 'timeTo', 'coefficient']}
            keys={['tariff', 'day', 'startTime', 'endTime', 'coefficient']}
          />
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

export default Tariffs;
