import React, { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getCancelledJobs } from '../../http/listsAPI';
import { setCancelledJobsAction } from '../../store/actions/listActions';
import { getCancelledJobCols } from '../../constants/tableColumns';
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';
import ListTable from './ListTable/ListTable';

const JobsCancelled = () => {
  const cancelledJobs = useSelector((state) => state.list.cancelledJobs);

  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  const navigate = useNavigate();

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

  const columns = useMemo(() => getCancelledJobCols(navigate, false), []);

  return (
    <div className="data">
      <Breadcrumbs />
      {loading ? (
        <div className="spinner"></div>
      ) : (
        <div className="data__table-wrap">
          <ListTable data={cancelledJobs} columns={columns} isClickable={false} />
        </div>
      )}
    </div>
  );
};

export default JobsCancelled;
