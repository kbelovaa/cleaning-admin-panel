import React, { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getAllOrders } from '../../http/listsAPI';
import { setOrdersAction } from '../../store/actions/listActions';
import { getRequestCols } from '../../constants/tableColumns';
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';
import ListTable from './ListTable/ListTable';

const Requests = () => {
  const orders = useSelector((state) => state.list.orders);

  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const result = await getAllOrders();

      if (result.status === 200) {
        dispatch(setOrdersAction(result.data.orders.reverse()));
        setLoading(false);
      }
    };

    if (orders.length === 0) {
      fetchData();
    } else {
      setLoading(false);
    }
  }, []);

  const columns = useMemo(() => getRequestCols(navigate), []);

  return (
    <div className="data">
      <Breadcrumbs />
      {loading ? (
        <div className="spinner"></div>
      ) : (
        <div className="data__table-wrap">
          <ListTable data={orders} columns={columns} isClickable={true} />
        </div>
      )}
    </div>
  );
};

export default Requests;
