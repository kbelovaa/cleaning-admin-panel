import React, { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCancelledOrders } from '../../http/listsAPI';
import { setCancelledOrdersAction } from '../../store/actions/listActions';
import ListTable from './ListTable/ListTable';

const RequestsCancelled = () => {
  const cancelledOrders = useSelector((state) => state.list.cancelledOrders);

  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  const paths = [{ name: 'Cancelled requests', link: 'requests_cancelled' }];

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

  const columns = useMemo(
    () => [
      {
        accessorKey: 'id',
        header: '№',
        size: 68,
      },
      {
        accessorKey: 'customer',
        header: 'Customer',
        size: 160,
      },
      {
        accessorKey: 'orderN',
        header: 'Order №',
        size: 130,
      },
      {
        accessorKey: 'reason',
        header: 'Reason',
        size: 210,
      },
      {
        accessorKey: 'comment',
        header: 'Comment',
        size: 210,
      },
      {
        accessorKey: 'date',
        header: 'Date',
        size: 100,
      },
      {
        accessorKey: 'time',
        header: 'Time',
        size: 94,
      },
    ],
    [],
  );

  return <ListTable data={cancelledOrders} columns={columns} loading={loading} paths={paths} />;
};

export default RequestsCancelled;
