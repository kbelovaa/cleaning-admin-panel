import React, { useContext, useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import HistoryContext from '../../utils/HistoryContext';
import { setCleanerAction } from '../../store/actions/cardActions';
import { getCleaner } from '../../http/cardsAPI';
import { getAdjustmentCols, getCancelledJobCols, getJobCols } from '../../constants/tableColumns';
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';
import ListTable from '../Lists/ListTable/ListTable';
import './Cleaner.scss';
import Calendar from '../Calendar/Calendar';

const Cleaner = () => {
  const cleaner = useSelector((state) => state.card.cleaner);

  const [isPersonalExpanded, setIsPersonalExpanded] = useState(false);
  const [isWorkingHoursExpanded, setIsWorkingHoursExpanded] = useState(false);
  const [isJobsExpanded, setIsJobsExpanded] = useState(false);
  const [isAdjustmentsExpanded, setIsAdjustmentsExpanded] = useState(false);

  const [jobType, setJobType] = useState('Active');

  const [loading, setLoading] = useState(true);

  const { id } = useParams();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const history = useContext(HistoryContext);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getCleaner(id);

      if (result.status === 200) {
        dispatch(setCleanerAction(result.data.cleaner));
        setLoading(false);
      }
    };

    if (!cleaner || cleaner.userId !== id) {
      fetchData();
    } else {
      setLoading(false);
    }
  }, []);

  const goBack = () => {
    navigate(history[history.length - 2]);
  };

  const cleaningColumns = useMemo(() => getJobCols(navigate).filter((_, i) => i !== 2), []);
  const cancelledJobsColumns = useMemo(() => getCancelledJobCols(navigate, true), []);
  const adjustmentColumns = useMemo(() => getAdjustmentCols(navigate, true, true), []);

  return (
    <div className="cleaner">
      <Breadcrumbs />
      {loading ? (
        <div className="spinner"></div>
      ) : (
        <div className="card">
          <div className="card__block">
            <div className="card__title-wrap">
              <svg
                className="card__back"
                onClick={goBack}
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path d="M21 12L3 12" stroke="#2329D6" strokeLinecap="round" />
                <path d="M9 6L3 12L9 18" stroke="#2329D6" strokeLinecap="round" />
              </svg>
              <h2 className="card__title">{cleaner.fullName}</h2>
              <div className={`card__status ${cleaner.workingStatus}`}></div>
            </div>
            <div className={`personal ${isPersonalExpanded ? 'expanded' : ''}`}>
              <div className="personal__wrap" onClick={() => setIsPersonalExpanded((state) => !state)}>
                <svg
                  className={isPersonalExpanded ? 'arrow rotated' : 'arrow'}
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path d="M6 10L12 16L18 10" stroke="#2329D6" strokeLinecap="round" />
                </svg>
                <h3 className="personal__title">Personal info</h3>
              </div>
              <div className="personal__info">
                <div className="personal__values">
                  <span className="personal__text">Email</span>
                  <span className="personal__text">Phone</span>
                  <span className="personal__text">Address</span>
                  <span className="personal__text">Reg.</span>
                </div>
                <div className="personal__values">
                  <span className="personal__text">{cleaner.email}</span>
                  <span className="personal__text">{cleaner.mobile}</span>
                  <span className="personal__text">{cleaner.homeAddress}</span>
                  <span className="personal__text">{cleaner.onboardingDate}</span>
                </div>
              </div>
            </div>
            <div className="kpi">
              <div className="kpi__block">
                <span className="kpi__label">Salary, €</span>
                <span className="kpi__value">{cleaner.salary}</span>
              </div>
              <div className="kpi__block">
                <span className="kpi__label">Avg job price, €</span>
                <span className="kpi__value">{cleaner.avgJobPrice}</span>
              </div>
              <div className="kpi__block">
                <span className="kpi__label">Nr of jobs</span>
                <span className="kpi__value">{cleaner.numberOfJobs}</span>
              </div>
              <div className="kpi__block">
                <span className="kpi__label">Completed</span>
                <span className="kpi__value">{cleaner.doneJobsNumber}</span>
              </div>
              <div className="kpi__block">
                <span className="kpi__label">Pending</span>
                <span className="kpi__value">{cleaner.pendingJobsNumber}</span>
              </div>
              <div className="kpi__block">
                <span className="kpi__label">Cancelled</span>
                <span className="kpi__value">{cleaner.cancelledJobsNumber}</span>
              </div>
              <div className="kpi__block">
                <span className="kpi__label">Rating</span>
                <span className="kpi__value">{cleaner.rating}</span>
              </div>
            </div>
          </div>
          <div className={`block ${isWorkingHoursExpanded ? 'expanded' : ''}`}>
            <div className="card__title-wrap" onClick={() => setIsWorkingHoursExpanded((state) => !state)}>
              <svg
                className={isWorkingHoursExpanded ? 'arrow rotated' : 'arrow'}
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path d="M6 10L12 16L18 10" stroke="#2329D6" strokeLinecap="round" />
              </svg>
              <h2 className="card__title">Working hours</h2>
            </div>
            <div className="block__table card__block">
              <Calendar schedule={cleaner.workingHours} />
            </div>
          </div>
          <div className={`block ${isJobsExpanded ? 'expanded' : ''}`}>
            <div className="card__title-wrap" onClick={() => setIsJobsExpanded((state) => !state)}>
              <svg
                className={isJobsExpanded ? 'arrow rotated' : 'arrow'}
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path d="M6 10L12 16L18 10" stroke="#2329D6" strokeLinecap="round" />
              </svg>
              <h2 className="card__title">{`Jobs (${
                cleaner.jobs.activeJobs.length + cleaner.jobs.pastJobs.length
              })`}</h2>
            </div>
            <div className="block__table card__block">
              <div className="data__tabs">
                <div className={`data__tab ${jobType === 'Active' && 'active'}`} onClick={() => setJobType('Active')}>
                  {`Active (${cleaner.jobs.activeJobs.length})`}
                </div>
                <div className={`data__tab ${jobType === 'Past' && 'active'}`} onClick={() => setJobType('Past')}>
                  {`Past (${cleaner.jobs.pastJobs.length})`}
                </div>
                <div
                  className={`data__tab ${jobType === 'Cancelled' && 'active'}`}
                  onClick={() => setJobType('Cancelled')}
                >
                  {`Cancelled (${cleaner.cancelledJobs.length})`}
                </div>
              </div>
              <ListTable
                data={
                  jobType === 'Active'
                    ? cleaner.jobs.activeJobs
                    : jobType === 'Past'
                    ? cleaner.jobs.pastJobs
                    : cleaner.cancelledJobs
                }
                columns={
                  jobType === 'Active'
                    ? cleaningColumns.slice(0, -3)
                    : jobType === 'Past'
                    ? cleaningColumns
                    : cancelledJobsColumns.filter((_, i) => i !== 3)
                }
                isClickable={true}
              />
            </div>
          </div>
          <div className={`block ${isAdjustmentsExpanded ? 'expanded' : ''}`}>
            <div className="card__title-wrap" onClick={() => setIsAdjustmentsExpanded((state) => !state)}>
              <svg
                className={isAdjustmentsExpanded ? 'arrow rotated' : 'arrow'}
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path d="M6 10L12 16L18 10" stroke="#2329D6" strokeLinecap="round" />
              </svg>
              <h2 className="card__title">{`Adjustments (${cleaner.adjustments.length})`}</h2>
            </div>
            <div className="block__table card__block">
              <ListTable
                data={cleaner.adjustments}
                columns={adjustmentColumns.filter((_, i) => i !== 2)}
                isClickable={false}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cleaner;
