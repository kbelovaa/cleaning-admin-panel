import React, { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllCleaners } from '../../http/listsAPI';
import { setCleanersAction } from '../../store/actions/listActions';
import { cleanerCols } from '../../constants/tableColumns';
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';
import ListTable from './ListTable/ListTable';

const Cleaners = () => {
  const cleaners = useSelector((state) => state.list.cleaners);

  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const result = await getAllCleaners();

      if (result.status === 200) {
        dispatch(setCleanersAction(result.data.cleaners.reverse()));
        setLoading(false);
      }
    };

    if (cleaners.length === 0) {
      fetchData();
    } else {
      setLoading(false);
    }
  }, []);

  const columns = useMemo(() => cleanerCols, []);

  return (
    <div className="data">
      <Breadcrumbs />
      {loading ? (
        <div className="spinner"></div>
      ) : (
        <div className="data__table-wrap">
          <ListTable data={cleaners} columns={columns} isClickable={true} />
        </div>
      )}
    </div>
  );
};

export default Cleaners;
