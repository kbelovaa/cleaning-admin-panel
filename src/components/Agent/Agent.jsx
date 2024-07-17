import React, { useContext, useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import HistoryContext from '../../utils/HistoryContext';
import { setAgentAction } from '../../store/actions/cardActions';
import { getAgent } from '../../http/cardsAPI';
import { customerCols } from '../../constants/tableColumns';
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';
import ListTable from '../Lists/ListTable/ListTable';
import './Agent.scss';

const Agent = () => {
  const agent = useSelector((state) => state.card.agent);

  const [isPersonalExpanded, setIsPersonalExpanded] = useState(false);
  const [isCustomersExpanded, setIsCustomersExpanded] = useState(false);

  const [loading, setLoading] = useState(true);

  const { id } = useParams();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const history = useContext(HistoryContext);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getAgent(id);

      if (result.status === 200) {
        dispatch(setAgentAction(result.data.agent));
        setLoading(false);
      }
    };

    if (!agent || agent.agentId !== id) {
      fetchData();
    } else {
      setLoading(false);
    }
  }, []);

  const goBack = () => {
    navigate(history[history.length - 2]);
  };

  const customersColumns = useMemo(() => customerCols, []);

  return (
    <div className="agent">
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
              <h2 className="card__title">{agent.name}</h2>
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
                  <span className="personal__text">Agency</span>
                  <span className="personal__text">Role</span>
                  <span className="personal__text">Email</span>
                  <span className="personal__text">Phone</span>
                </div>
                <div className="personal__values">
                  <span className="personal__text">{agent.agency}</span>
                  <span className="personal__text">{agent.role}</span>
                  <span className="personal__text">{agent.email}</span>
                  <span className="personal__text">{agent.mobile}</span>
                </div>
              </div>
            </div>
            <div className="kpi">
              <div className="kpi__block">
                <span className="kpi__label">Referred customers</span>
                <span className="kpi__value">0</span>
              </div>
              <div className="kpi__block">
                <span className="kpi__label">Comission, %</span>
                <span className="kpi__value">10</span>
              </div>
              <div className="kpi__block">
                <span className="kpi__label">Comission last month, €</span>
                <span className="kpi__value">0</span>
              </div>
              <div className="kpi__block">
                <span className="kpi__label">Comission total, €</span>
                <span className="kpi__value">0</span>
              </div>
              <div className="kpi__block">
                <span className="kpi__label">CAC Total</span>
                <span className="kpi__value">0</span>
              </div>
              <div className="kpi__block">
                <span className="kpi__label">Profit gross</span>
                <span className="kpi__value">0</span>
              </div>
            </div>
          </div>
          <div className={`block ${isCustomersExpanded ? 'expanded' : ''}`}>
            <div className="card__title-wrap" onClick={() => setIsCustomersExpanded((state) => !state)}>
              <svg
                className={isCustomersExpanded ? 'arrow rotated' : 'arrow'}
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path d="M6 10L12 16L18 10" stroke="#2329D6" strokeLinecap="round" />
              </svg>
              <h2 className="card__title">{`Referred customers (${0})`}</h2>
            </div>
            <div className="block__table card__block">
              <ListTable data={[]} columns={customersColumns} isClickable={true} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Agent;
