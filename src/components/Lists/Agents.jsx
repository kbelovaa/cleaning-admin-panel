import React, { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllAgents } from '../../http/listsAPI';
import { setAgentsAction } from '../../store/actions/listActions';
import { agentCols } from '../../constants/tableColumns';
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';
import ListTable from './ListTable/ListTable';

const Agents = () => {
  const agents = useSelector((state) => state.list.agents);

  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const result = await getAllAgents();

      if (result.status === 200) {
        dispatch(setAgentsAction(result.data.agents.reverse()));
        setLoading(false);
      }
    };

    if (agents.length === 0) {
      fetchData();
    } else {
      setLoading(false);
    }
  }, []);

  const columns = useMemo(() => agentCols, []);

  return (
    <div className="data">
      <Breadcrumbs />
      {loading ? (
        <div className="spinner"></div>
      ) : (
        <div className="data__table-wrap">
          <ListTable data={agents} columns={columns} isClickable={true} />
        </div>
      )}
    </div>
  );
};

export default Agents;
