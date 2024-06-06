import React, { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getAllCustomers } from '../../http/listsAPI';
import { setCustomersAction } from '../../store/actions/listActions';
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

  const openLink = (e, row, item) => {
    e.stopPropagation();
    navigate(`/${item}/${row.original.nextCleaningId}`);
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: 'id',
        header: '№',
        size: 68,
      },
      {
        accessorKey: 'name',
        header: 'Name',
        size: 150,
      },
      {
        accessorKey: 'surname',
        header: 'Surname',
        size: 150,
      },
      {
        accessorKey: 'nextCleaning',
        header: 'Next cleaning',
        size: 156,
        Cell: ({ cell, row }) => (
          <span className={row.original.nextCleaningId && 'link'} onClick={(e) => openLink(e, row, 'cleaning')}>
            {cell.getValue()}
          </span>
        ),
      },
      {
        accessorKey: 'numberOfOrders',
        header: 'Cleanings',
        size: 130,
      },
      {
        accessorKey: 'numberOfCompletedOrders',
        header: 'Completed',
        size: 136,
      },
      {
        accessorKey: 'numberOfPendingOrders',
        header: 'Pending',
        size: 114,
      },
      {
        accessorKey: 'numberOfCancelledOrders',
        header: 'Cancelled',
        size: 128,
      },
      {
        accessorKey: 'onboardingDate',
        header: 'Onboarding date',
        size: 180,
      },
      {
        accessorKey: 'lastActivityDate',
        header: 'Last activity',
        size: 145,
      },
      {
        accessorKey: 'avgScore',
        header: 'Avg score',
        size: 127,
      },
      {
        accessorKey: 'avgOrder',
        header: 'Avg cleaning, €',
        size: 170,
      },
      {
        accessorKey: 'orderPriceSum',
        header: 'Total spend, €',
        size: 160,
      },
      {
        accessorKey: 'email',
        header: 'Email',
        size: 200,
      },
      {
        accessorKey: 'mobile',
        header: 'Phone number',
        size: 163,
      },
    ],
    [],
  );

  return <ListTable data={customers} columns={columns} loading={loading} />;
};

export default Customers;
