import React, { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { getAllOrders } from '../../http/listsAPI';
import { setOrdersAction } from '../../store/actions/listActions';
import { calculateTimeLeft } from '../../utils/formatDate';
import ListTable from './ListTable/ListTable';
import TimerCell from './TimerCell';

const RequestsUnconfirmed = () => {
  const orders = useSelector((state) => state.list.orders);

  const [unconfirmedOrders, setUnconfirmedOrders] = useState([]);
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

  useEffect(() => {
    const filteredOrders = orders.filter((order) => order.status === 'Awaiting confirmation');
    const ordersList = filteredOrders.map((order, i) => ({ ...order, id: filteredOrders.length - i }));
    setUnconfirmedOrders(ordersList);
  }, [orders]);

  const openLink = (e, row, item) => {
    e.stopPropagation();
    navigate(`/${item}/${row.original.customerId}`);
  };

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
        size: 150,
        Cell: ({ cell, row }) => (
          <span className="link" onClick={(e) => openLink(e, row, 'customer')}>
            {cell.getValue()}
          </span>
        ),
      },
      {
        accessorKey: 'creationDate',
        header: 'Creation date',
        size: 155,
      },
      {
        accessorKey: 'paymentReservationDate',
        header: 'Time to confirm',
        size: 172,
        filterVariant: 'select',
        filterSelectOptions: ['Active', 'Expired'],
        filterFn: (row, columnId, filterValue) => {
          const cellValue = calculateTimeLeft(row.original[columnId]);
          if (filterValue === 'Active') {
            return cellValue !== null;
          }
          if (filterValue === 'Expired') {
            return cellValue === null;
          }
          return true;
        },
        Cell: TimerCell,
      },
      {
        accessorKey: 'date',
        header: 'Date',
        size: 100,
      },
      {
        accessorKey: 'time',
        header: 'Time',
        size: 85,
      },
      {
        accessorKey: 'cleaningType',
        header: 'Type',
        size: 110,
      },
      {
        accessorKey: 'extraServices',
        header: 'Extras',
        size: 160,
      },
      {
        accessorKey: 'howFast',
        header: 'How fast',
        size: 120,
      },
      {
        accessorKey: 'tariff',
        header: 'Tariff',
        size: 100,
      },
      {
        accessorKey: 'price',
        header: 'Price, €',
        size: 110,
      },
      {
        accessorKey: 'salary',
        header: 'Salary, €',
        size: 118,
      },
      {
        accessorKey: 'fullAddress',
        header: 'Address',
        size: 200,
      },
      {
        accessorKey: 'sqm',
        header: 'sqm',
        size: 84,
      },
      {
        accessorKey: 'specialInstructions',
        header: 'Special instructions',
        size: 205,
      },
      {
        accessorKey: 'isRecurring',
        header: 'Recurring',
        size: 125,
        filterVariant: 'checkbox',
        Cell: ({ cell }) => (cell.getValue() ? <CheckIcon /> : <CloseIcon />),
      },
    ],
    [],
  );

  return <ListTable data={unconfirmedOrders} columns={columns} loading={loading} />;
};

export default RequestsUnconfirmed;
