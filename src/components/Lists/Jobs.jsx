import React, { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getAllJobs } from '../../http/listsAPI';
import { setActiveJobsAction, setPastJobsAction } from '../../store/actions/listActions';
import ListTable from './ListTable/ListTable';

const Jobs = () => {
  const activeJobs = useSelector((state) => state.list.activeJobs);
  const pastJobs = useSelector((state) => state.list.pastJobs);

  const [jobs, setJobs] = useState([]);
  const [jobsType, setJobsType] = useState('Active');
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const result = await getAllJobs();

      if (result.status === 200) {
        dispatch(setActiveJobsAction(result.data.activeJobs.reverse()));
        dispatch(setPastJobsAction(result.data.pastJobs.reverse()));
        setLoading(false);
      }
    };

    if (activeJobs.length === 0 && pastJobs.length === 0) {
      fetchData();
    } else {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (jobsType === 'Active') {
      setJobs(activeJobs);
    } else {
      setJobs(pastJobs);
    }
  }, [jobsType, activeJobs, pastJobs]);

  const openLink = (e, row, item) => {
    e.stopPropagation();
    navigate(`/${item}/${row.original.customerId}`);
  };

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
        filterSelectOptions: ['Confirmed', 'In progress', 'Completed'],
        Cell: ({ cell }) => (
          <div className={`status-wrapper ${cell.getValue().replace(/\s/g, '')}`}>{cell.getValue()}</div>
        ),
      },
      {
        accessorKey: 'cleaner',
        header: 'Cleaner',
        size: 150,
        Cell: ({ cell, row }) => (
          <span className={row.original.cleanerId && 'link'} onClick={(e) => openLink(e, row, 'cleaner')}>
            {cell.getValue()}
          </span>
        ),
      },
      {
        accessorKey: 'date',
        header: 'Date',
        size: 100,
      },
      {
        accessorKey: 'time',
        header: 'Time',
        size: 85,
      },
      {
        accessorKey: 'cleaningType',
        header: 'Type',
        size: 110,
      },
      {
        accessorKey: 'extraServices',
        header: 'Extras',
        size: 160,
      },
      {
        accessorKey: 'howFast',
        header: 'How fast',
        size: 120,
      },
      {
        accessorKey: 'salary',
        header: 'Salary, €',
        size: 118,
      },
      {
        accessorKey: 'customer',
        header: 'Customer',
        size: 150,
        Cell: ({ cell, row }) => (
          <span className={row.original.customerId && 'link'} onClick={(e) => openLink(e, row, 'customer')}>
            {cell.getValue()}
          </span>
        ),
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

  return (
    <ListTable
      data={jobs}
      columns={jobsType === 'Active' ? columns.slice(0, -3) : columns}
      loading={loading}
      jobsType={jobsType}
      setJobsType={setJobsType}
    />
  );
};

export default Jobs;
