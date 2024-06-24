import React, { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCancelledOrders } from '../../http/listsAPI';
import { setCancelledOrdersAction } from '../../store/actions/listActions';
import { getCancelledRequestCols } from '../../constants/tableColumns';
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';
import ListTable from './ListTable/ListTable';

const RequestsCancelled = () => {
  const cancelledOrders = useSelector((state) => state.list.cancelledOrders);

  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const result = await getCancelledOrders();

      if (result.status === 200) {
        dispatch(setCancelledOrdersAction(result.data.cancelledOrders.reverse()));
        setLoading(false);
      }
    };

    if (cancelledOrders.length === 0) {
      fetchData();
    } else {
      setLoading(false);
    }
  }, []);

  const columns = useMemo(() => getCancelledRequestCols(false), []);

  return (
    <div className="data">
      <Breadcrumbs />
      {loading ? (
        <div className="spinner"></div>
      ) : (
        <div className="data__table-wrap">
          <ListTable data={cancelledOrders} columns={columns} isClickable={false} />
        </div>
      )}
    </div>
  );
};

export default RequestsCancelled;
