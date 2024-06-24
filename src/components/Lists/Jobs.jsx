import React, { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { getAllJobs } from '../../http/listsAPI';
import { setActiveJobsAction, setPastJobsAction } from '../../store/actions/listActions';
import { getJobCols } from '../../constants/tableColumns';
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';
import ListTable from './ListTable/ListTable';

const Jobs = () => {
  const activeJobs = useSelector((state) => state.list.activeJobs);
  const pastJobs = useSelector((state) => state.list.pastJobs);

  const [jobs, setJobs] = useState([]);
  const [jobsType, setJobsType] = useState('Active');
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  const { t } = useTranslation();

  useEffect(() => {
    const fetchData = async () => {
      const result = await getAllJobs();

      if (result.status === 200) {
        dispatch(setActiveJobsAction(result.data.activeJobs));
        dispatch(setPastJobsAction(result.data.pastJobs));
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

  const columns = useMemo(() => getJobCols(), []);

  return (
    <div className="data">
      <Breadcrumbs />
      {loading ? (
        <div className="spinner"></div>
      ) : (
        <div className="data__table-wrap">
          <div className="data__tabs">
            <div className={`data__tab ${jobsType === 'Active' && 'active'}`} onClick={() => setJobsType('Active')}>
              {`${t('active')} (${activeJobs.length})`}
            </div>
            <div className={`data__tab ${jobsType === 'Past' && 'active'}`} onClick={() => setJobsType('Past')}>
              {`${t('past')} (${pastJobs.length})`}
            </div>
          </div>
          <ListTable data={jobs} columns={jobsType === 'Active' ? columns.slice(0, -3) : columns} isClickable={true} />
        </div>
      )}
    </div>
  );
};

export default Jobs;
