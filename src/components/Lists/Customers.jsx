import React, { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getAllCustomers } from '../../http/listsAPI';
import { setCustomersAction } from '../../store/actions/listActions';
import { getCustomerCols } from '../../constants/tableColumns';
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';
import ListTable from './ListTable/ListTable';

const Customers = () => {
  const customers = useSelector((state) => state.list.customers);

  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const result = await getAllCustomers();

      if (result.status === 200) {
        dispatch(setCustomersAction(result.data.customers.reverse()));
        setLoading(false);
      }
    };

    if (customers.length === 0) {
      fetchData();
    } else {
      setLoading(false);
    }
  }, []);

  const columns = useMemo(() => getCustomerCols(navigate), []);

  return (
    <div className="data">
      <Breadcrumbs />
      {loading ? (
        <div className="spinner"></div>
      ) : (
        <div className="data__table-wrap">
          <ListTable data={customers} columns={columns} isClickable={true} />
        </div>
      )}
    </div>
  );
};

export default Customers;
