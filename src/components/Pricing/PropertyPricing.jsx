import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getPropertyPricing, updatePropertyPricing } from '../../http/pricingAPI';
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';
import Table from '../Table/Table';

const PropertyPricing = () => {
  const [propertyPricing, setPropertyPricing] = useState([]);
  const [loading, setLoading] = useState(true);
  const [savingLoading, setSavingLoading] = useState(false);

  const navigate = useNavigate();

  const { t } = useTranslation();

  useEffect(() => {
    const getData = async () => {
      const result = await getPropertyPricing();
      const parsedPricing = [
        { _id: '1', type: 'Bedroom', price: result.bedroomPrice },
        { _id: '2', type: 'Bathroom', price: result.bathroomsPrice },
        { _id: '3', type: 'Kitchen', price: result.kitchenPrice },
      ];
      setPropertyPricing(parsedPricing);
      setLoading(false);
    };

    getData();
  }, []);

  const findPrice = (value) => propertyPricing.find((elem) => elem.type === value).price;

  const handleSavingData = async () => {
    setSavingLoading(true);
    const result = await updatePropertyPricing(findPrice('Bedroom'), findPrice('Bathroom'), findPrice('Kitchen'));

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
            items={propertyPricing}
            setItems={setPropertyPricing}
            header={['propertyInfo', 'priceEur']}
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

export default PropertyPricing;
