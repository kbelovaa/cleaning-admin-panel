import React, { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllCleaners } from '../../http/listsAPI';
import { setCleanersAction } from '../../store/actions/listActions';
import ListTable from './ListTable/ListTable';

const Cleaners = () => {
  const cleaners = useSelector((state) => state.list.cleaners);

  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const result = await getAllCleaners();

      if (result.status === 200) {
        dispatch(setCleanersAction(result.data.cleaners.reverse()));
        setLoading(false);
      }
    };

    if (cleaners.length === 0) {
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
        header: 'Salary, €',
        size: 118,
      },
      {
        accessorKey: 'avgJobPrice',
        header: 'Avg job price, €',
        size: 170,
      },
      {
        accessorKey: 'numberOfJobs',
        header: 'Nr of jobs',
        size: 126,
      },
      {
        accessorKey: 'doneJobsNumber',
        header: 'Completed',
        size: 136,
      },
      {
        accessorKey: 'pendingJobsNumber',
        header: 'Pending',
        size: 114,
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

  return <ListTable data={cleaners} columns={columns} loading={loading} />;
};

export default Cleaners;
