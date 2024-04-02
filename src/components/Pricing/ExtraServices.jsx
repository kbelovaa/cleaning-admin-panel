import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getExtraServices, updateExtraServices } from '../../http/pricingAPI';
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';
import Table from '../Table/Table';

const ExtraServices = () => {
  const [extraServices, setExtraServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [savingLoading, setSavingLoading] = useState(false);

  const navigate = useNavigate();

  const { t } = useTranslation();

  const paths = [
    { name: 'Settings', link: 'settings' },
    { name: 'Pricing', link: 'settings' },
    { name: 'Extra services', link: 'extra_services' },
  ];

  useEffect(() => {
    const getData = async () => {
      const result = await getExtraServices();
      setExtraServices(result.extraServices);
      setLoading(false);
    };

    getData();
  }, []);

  const handleSavingData = async () => {
    setSavingLoading(true);
    const result = await updateExtraServices(extraServices);

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
            items={extraServices}
            setItems={setExtraServices}
            header={['extraService', 'priceEur']}
            keys={['type', 'price']}
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

export default ExtraServices;
