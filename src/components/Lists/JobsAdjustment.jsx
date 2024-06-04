import React, { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAdjustmentJobs } from '../../http/listsAPI';
import { setAdjustmentJobsAction } from '../../store/actions/listActions';
import ListTable from './ListTable/ListTable';

const JobsAdjustment = () => {
  const adjustmentJobs = useSelector((state) => state.list.adjustmentJobs);

  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  const paths = [{ name: 'Jobs needing adjustment', link: 'jobs_needing_adjustment' }];

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
        accessorKey: 'cleaner',
        header: 'Cleaner',
        size: 159,
      },
      {
        accessorFn: (originalRow) => `Job №${originalRow.jobN}`,
        id: 'jobN',
        header: 'Job №',
        size: 130,
      },
      {
        accessorKey: 'reason',
        header: 'Reason',
        size: 210,
      },
      {
        accessorKey: 'comment',
        header: 'Comment',
        size: 210,
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

  return <ListTable data={adjustmentJobs} columns={columns} loading={loading} paths={paths} />;
};

export default JobsAdjustment;
