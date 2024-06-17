import React, { useContext, useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import HistoryContext from '../../utils/HistoryContext';
import { setCleaningAction } from '../../store/actions/cardActions';
import { getCleaning } from '../../http/cardsAPI';
import { getAdjustmentCols } from '../../constants/tableColumns';
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';
import ListTable from '../Lists/ListTable/ListTable';
import './Cleaning.scss';

const Cleaning = () => {
  const cleaning = useSelector((state) => state.card.cleaning);

  const [isDetailsExpanded, setIsDetailsExpanded] = useState(false);
  const [isPriceExpanded, setIsPriceExpanded] = useState(false);
  const [isFeedbackExpanded, setIsFeedbackExpanded] = useState(false);
  const [isAdjustmentsExpanded, setIsAdjustmentsExpanded] = useState(false);

  const [loading, setLoading] = useState(true);

  const { id } = useParams();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const history = useContext(HistoryContext);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getCleaning(id);

      if (result.status === 200) {
        dispatch(setCleaningAction(result.data.cleaning));
        setLoading(false);
      }
    };

    if (!cleaning || cleaning.cleaningId !== id) {
      fetchData();
    } else {
      setLoading(false);
    }
  }, []);

  const goBack = () => {
    navigate(history[history.length - 2]);
  };

  const adjustmentColumns = useMemo(() => getAdjustmentCols(navigate, true, false, true), []);

  const setOrder = (stageNumber) => {
    if (cleaning.status === 'Cancelled' && stageNumber > cleaning.stageNumber) {
      return stageNumber + 1;
    }

    return stageNumber;
  };

  return (
    <div className="cleaning">
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
              <h2 className="card__title">
                {cleaning.cleaningType} cleaning ({cleaning.date})
              </h2>
            </div>
            <div className={`status ${cleaning.status === 'Cancelled' ? 'cancelled' : ''}`}>
              <div
                className={`status__block ${cleaning.stageNumber < 1 ? 'status__block_inactive' : ''}`}
                style={{ order: setOrder(1) }}
              >
                <svg
                  className="status__tick"
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="24"
                  viewBox="0 0 25 24"
                  fill="none"
                >
                  <path d="M7.5 13L10.5 16L17.5 9" stroke="#2329D6" strokeLinecap="round" />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12.5 22C18.0228 22 22.5 17.5228 22.5 12C22.5 6.47715 18.0228 2 12.5 2C6.97715 2 2.5 6.47715 2.5 12C2.5 17.5228 6.97715 22 12.5 22Z"
                    stroke="#2329D6"
                  />
                </svg>
                <span className="status__label">New</span>
                <span className="status__payment">Not paid</span>
              </div>
              <div
                className={`status__line ${cleaning.stageNumber < 2 ? 'status__line_inactive' : ''}`}
                style={{ order: setOrder(2) }}
              ></div>
              <div
                className={`status__block ${cleaning.stageNumber < 2 ? 'status__block_inactive' : ''}`}
                style={{ order: setOrder(2) }}
              >
                <svg
                  className="status__tick"
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="24"
                  viewBox="0 0 25 24"
                  fill="none"
                >
                  <path d="M7.5 13L10.5 16L17.5 9" stroke="#2329D6" strokeLinecap="round" />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12.5 22C18.0228 22 22.5 17.5228 22.5 12C22.5 6.47715 18.0228 2 12.5 2C6.97715 2 2.5 6.47715 2.5 12C2.5 17.5228 6.97715 22 12.5 22Z"
                    stroke="#2329D6"
                  />
                </svg>
                <span className="status__label">Invoiced</span>
                <span className="status__payment">Awaiting payment</span>
              </div>
              <div
                className={`status__line ${cleaning.stageNumber < 3 ? 'status__line_inactive' : ''}`}
                style={{ order: setOrder(3) }}
              ></div>
              <div
                className={`status__block ${cleaning.stageNumber < 3 ? 'status__block_inactive' : ''}`}
                style={{ order: setOrder(3) }}
              >
                <svg
                  className="status__tick"
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="24"
                  viewBox="0 0 25 24"
                  fill="none"
                >
                  <path d="M7.5 13L10.5 16L17.5 9" stroke="#2329D6" strokeLinecap="round" />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12.5 22C18.0228 22 22.5 17.5228 22.5 12C22.5 6.47715 18.0228 2 12.5 2C6.97715 2 2.5 6.47715 2.5 12C2.5 17.5228 6.97715 22 12.5 22Z"
                    stroke="#2329D6"
                  />
                </svg>
                <span className="status__label">Awaiting confirmation</span>
                <span className="status__payment">Payment reserved</span>
              </div>
              <div
                className={`status__line ${cleaning.stageNumber < 4 ? 'status__line_inactive' : ''}`}
                style={{ order: setOrder(4) }}
              ></div>
              <div
                className={`status__block ${cleaning.stageNumber < 4 ? 'status__block_inactive' : ''}`}
                style={{ order: setOrder(4) }}
              >
                <svg
                  className="status__tick"
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="24"
                  viewBox="0 0 25 24"
                  fill="none"
                >
                  <path d="M7.5 13L10.5 16L17.5 9" stroke="#2329D6" strokeLinecap="round" />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12.5 22C18.0228 22 22.5 17.5228 22.5 12C22.5 6.47715 18.0228 2 12.5 2C6.97715 2 2.5 6.47715 2.5 12C2.5 17.5228 6.97715 22 12.5 22Z"
                    stroke="#2329D6"
                  />
                </svg>
                <span className="status__label">Confirmed</span>
              </div>
              <div
                className={`status__line ${cleaning.stageNumber < 5 ? 'status__line_inactive' : ''}`}
                style={{ order: setOrder(5) }}
              ></div>
              <div
                className={`status__block ${cleaning.stageNumber < 5 ? 'status__block_inactive' : ''}`}
                style={{ order: setOrder(5) }}
              >
                <svg
                  className="status__tick"
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="24"
                  viewBox="0 0 25 24"
                  fill="none"
                >
                  <path d="M7.5 13L10.5 16L17.5 9" stroke="#2329D6" strokeLinecap="round" />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12.5 22C18.0228 22 22.5 17.5228 22.5 12C22.5 6.47715 18.0228 2 12.5 2C6.97715 2 2.5 6.47715 2.5 12C2.5 17.5228 6.97715 22 12.5 22Z"
                    stroke="#2329D6"
                  />
                </svg>
                <span className="status__label">In progress</span>
              </div>
              <div
                className={`status__line ${cleaning.stageNumber < 6 ? 'status__line_inactive' : ''}`}
                style={{ order: setOrder(6) }}
              ></div>
              <div
                className={`status__block ${cleaning.stageNumber < 6 ? 'status__block_inactive' : ''}`}
                style={{ order: setOrder(6) }}
              >
                <svg
                  className="status__tick"
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="24"
                  viewBox="0 0 25 24"
                  fill="none"
                >
                  <path d="M7.5 13L10.5 16L17.5 9" stroke="#2329D6" strokeLinecap="round" />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12.5 22C18.0228 22 22.5 17.5228 22.5 12C22.5 6.47715 18.0228 2 12.5 2C6.97715 2 2.5 6.47715 2.5 12C2.5 17.5228 6.97715 22 12.5 22Z"
                    stroke="#2329D6"
                  />
                </svg>
                <span className="status__label">Completed</span>
                <span className="status__payment">Paid</span>
              </div>
              {cleaning.status === 'Cancelled' && (
                <div className="status__line" style={{ order: cleaning.stageNumber + 1 }}></div>
              )}
              {cleaning.status === 'Cancelled' && (
                <div className="status__block" style={{ order: cleaning.stageNumber + 1 }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12.4999 22C18.0228 22 22.4999 17.5228 22.4999 12C22.4999 6.47715 18.0228 2 12.4999 2C6.97709 2 2.49994 6.47715 2.49994 12C2.49994 17.5228 6.97709 22 12.4999 22Z"
                      stroke="#BE0F0F"
                    />
                    <path d="M5.49994 5L19.4999 19" stroke="#BE0F0F" strokeLinecap="square" />
                  </svg>
                  <span className="status__label">Cancelled</span>
                  <span className="status__payment">Refund</span>
                </div>
              )}
            </div>
          </div>
          <div className="card__block">
            <div className={`personal ${isDetailsExpanded ? 'expanded' : ''}`}>
              <div className="personal__wrap" onClick={() => setIsDetailsExpanded((state) => !state)}>
                <svg
                  className={isDetailsExpanded ? 'arrow rotated' : 'arrow'}
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path d="M6 10L12 16L18 10" stroke="#2329D6" strokeLinecap="round" />
                </svg>
                <h3 className="personal__title">Details</h3>
              </div>
              <div className="personal__info">
                <div className="personal__values">
                  {cleaning.cleaners.map((cleaner, i) => (
                    <span key={i} className="personal__text">
                      {!cleaner.cleanerId && <span className="personal__text_warning">!</span>}
                      Cleaner {i + 1}
                    </span>
                  ))}
                  <span className="personal__text">Customer</span>
                  <span className="personal__text">Date</span>
                  <span className="personal__text">Time</span>
                  <span className="personal__text">Type of cleaning</span>
                  <span className="personal__text">Extra services</span>
                  <span className="personal__text">How fast</span>
                  <span className="personal__text">Special instructions</span>
                  <span className="personal__text">Address</span>
                  {cleaning.isRecurring && <span className="personal__text">Subscription</span>}
                </div>
                <div className="personal__values">
                  {cleaning.cleaners.map((cleaner, i) => {
                    if (cleaner.cleanerId) {
                      return (
                        <span key={i} className="personal__text link">
                          <a href={`/cleaner/${cleaner.cleanerId}`}>{cleaner.cleanerName}</a>
                        </span>
                      );
                    }
                    return (
                      <div className="personal__add">
                        <svg
                          className="personal__add-icon"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path d="M20 12H4" stroke="#2329D6" strokeLinecap="round" />
                          <path d="M12 4V20" stroke="#2329D6" strokeLinecap="round" />
                        </svg>
                        <span className="personal__add-label">Add cleaner</span>
                      </div>
                    );
                  })}
                  <span className="personal__text link">
                    <a href={`/customer/${cleaning.customerId}`}>{cleaning.customer}</a>
                  </span>
                  <span className="personal__text">{cleaning.date}</span>
                  <span className="personal__text">{cleaning.time}</span>
                  <span className="personal__text">{cleaning.cleaningType}</span>
                  <span className="personal__text">{cleaning.extraServices}</span>
                  <span className="personal__text">{cleaning.howFast}</span>
                  <span className="personal__text">{cleaning.specialInstructions}</span>
                  <span className="personal__text link">
                    <a href={`/address/${cleaning.addressId}`}>{cleaning.fullAddress}</a>
                  </span>
                  {cleaning.isRecurring && (
                    <span className="personal__text link">
                      <a href={`/subscription/${cleaning.subscriptionId}`}>{cleaning.subscriptionInfo}</a>
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className={`personal ${isPriceExpanded ? 'expanded' : ''}`}>
              <div className="personal__wrap" onClick={() => setIsPriceExpanded((state) => !state)}>
                <svg
                  className={isPriceExpanded ? 'arrow rotated' : 'arrow'}
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path d="M6 10L12 16L18 10" stroke="#2329D6" strokeLinecap="round" />
                </svg>
                <h3 className="personal__title">Price</h3>
              </div>
              <div className="personal__info">
                <div className="personal__values">
                  <span className="personal__text">Price (Customer)</span>
                  <span className="personal__text">Price (Cleaner)</span>
                  <span className="personal__text">IVA ({cleaning.ivaPercent}%)</span>
                  <span className="personal__text">
                    Social security ({((1 - 1 / cleaning.socialSecurityPercent) * 100).toFixed(2)}%)
                  </span>
                  <span className="personal__text">SDL Fee ({cleaning.feePercent}%)</span>
                </div>
                <div className="personal__values">
                  <span className="personal__text">{cleaning.price}</span>
                  <span className="personal__text">{cleaning.salary}</span>
                  <span className="personal__text">{cleaning.iva}</span>
                  <span className="personal__text">{cleaning.socialSecurity}</span>
                  <span className="personal__text">{cleaning.fee}</span>
                </div>
              </div>
            </div>
            {cleaning.stageNumber === 6 && (
              <div className={`personal ${isFeedbackExpanded ? 'expanded' : ''}`}>
                <div className="personal__wrap" onClick={() => setIsFeedbackExpanded((state) => !state)}>
                  <svg
                    className={isFeedbackExpanded ? 'arrow rotated' : 'arrow'}
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path d="M6 10L12 16L18 10" stroke="#2329D6" strokeLinecap="round" />
                  </svg>
                  <h3 className="personal__title">Feedback</h3>
                </div>
                <div className="personal__info">
                  <div className="personal__values">
                    <span className="personal__text">Rating</span>
                    <span className="personal__text">Client feedback</span>
                    {cleaning.cleaners.map((cleaner, i) => (
                      <span key={i} className="personal__text">
                        Cleaner {i + 1} feedback (
                        <a className="link" href={`/cleaner/${cleaner.cleanerId}`}>
                          {cleaner.cleanerName}
                        </a>
                        )
                      </span>
                    ))}
                  </div>
                  <div className="personal__values">
                    <span className="personal__text">{cleaning.rating}</span>
                    <span className="personal__text">{cleaning.clientFeedbackText}</span>
                    {cleaning.cleaners.map((cleaner, i) => (
                      <span key={i} className="personal__text">
                        {cleaner.cleanerFeedbackText}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
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
              <h2 className="card__title">{`Adjustments (${cleaning.adjustments.length})`}</h2>
            </div>
            <div className="block__table card__block">
              <ListTable
                data={cleaning.adjustments}
                columns={adjustmentColumns.filter((_, i) => i !== 1)}
                isClickable={false}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cleaning;
