import React, { useContext, useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import HistoryContext from '../../utils/HistoryContext';
import { setAddressAction } from '../../store/actions/cardActions';
import { getAddress } from '../../http/cardsAPI';
import { getAdjustmentCols, getCancelledRequestCols, getJobCols, getRequestCols } from '../../constants/tableColumns';
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';
import ListTable from '../Lists/ListTable/ListTable';
import './Address.scss';

const Address = () => {
  const address = useSelector((state) => state.card.address);

  const [isInfoExpanded, setIsInfoExpanded] = useState(false);
  const [isRequestsExpanded, setIsRequestsExpanded] = useState(false);
  const [isCleaningsExpanded, setIsCleaningsExpanded] = useState(false);
  const [isAdjustmentsExpanded, setIsAdjustmentsExpanded] = useState(false);

  const [requestsType, setRequestsType] = useState('All');
  const [cleaningsType, setCleaningsType] = useState('Active');

  const [loading, setLoading] = useState(true);

  const { id } = useParams();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const history = useContext(HistoryContext);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getAddress(id);

      if (result.status === 200) {
        dispatch(setAddressAction(result.data.address));
        setLoading(false);
      }
    };

    if (!address || address.addressId !== id) {
      fetchData();
    } else {
      setLoading(false);
    }
  }, []);

  const goBack = () => {
    navigate(history[history.length - 2]);
  };

  const requestColumns = useMemo(() => getRequestCols(navigate), []);
  const cancelledRequestColumns = useMemo(() => getCancelledRequestCols(navigate, true), []);
  const cleaningColumns = useMemo(() => getJobCols(navigate), []);
  const adjustmentColumns = useMemo(() => getAdjustmentCols(navigate, true), []);

  return (
    <div className="address">
      <Breadcrumbs />
      {loading ? (
        <div className="spinner"></div>
      ) : (
        <div className="card">
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
            <h2 className="card__title">{`Address №${address.orderNr}`}</h2>
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
                <span className="personal__text">Address 1</span>
                <span className="personal__text">Address 2</span>
                <span className="personal__text">City</span>
                <span className="personal__text">Province</span>
                <span className="personal__text">Postal code</span>
              </div>
              <div className="personal__values">
                <span className="personal__text link" onClick={() => navigate(`/customer/${address.customerId}`)}>{address.customer}</span>
                <span className="personal__text">{address.address1}</span>
                <span className="personal__text">{address.address2}</span>
                <span className="personal__text">{address.city}</span>
                <span className="personal__text">{address.province}</span>
                <span className="personal__text">{address.postalCode}</span>
              </div>
            </div>
          </div>
          <div className="kpi">
            <div className="kpi__block">
              <span className="kpi__label">sqm</span>
              <span className="kpi__value">{address.sqm}</span>
            </div>
            <div className="kpi__block">
              <span className="kpi__label">Living rooms</span>
              <span className="kpi__value">{address.livingRooms}</span>
            </div>
            <div className="kpi__block">
              <span className="kpi__label">Bedrooms</span>
              <span className="kpi__value">{address.bedrooms}</span>
            </div>
            <div className="kpi__block">
              <span className="kpi__label">Bathrooms</span>
              <span className="kpi__value">{address.bathrooms}</span>
            </div>
            <div className="kpi__block">
              <span className="kpi__label">Kitchens</span>
              <span className="kpi__value">{address.kitchens}</span>
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
                address.requests.length + address.cancelledRequests.length
              })`}</h2>
            </div>
            <div className="block__table">
              <div className="data__tabs">
                <div
                  className={`data__tab ${requestsType === 'All' && 'active'}`}
                  onClick={() => setRequestsType('All')}
                >
                  {`All (${address.requests.length})`}
                </div>
                <div
                  className={`data__tab ${requestsType === 'Cancelled' && 'active'}`}
                  onClick={() => setRequestsType('Cancelled')}
                >
                  {`Cancelled (${address.cancelledRequests.length})`}
                </div>
              </div>
              <ListTable
                data={requestsType === 'All' ? address.requests : address.cancelledRequests}
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
                address.cleaningsList.activeJobs.length + address.cleaningsList.pastJobs.length
              })`}</h2>
            </div>
            <div className="block__table">
              <div className="data__tabs">
                <div
                  className={`data__tab ${cleaningsType === 'Active' && 'active'}`}
                  onClick={() => setCleaningsType('Active')}
                >
                  {`Active (${address.cleaningsList.activeJobs.length})`}
                </div>
                <div
                  className={`data__tab ${cleaningsType === 'Past' && 'active'}`}
                  onClick={() => setCleaningsType('Past')}
                >
                  {`Past (${address.cleaningsList.pastJobs.length})`}
                </div>
              </div>
              <ListTable
                data={cleaningsType === 'Active' ? address.cleaningsList.activeJobs : address.cleaningsList.pastJobs}
                columns={
                  cleaningsType === 'Active'
                    ? cleaningColumns.slice(0, -3).filter((_, i) => i !== 9 && i !== 10 && i !== 11)
                    : cleaningColumns.filter((_, i) => i !== 9 && i !== 10 && i !== 11)
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
              <h2 className="card__title">{`Adjustments (${address.adjustments.length})`}</h2>
            </div>
            <div className="block__table">
              <ListTable data={address.adjustments} columns={adjustmentColumns} isClickable={false} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Address;
