import React, { useEffect, useState, useMemo } from 'react';
import { getAllCleaners } from '../../http/listsAPI';
import ListTable from '../ListTable/ListTable';

const Cleaners = () => {
  const [cleaners, setCleaners] = useState([]);
  const [loading, setLoading] = useState(true);

  const paths = [{ name: 'Cleaners', link: 'cleaners' }];

  useEffect(() => {
    const fetchData = async () => {
      const result = await getAllCleaners();

      if (result.status === 200) {
        setCleaners(result.data.cleaners.reverse());
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
        accessorKey: 'workingStatus',
        header: 'Status',
        size: 101,
        filterVariant: 'select',
        filterSelectOptions: ['Active', 'Working', 'Inactive'],
        Cell: ({ cell }) => <div className={`status-wrapper ${cell.getValue()}`}>{cell.getValue()}</div>,
      },
      {
        accessorKey: 'salary',
        header: 'Salary',
        size: 100,
      },
      {
        accessorKey: 'avgJobPrice',
        header: 'Avg job price',
        size: 151,
      },
      {
        accessorKey: 'numberOfJobs',
        header: 'Nr of jobs',
        size: 126,
      },
      {
        accessorKey: 'doneJobsNumber',
        header: 'Done',
        size: 70,
      },
      {
        accessorKey: 'cancelledJobsNumber',
        header: 'Cancelled',
        size: 128,
      },
      {
        accessorKey: 'rating',
        header: 'Rating',
        size: 100,
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
      {
        accessorKey: 'onboardingDate',
        header: 'Onboarding date',
        size: 180,
      },
    ],
    [],
  );

  return <ListTable data={cleaners} columns={columns} loading={loading} paths={paths} />;
};

export default Cleaners;
