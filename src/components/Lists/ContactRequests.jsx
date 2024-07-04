import React, { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getContactRequests } from '../../http/listsAPI';
import { setContactRequestsAction } from '../../store/actions/listActions';
import { contactRequestCols } from '../../constants/tableColumns';
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';
import ListTable from './ListTable/ListTable';

const ContactRequests = () => {
  const contactRequests = useSelector((state) => state.list.contactRequests);

  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const result = await getContactRequests();

      if (result.status === 200) {
        dispatch(setContactRequestsAction(result.data.requests.reverse()));
        setLoading(false);
      }
    };

    if (contactRequests.length === 0) {
      fetchData();
    } else {
      setLoading(false);
    }
  }, []);

  const columns = useMemo(() => contactRequestCols, []);

  return (
    <div className="data">
      <Breadcrumbs />
      {loading ? (
        <div className="spinner"></div>
      ) : (
        <div className="data__table-wrap">
          <ListTable data={contactRequests} columns={columns} />
        </div>
      )}
    </div>
  );
};

export default ContactRequests;
