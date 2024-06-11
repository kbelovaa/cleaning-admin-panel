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
    const orderedExtraServices = extraServices.map((elem, i) => ({ ...elem, order: i + 1 }));
    const result = await updateExtraServices(orderedExtraServices);

    if (result.status === 201) {
      setSavingLoading(false);
      navigate('/settings');
    }
  };

  return (
    <div className="settings">
      <Breadcrumbs />
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
