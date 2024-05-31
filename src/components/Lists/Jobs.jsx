import React, { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllJobs } from '../../http/listsAPI';
import { setJobsAction } from '../../store/actions/listActions';
import ListTable from './ListTable/ListTable';

const Jobs = () => {
  const jobs = useSelector((state) => state.list.jobs);

  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  const paths = [{ name: 'Jobs', link: 'job' }];

  useEffect(() => {
    const fetchData = async () => {
      const result = await getAllJobs();

      if (result.status === 200) {
        dispatch(setJobsAction(result.data.jobs.reverse()));
        setLoading(false);
      }
    };

    if (jobs.length === 0) {
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
        size: 120,
        filterVariant: 'select',
        filterSelectOptions: ['Confirmed', 'In progress', 'Done'],
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
        accessorKey: 'cleaner',
        header: 'Cleaner',
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
        accessorKey: 'salary',
        header: 'Salary',
        size: 100,
      },
      {
        accessorKey: 'customer',
        header: 'Customer',
        size: 150,
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
        accessorKey: 'rating',
        header: 'Rating',
        size: 100,
      },
      {
        accessorKey: 'clientFeedbackText',
        header: 'Client feedback',
        size: 172,
      },
      {
        accessorKey: 'cleanerFeedbackText',
        header: 'Cleaner feedback',
        size: 187,
      },
    ],
    [],
  );

  return <ListTable data={jobs} columns={columns} loading={loading} paths={paths} />;
};

export default Jobs;
