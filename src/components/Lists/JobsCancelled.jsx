import React, { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import LaunchIcon from '@mui/icons-material/Launch';
import { getCancelledJobs } from '../../http/listsAPI';
import { setCancelledJobsAction } from '../../store/actions/listActions';
import ListTable from './ListTable/ListTable';

const JobsCancelled = () => {
  const cancelledJobs = useSelector((state) => state.list.cancelledJobs);

  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const paths = [{ name: 'Cancelled jobs', link: 'cancelled_jobs' }];

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
        accessorKey: 'newCleaner',
        header: 'New cleaner',
        size: 160,
        Cell: ({ cell, row }) => (
          <span
            className={row.original.newCleanerId && 'link'}
            onClick={() => row.original.newCleanerId && navigate(`/cleaner/${row.original.newCleanerId}`)}
          >
            {cell.getValue()}
          </span>
        ),
      },
      {
        accessorKey: 'cleaner',
        header: 'Cleaner',
        size: 160,
        Cell: ({ cell, row }) => (
          <span className="link" onClick={() => navigate(`/cleaner/${row.original.cleanerId}`)}>
            {cell.getValue()}
          </span>
        ),
      },
      {
        accessorKey: 'reason',
        header: 'Reason',
        size: 158,
      },
      {
        accessorKey: 'comment',
        header: 'Comment',
        size: 159,
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
