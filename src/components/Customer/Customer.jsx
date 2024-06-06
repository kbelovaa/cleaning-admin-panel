import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setCustomerAction } from '../../store/actions/cardActions';
import { getCustomer } from '../../http/cardsAPI';
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';
import './Customer.scss';

const Customer = () => {
  const customer = useSelector((state) => state.card.customer);

  const [loading, setLoading] = useState();

  const { id } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const result = await getCustomer(id);

      if (result.status === 200) {
        dispatch(setCustomerAction(result.data.customer));
        setLoading(false);
      }
    };

    if (!customer) {
      fetchData();
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <div className="customer">
      <Breadcrumbs />
      {loading ? <div className="spinner"></div> : <div className="card"></div>}
    </div>
  );
};

export default Customer;
