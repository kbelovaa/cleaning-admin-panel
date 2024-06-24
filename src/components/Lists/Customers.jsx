import React, { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllCustomers } from '../../http/listsAPI';
import { setCustomersAction } from '../../store/actions/listActions';
import { customerCols } from '../../constants/tableColumns';
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';
import ListTable from './ListTable/ListTable';

const Customers = () => {
  const customers = useSelector((state) => state.list.customers);

  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

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

  const columns = useMemo(() => customerCols, []);

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
