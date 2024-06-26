import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { getCleaningTypes, updateCleaningTypes } from '../../http/pricingAPI';
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';
import Table from '../Table/Table';

const CleaningTypes = () => {
  const [cleaningTypes, setCleaningTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [savingLoading, setSavingLoading] = useState(false);

  const navigate = useNavigate();

  const { t } = useTranslation();

  useEffect(() => {
    const getData = async () => {
      const result = await getCleaningTypes();
      setCleaningTypes(result.serviceTypes);
      setLoading(false);
    };

    getData();
  }, []);

  const handleSavingData = async () => {
    setSavingLoading(true);
    const orderedCleaningTypes = cleaningTypes.map((elem, i) => ({ ...elem, order: i + 1 }));
    const result = await updateCleaningTypes(orderedCleaningTypes);

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
            items={cleaningTypes}
            setItems={setCleaningTypes}
            header={['Type of cleanings', 'bacisPrice']}
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

export default CleaningTypes;
