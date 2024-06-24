import React, { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAdjustmentJobs } from '../../http/listsAPI';
import { setAdjustmentJobsAction } from '../../store/actions/listActions';
import { getAdjustmentCols } from '../../constants/tableColumns';
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';
import ListTable from './ListTable/ListTable';

const JobsAdjustment = () => {
  const adjustmentJobs = useSelector((state) => state.list.adjustmentJobs);

  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

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

  const columns = useMemo(() => getAdjustmentCols(false, false), []);

  return (
    <div className="data">
      <Breadcrumbs />
      {loading ? (
        <div className="spinner"></div>
      ) : (
        <div className="data__table-wrap">
          <ListTable data={adjustmentJobs} columns={columns} isClickable={false} />
        </div>
      )}
    </div>
  );
};

export default JobsAdjustment;
