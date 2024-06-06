import React, { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import LaunchIcon from '@mui/icons-material/Launch';
import { getAdjustmentJobs } from '../../http/listsAPI';
import { setAdjustmentJobsAction } from '../../store/actions/listActions';
import ListTable from './ListTable/ListTable';

const JobsAdjustment = () => {
  const adjustmentJobs = useSelector((state) => state.list.adjustmentJobs);

  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const result = await getAdjustmentJobs();

      if (result.status === 200) {
        dispatch(setAdjustmentJobsAction(result.data.adjustments.reverse()));
        setLoading(false);
      }
    };

    if (adjustmentJobs.length === 0) {
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
        accessorKey: 'cleaner',
        header: 'Cleaner',
        size: 189,
        Cell: ({ cell, row }) => (
          <span
            className={row.original.cleanerId && 'link'}
            onClick={() => row.original.cleanerId && navigate(`/cleaner/${row.original.cleanerId}`)}
          >
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
        size: 100,
      },
      {
        accessorKey: 'time',
        header: 'Time',
        size: 95,
      },
    ],
    [],
  );

  return <ListTable data={adjustmentJobs} columns={columns} loading={loading} />;
};

export default JobsAdjustment;
