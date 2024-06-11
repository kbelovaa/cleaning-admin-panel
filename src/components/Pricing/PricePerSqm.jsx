import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { getSqmSizePricing, updateSqmSizePricing } from '../../http/pricingAPI';
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';
import Table from '../Table/Table';

const PricePerSqm = () => {
  const [pricesPerSqm, setPricesPerSqm] = useState([]);
  const [loading, setLoading] = useState(true);
  const [savingLoading, setSavingLoading] = useState(false);

  const navigate = useNavigate();

  const { t } = useTranslation();

  useEffect(() => {
    const getData = async () => {
      const result = await getSqmSizePricing();
      const pricesPerSqm = result.sqmSizePricing;
      setPricesPerSqm(pricesPerSqm.map((elem) => ({ ...elem, rangeEnd: elem.rangeEnd ? elem.rangeEnd : '+' })));
      setLoading(false);
    };

    getData();
  }, []);

  const handleSavingData = async () => {
    setSavingLoading(true);
    const orderedPricesPerSqm = pricesPerSqm.map((elem, i) => ({ ...elem, order: i + 1 }));
    const result = await updateSqmSizePricing(orderedPricesPerSqm);

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
            items={pricesPerSqm}
            setItems={setPricesPerSqm}
            header={['apartmentSizeFrom', 'apartmentSizeTo', 'eurPerSqm']}
            keys={['rangeStart', 'rangeEnd', 'coefficient']}
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

export default PricePerSqm;
