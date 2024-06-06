import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getSalaryCoeffs, updateSalaryCoeffs } from '../../../http/pricingAPI';
import Breadcrumbs from '../../Breadcrumbs/Breadcrumbs';
import Table from '../../Table/Table';
import './SalaryFormula.scss';

const SalaryFormula = () => {
  const [salaryCoeffs, setSalaryCoeffs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [savingLoading, setSavingLoading] = useState(false);

  const navigate = useNavigate();

  const { t } = useTranslation();

  useEffect(() => {
    const getData = async () => {
      const result = await getSalaryCoeffs();
      const parsedPricing = [
        { _id: '1', name: 'IVA', value: result.orderTaxPercent },
        { _id: '2', name: 'SDL', value: result.feePercent },
        { _id: '3', name: 'Social security', value: result.socialSecurityPercent },
      ];
      setSalaryCoeffs(parsedPricing);
      setLoading(false);
    };

    getData();
  }, []);

  const findValue = (value) => salaryCoeffs.find((elem) => elem.name === value).value;

  const handleSavingData = async () => {
    setSavingLoading(true);
    const result = await updateSalaryCoeffs(findValue('IVA'), findValue('SDL'), findValue('Social security'));

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
          <p className="settings__formula">
            {`${t('salary')} = (${t('total')} - IVA (${findValue('IVA')} %) - SDL (${findValue('SDL')} %)) / ${t(
              'socialSecurityCoeff',
            )} (${findValue('Social security')})`}
          </p>
          <Table
            items={salaryCoeffs}
            setItems={setSalaryCoeffs}
            header={['name', 'percCoeff']}
            keys={['name', 'value']}
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

export default SalaryFormula;
