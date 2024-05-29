import React, { useEffect, useState, useMemo } from 'react';
import { getAllCustomers } from '../../http/listsAPI';
import ListTable from '../ListTable/ListTable';

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  const paths = [{ name: 'Customers', link: 'customers' }];

  useEffect(() => {
    const fetchData = async () => {
      const result = await getAllCustomers();

      if (result.status === 200) {
        setCustomers(result.data.customers.reverse());
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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
      },
      {
        accessorKey: 'numberOfOrders',
        header: 'Nr of orders',
        size: 143,
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
        header: 'Avg order, €',
        size: 144,
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

  return <ListTable data={customers} columns={columns} loading={loading} paths={paths} />;
};

export default Customers;
