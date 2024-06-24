import React, { useContext, useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import HistoryContext from '../../utils/HistoryContext';
import { setSubscriptionAction } from '../../store/actions/cardActions';
import { getSubscription } from '../../http/cardsAPI';
import { getCancelledRequestCols, getJobCols, requestCols } from '../../constants/tableColumns';
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';
import ListTable from '../Lists/ListTable/ListTable';
import './Subscription.scss';

const Subscription = () => {
  const subscription = useSelector((state) => state.card.subscription);

  const [isInfoExpanded, setIsInfoExpanded] = useState(false);
  const [isRequestsExpanded, setIsRequestsExpanded] = useState(false);
  const [isCleaningsExpanded, setIsCleaningsExpanded] = useState(false);

  const [requestsType, setRequestsType] = useState('All');
  const [cleaningsType, setCleaningsType] = useState('Active');

  const [loading, setLoading] = useState(true);

  const { id } = useParams();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const history = useContext(HistoryContext);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getSubscription(id);

      if (result.status === 200) {
        dispatch(setSubscriptionAction(result.data.subscription));
        setLoading(false);
      }
    };

    if (!subscription || subscription.subscriptionId !== id) {
      fetchData();
    } else {
      setLoading(false);
    }
  }, []);

  const goBack = () => {
    navigate(history[history.length - 2]);
  };

  const requestColumns = useMemo(() => requestCols, []);
  const cancelledRequestColumns = useMemo(() => getCancelledRequestCols(true), []);
  const cleaningColumns = useMemo(() => getJobCols().filter((_, i) => i !== 9 && i !== 10 && i !== 11), []);

  return (
    <div className="subscription">
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
              <h2 className="card__title">{`${subscription.recurring} subscription, ${subscription.startDate} - ${subscription.endDate}`}</h2>
            </div>
            <div className={`personal ${isInfoExpanded ? 'expanded' : ''}`}>
              <div className="personal__wrap" onClick={() => setIsInfoExpanded((state) => !state)}>
                <svg
                  className={isInfoExpanded ? 'arrow rotated' : 'arrow'}
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path d="M6 10L12 16L18 10" stroke="#2329D6" strokeLinecap="round" />
                </svg>
                <h3 className="personal__title">Info</h3>
              </div>
              <div className="personal__info">
                <div className="personal__values">
                  <span className="personal__text">Customer</span>
                  <span className="personal__text">Address</span>
                  <span className="personal__text">Start date</span>
                  <span className="personal__text">Last date</span>
                  <span className="personal__text">Excluded dates</span>
                </div>
                <div className="personal__values">
                  <a className="personal__text link" href={`/customer/${subscription.customerId}`}>
                    {subscription.customer}
                  </a>
                  <a className="personal__text link" href={`/address/${subscription.addressId}`}>
                    {subscription.address}
                  </a>
                  <span className="personal__text">{subscription.startDate}</span>
                  <span className="personal__text">{subscription.endDate}</span>
                  <span className="personal__text">{subscription.excludedDates}</span>
                </div>
              </div>
            </div>
            <div className="kpi">
              <div className="kpi__block">
                <span className="kpi__label">Next cleaning</span>
                <a
                  className={`kpi__value ${subscription.nextCleaningId && 'link'}`}
                  href={subscription.nextCleaningId ? `/cleaning/${subscription.nextCleaningId}` : undefined}
                >
                  {subscription.nextCleaning}
                </a>
              </div>
              <div className="kpi__block">
                <span className="kpi__label">Cleanings</span>
                <span className="kpi__value">{subscription.numberOfCleans}</span>
              </div>
              <div className="kpi__block">
                <span className="kpi__label">Completed</span>
                <span className="kpi__value">{subscription.numberOfCompletedCleans}</span>
              </div>
              <div className="kpi__block">
                <span className="kpi__label">Pending</span>
                <span className="kpi__value">{subscription.numberOfPendingCleans}</span>
              </div>
              <div className="kpi__block">
                <span className="kpi__label">Cancelled</span>
                <span className="kpi__value">{subscription.numberOfCancelledCleans}</span>
              </div>
            </div>
          </div>
          <div className={`block ${isRequestsExpanded ? 'expanded' : ''}`}>
            <div className="card__title-wrap" onClick={() => setIsRequestsExpanded((state) => !state)}>
              <svg
                className={isRequestsExpanded ? 'arrow rotated' : 'arrow'}
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path d="M6 10L12 16L18 10" stroke="#2329D6" strokeLinecap="round" />
              </svg>
              <h2 className="card__title">{`Requests (${
                subscription.requests.length + subscription.cancelledRequests.length
              })`}</h2>
            </div>
            <div className="block__table card__block">
              <div className="data__tabs">
                <div
                  className={`data__tab ${requestsType === 'All' && 'active'}`}
                  onClick={() => setRequestsType('All')}
                >
                  {`All (${subscription.requests.length})`}
                </div>
                <div
                  className={`data__tab ${requestsType === 'Cancelled' && 'active'}`}
                  onClick={() => setRequestsType('Cancelled')}
                >
                  {`Cancelled (${subscription.cancelledRequests.length})`}
                </div>
              </div>
              <ListTable
                data={requestsType === 'All' ? subscription.requests : subscription.cancelledRequests}
                columns={
                  requestsType === 'All'
                    ? requestColumns.filter((_, i) => i !== 2 && i !== 11 && i !== 12)
                    : cancelledRequestColumns
                }
                isClickable={requestsType === 'All'}
              />
            </div>
          </div>
          <div className={`block ${isCleaningsExpanded ? 'expanded' : ''}`}>
            <div className="card__title-wrap" onClick={() => setIsCleaningsExpanded((state) => !state)}>
              <svg
                className={isCleaningsExpanded ? 'arrow rotated' : 'arrow'}
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path d="M6 10L12 16L18 10" stroke="#2329D6" strokeLinecap="round" />
              </svg>
              <h2 className="card__title">{`Cleanings (${
                subscription.cleaningsList.activeJobs.length + subscription.cleaningsList.pastJobs.length
              })`}</h2>
            </div>
            <div className="block__table card__block">
              <div className="data__tabs">
                <div
                  className={`data__tab ${cleaningsType === 'Active' && 'active'}`}
                  onClick={() => setCleaningsType('Active')}
                >
                  {`Active (${subscription.cleaningsList.activeJobs.length})`}
                </div>
                <div
                  className={`data__tab ${cleaningsType === 'Past' && 'active'}`}
                  onClick={() => setCleaningsType('Past')}
                >
                  {`Past (${subscription.cleaningsList.pastJobs.length})`}
                </div>
              </div>
              <ListTable
                data={
                  cleaningsType === 'Active'
                    ? subscription.cleaningsList.activeJobs
                    : subscription.cleaningsList.pastJobs
                }
                columns={cleaningsType === 'Active' ? cleaningColumns.slice(0, -3) : cleaningColumns}
                isClickable={true}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Subscription;
