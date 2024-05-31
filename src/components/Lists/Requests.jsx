import React, { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { getAllOrders } from '../../http/listsAPI';
import { setOrdersAction } from '../../store/actions/listActions';
import ListTable from './ListTable/ListTable';

const Requests = () => {
  const orders = useSelector((state) => state.list.orders);

  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  const paths = [{ name: 'Requests', link: 'requests' }];

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

  const columns = useMemo(
    () => [
      {
        accessorKey: 'id',
        header: '№',
        size: 68,
      },
      {
        accessorKey: 'status',
        header: 'Status',
        size: 145,
        filterVariant: 'select',
        filterSelectOptions: ['Not paid', 'Awaiting payment', 'Awaiting confirmation', 'Cancelled'],
        Cell: ({ cell, row }) => (
          <div className={`status-wrapper ${cell.getValue().replace(/\s/g, '')}`}>
            {cell.getValue()}
            {/* {row.original.adjustmentNeeded && (
              <div className="warning">
                <div className="warning__text">Adjustment needed</div>
              </div>
            )} */}
          </div>
        ),
      },
      {
        accessorKey: 'customer',
        header: 'Customer',
        size: 150,
      },
      {
        accessorKey: 'date',
        header: 'Date',
        size: 90,
      },
      {
        accessorKey: 'time',
        header: 'Time',
        size: 85,
      },
      {
        accessorKey: 'cleaningType',
        header: 'Cleaning type',
        size: 157,
      },
      {
        accessorKey: 'extraServices',
        header: 'Extra services',
        size: 160,
      },
      {
        accessorKey: 'howFast',
        header: 'How fast',
        size: 120,
      },
      {
        accessorKey: 'price',
        header: 'Price',
        size: 100,
      },
      {
        accessorKey: 'tariff',
        header: 'Tariff',
        size: 100,
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
      {
        accessorKey: 'creationDate',
        header: 'Creation date',
        size: 155,
      },
    ],
    [],
  );

  return <ListTable data={orders} columns={columns} loading={loading} paths={paths} />;
};

export default Requests;
