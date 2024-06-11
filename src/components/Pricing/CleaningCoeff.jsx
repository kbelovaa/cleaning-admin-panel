import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getCleaningSizePricing, updateCleaningSizePricing } from '../../http/pricingAPI';
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';
import Table from '../Table/Table';

const CleaningCoeff = () => {
  const [cleaningCoeffs, setCleaningCoeffs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [savingLoading, setSavingLoading] = useState(false);

  const navigate = useNavigate();

  const { t } = useTranslation();

  useEffect(() => {
    const getData = async () => {
      const result = await getCleaningSizePricing();
      const cleaningCoeffs = result.cleaningSizePricing;
      setCleaningCoeffs(cleaningCoeffs.map((elem) => ({ ...elem, rangeEnd: elem.rangeEnd ? elem.rangeEnd : '+' })));
      setLoading(false);
    };

    getData();
  }, []);

  const handleSavingData = async () => {
    setSavingLoading(true);
    const orderedCleaningCoeffs = cleaningCoeffs.map((elem, i) => ({ ...elem, order: i + 1 }));
    const result = await updateCleaningSizePricing(orderedCleaningCoeffs);

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
            items={cleaningCoeffs}
            setItems={setCleaningCoeffs}
            header={['apartmentSizeFrom', 'apartmentSizeTo', 'coefficient']}
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

export default CleaningCoeff;
