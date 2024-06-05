import React, { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import LaunchIcon from '@mui/icons-material/Launch';
import { getCancelledOrders } from '../../http/listsAPI';
import { setCancelledOrdersAction } from '../../store/actions/listActions';
import ListTable from './ListTable/ListTable';

const RequestsCancelled = () => {
  const cancelledOrders = useSelector((state) => state.list.cancelledOrders);

  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const paths = [{ name: 'Cancelled requests', link: 'cancelled_requests' }];

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
        accessorKey: 'orderId',
        header: 'Cleaning',
        size: 80,
        enableSorting: false,
        enableColumnFilter: false,
        Cell: ({ cell }) => (
          <LaunchIcon className="launch-icon" onClick={() => navigate(`/cleaning/${cell.getValue()}`)} />
        ),
      },
      {
        accessorKey: 'customer',
        header: 'Customer',
        size: 190,
        Cell: ({ cell, row }) => (
          <span className="link" onClick={() => navigate(`/customer/${row.original.customerId}`)}>
            {cell.getValue()}
          </span>
        ),
      },
      {
        accessorKey: 'reason',
        header: 'Reason',
        size: 220,
      },
      {
        accessorKey: 'comment',
        header: 'Comment',
        size: 220,
      },
      {
        accessorKey: 'date',
        header: 'Date',
        size: 95,
      },
      {
        accessorKey: 'time',
        header: 'Time',
        size: 85,
      },
    ],
    [],
  );

  return <ListTable data={cancelledOrders} columns={columns} loading={loading} paths={paths} />;
};

export default RequestsCancelled;
