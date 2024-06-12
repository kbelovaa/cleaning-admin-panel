import React, { useContext, useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import HistoryContext from '../../utils/HistoryContext';
import { setCustomerAction } from '../../store/actions/cardActions';
import { getCustomer } from '../../http/cardsAPI';
import { formatActivityDate } from '../../utils/formatDate';
import {
  addressCols,
  getCancelledRequestCols,
  getJobCols,
  getRequestCols,
  getSubscriptionCols,
} from '../../constants/tableColumns';
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';
import ListTable from '../Lists/ListTable/ListTable';
import './Customer.scss';

const Customer = () => {
  const customer = useSelector((state) => state.card.customer);

  const [isPersonalExpanded, setIsPersonalExpanded] = useState(false);
  const [isAddressesExpanded, setIsAddressesExpanded] = useState(false);
  const [isRequestsExpanded, setIsRequestsExpanded] = useState(false);
  const [isCleaningsExpanded, setIsCleaningsExpanded] = useState(false);
  const [isSubscriptionsExpanded, setIsSubscriptionsExpanded] = useState(false);

  const [requestsType, setRequestsType] = useState('All');
  const [cleaningsType, setCleaningsType] = useState('Active');
  const [subscriptionType, setSubscriptionType] = useState('Active');

  const [loading, setLoading] = useState(true);

  const { id } = useParams();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const history = useContext(HistoryContext);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getCustomer(id);

      if (result.status === 200) {
        dispatch(setCustomerAction(result.data.customer));
        setLoading(false);
      }
    };

    if (!customer || customer.userId !== id) {
      fetchData();
    } else {
      setLoading(false);
    }
  }, []);

  const goBack = () => {
    navigate(history[history.length - 2]);
  };

  const addressColumns = useMemo(() => addressCols, []);
  const requestColumns = useMemo(() => getRequestCols(navigate), []);
  const cancelledRequestColumns = useMemo(() => getCancelledRequestCols(navigate, true), []);
  const cleaningColumns = useMemo(() => getJobCols(navigate), []);
  const subscriptionColumns = useMemo(() => getSubscriptionCols(navigate), []);
  const pastSubscriptionColumns = useMemo(() => getSubscriptionCols(navigate, true), []);

  return (
    <div className="customer">
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
              <h2 className="card__title">{customer.fullName}</h2>
              <span className="card__activity">{`last activity: ${formatActivityDate(customer.lastActivity)}`}</span>
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
                  <span className="personal__text">Reg.</span>
                </div>
                <div className="personal__values">
                  <span className="personal__text">{customer.email}</span>
                  <span className="personal__text">{customer.mobile}</span>
                  <span className="personal__text">{customer.regDate}</span>
                </div>
              </div>
            </div>
            <div className="kpi">
              <div className="kpi__block">
                <span className="kpi__label">Cleanings</span>
                <span className="kpi__value">{customer.numberOfOrders}</span>
              </div>
              <div className="kpi__block">
                <span className="kpi__label">Completed</span>
                <span className="kpi__value">{customer.numberOfCompletedOrders}</span>
              </div>
              <div className="kpi__block">
                <span className="kpi__label">Pending</span>
                <span className="kpi__value">{customer.numberOfPendingOrders}</span>
              </div>
              <div className="kpi__block">
                <span className="kpi__label">Cancelled</span>
                <span className="kpi__value">{customer.numberOfCancelledOrders}</span>
              </div>
              <div className="kpi__block">
                <span className="kpi__label">Avg score</span>
                <span className="kpi__value">{customer.avgScore}</span>
              </div>
              <div className="kpi__block">
                <span className="kpi__label">Avg cleaning, €</span>
                <span className="kpi__value">{customer.avgOrder}</span>
              </div>
              <div className="kpi__block">
                <span className="kpi__label">Total spend, €</span>
                <span className="kpi__value">{customer.orderPriceSum}</span>
              </div>
            </div>
          </div>
          <div className={`block ${isAddressesExpanded ? 'expanded' : ''}`}>
            <div className="card__title-wrap" onClick={() => setIsAddressesExpanded((state) => !state)}>
              <svg
                className={isAddressesExpanded ? 'arrow rotated' : 'arrow'}
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path d="M6 10L12 16L18 10" stroke="#2329D6" strokeLinecap="round" />
              </svg>
              <h2 className="card__title">{`Addresses (${customer.addressesList.length})`}</h2>
            </div>
            <div className="block__table card__block">
              <ListTable data={customer.addressesList} columns={addressColumns} isClickable={true} />
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
              <h2 className="card__title">{`Requests (${customer.requestsList.length})`}</h2>
            </div>
            <div className="block__table card__block">
              <div className="data__tabs">
                <div
                  className={`data__tab ${requestsType === 'All' && 'active'}`}
                  onClick={() => setRequestsType('All')}
                >
                  {`All (${customer.requestsList.length})`}
                </div>
                <div
                  className={`data__tab ${requestsType === 'Cancelled' && 'active'}`}
                  onClick={() => setRequestsType('Cancelled')}
                >
                  {`Cancelled (${customer.cancelledOrdersList.length})`}
                </div>
              </div>
              <ListTable
                data={requestsType === 'All' ? customer.requestsList : customer.cancelledOrdersList}
                columns={requestsType === 'All' ? requestColumns.filter((_, i) => i !== 2) : cancelledRequestColumns}
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
                customer.cleaningsList.activeJobs.length + customer.cleaningsList.pastJobs.length
              })`}</h2>
            </div>
            <div className="block__table card__block">
              <div className="data__tabs">
                <div
                  className={`data__tab ${cleaningsType === 'Active' && 'active'}`}
                  onClick={() => setCleaningsType('Active')}
                >
                  {`Active (${customer.cleaningsList.activeJobs.length})`}
                </div>
                <div
                  className={`data__tab ${cleaningsType === 'Past' && 'active'}`}
                  onClick={() => setCleaningsType('Past')}
                >
                  {`Past (${customer.cleaningsList.pastJobs.length})`}
                </div>
              </div>
              <ListTable
                data={cleaningsType === 'Active' ? customer.cleaningsList.activeJobs : customer.cleaningsList.pastJobs}
                columns={cleaningsType === 'Active' ? cleaningColumns.slice(0, -3) : cleaningColumns}
                isClickable={true}
              />
            </div>
          </div>
          <div className={`block ${isSubscriptionsExpanded ? 'expanded' : ''}`}>
            <div className="card__title-wrap" onClick={() => setIsSubscriptionsExpanded((state) => !state)}>
              <svg
                className={isSubscriptionsExpanded ? 'arrow rotated' : 'arrow'}
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path d="M6 10L12 16L18 10" stroke="#2329D6" strokeLinecap="round" />
              </svg>
              <h2 className="card__title">{`Subscriptions (${
                customer.activeSubscriptionsList.length + customer.pastSubscriptionsList.length
              })`}</h2>
            </div>
            <div className="block__table card__block">
              <div className="data__tabs">
                <div
                  className={`data__tab ${subscriptionType === 'Active' && 'active'}`}
                  onClick={() => setSubscriptionType('Active')}
                >
                  {`Active (${customer.activeSubscriptionsList.length})`}
                </div>
                <div
                  className={`data__tab ${subscriptionType === 'Past' && 'active'}`}
                  onClick={() => setSubscriptionType('Past')}
                >
                  {`Past (${customer.pastSubscriptionsList.length})`}
                </div>
              </div>
              <ListTable
                data={subscriptionType === 'Active' ? customer.activeSubscriptionsList : customer.pastSubscriptionsList}
                columns={subscriptionType === 'Active' ? subscriptionColumns : pastSubscriptionColumns}
                isClickable={true}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Customer;
