import React, { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCancelledJobs } from '../../http/listsAPI';
import { setCancelledJobsAction } from '../../store/actions/listActions';
import ListTable from './ListTable/ListTable';

const JobsCancelled = () => {
  const cancelledJobs = useSelector((state) => state.list.cancelledJobs);

  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  const paths = [{ name: 'Cancelled jobs', link: 'jobs_cancelled' }];

  useEffect(() => {
    const fetchData = async () => {
      const result = await getCancelledJobs();

      if (result.status === 200) {
        dispatch(setCancelledJobsAction(result.data.cancelledJobs.reverse()));
        setLoading(false);
      }
    };

    if (cancelledJobs.length === 0) {
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
        accessorKey: 'newCleaner',
        header: 'New cleaner',
        size: 147,
      },
      {
        accessorKey: 'cleaner',
        header: 'Cleaner',
        size: 140,
      },
      {
        accessorKey: 'itemN',
        header: 'Job/Order',
        size: 130,
      },
      {
        accessorKey: 'reason',
        header: 'Reason',
        size: 150,
      },
      {
        accessorKey: 'comment',
        header: 'Comment',
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
    ],
    [],
  );

  return <ListTable data={cancelledJobs} columns={columns} loading={loading} paths={paths} />;
};

export default JobsCancelled;
