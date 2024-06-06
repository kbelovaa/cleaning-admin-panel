import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getSpeedPricing, updateSpeedPricing } from '../../http/pricingAPI';
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';
import Table from '../Table/Table';

const HowQuickly = () => {
  const [speedPricing, setSpeedPricing] = useState([]);
  const [loading, setLoading] = useState(true);
  const [savingLoading, setSavingLoading] = useState(false);

  const navigate = useNavigate();

  const { t } = useTranslation();

  useEffect(() => {
    const getData = async () => {
      const result = await getSpeedPricing();
      const parsedPricing = [
        { _id: '1', type: 'Basic', coefficient: result.coefficientX1 },
        { _id: '2', type: 'Double time', coefficient: result.coefficientX2 },
        { _id: '3', type: 'ASAP', coefficient: result.coefficientX3 },
      ];
      setSpeedPricing(parsedPricing);
      setLoading(false);
    };

    getData();
  }, []);

  const findCoeff = (value) => speedPricing.find((elem) => elem.type === value).coefficient;

  const handleSavingData = async () => {
    setSavingLoading(true);
    const result = await updateSpeedPricing(findCoeff('Basic'), findCoeff('Double time'), findCoeff('ASAP'));

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
            items={speedPricing}
            setItems={setSpeedPricing}
            header={['howQuickly', 'coefficient']}
            keys={['type', 'coefficient']}
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

export default HowQuickly;
