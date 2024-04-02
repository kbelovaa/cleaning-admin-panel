import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import closeSvg from '../../images/close.svg';
import tickSvg from '../../images/tick.svg';
import TableRow from '../TableRow/TableRow';
import './Table.scss';

const Table = ({ items, setItems, header, keys }) => {
  const [timer, setTimer] = useState(0);
  const [timerId, setTimerId] = useState();
  const [deletedItem, setDeletedItem] = useState({});
  const [isAddingMode, setIsAddingMode] = useState(false);
  const [addingRow, setAddingRow] = useState(keys.map(() => ''));

  const { t } = useTranslation();

  const { pathname } = useLocation();

  const isProperty = pathname === '/property_info';
  const isSpeed = pathname === '/how_quickly';
  const isSalary = pathname === '/salary_formula';

  const addWindowRef = useRef(null);

  const openAddingRow = () => {
    setIsAddingMode(true);
  };

  const closeAddingRow = () => {
    setIsAddingMode(false);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (addWindowRef.current && !addWindowRef.current.contains(e.target)) {
        closeAddingRow();
      }
    };

    if (isAddingMode) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isAddingMode]);

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const values = Array.from(items);
    const [reorderedItem] = values.splice(result.source.index, 1);
    values.splice(result.destination.index, 0, reorderedItem);

    setItems(values);
  };

  function updateItems(...args) {
    setItems((state) => {
      const newState = [...state];
      keys.forEach((key, index) => {
        newState[args[0]][key] = args[index + 1];
      });
      return newState;
    });
  }

  const startTimer = () => {
    clearInterval(timerId);
    setTimer(5);

    const timer = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);

    setTimerId(timer);

    setTimeout(() => {
      clearInterval(timer);
    }, 5000);
  };

  const saveDeletedItem = (index, item) => {
    setDeletedItem({ item, index });
  };

  const undoDeletion = () => {
    setItems((state) => {
      const newState = [...state];
      newState.splice(deletedItem.index, 0, deletedItem.item);
      return newState;
    });
    setTimer(0);
    clearInterval(timerId);
  };

  const editValue = (e, index) => {
    setAddingRow((state) => {
      const newState = [...state];
      newState[index] = e.target.value;
      return newState;
    });
  };

  const addRow = () => {
    const newRow = { _id: `${Math.floor(Math.random() * 100) + 1}` };
    keys.forEach((key, index) => {
      newRow[key] = addingRow[index];
    });
    setItems((state) => [...state, newRow]);
    setAddingRow(keys.map(() => ''));
    closeAddingRow();
  };

  return (
    <div className="pricing">
      <DragDropContext onDragEnd={handleDragEnd}>
        <table className={`pricing__table col-${keys.length}`}>
          <thead>
            <tr>
              {header.map((elem, index) => (
                <th key={index}>{t(elem)}</th>
              ))}
              <th></th>
            </tr>
          </thead>
          <Droppable droppableId="items">
            {(provided, snapshot) => (
              <tbody {...provided.droppableProps} ref={provided.innerRef}>
                {items.map((item, index) => (
                  <Draggable key={item._id} draggableId={item._id} index={index}>
                    {(provided) => (
                      <TableRow
                        id={item._id}
                        index={index}
                        values={keys.map((key) => item[key])}
                        setValues={updateItems}
                        items={items}
                        setItems={setItems}
                        provided={provided}
                        isDragging={snapshot.isDraggingOver && snapshot.draggingOverWith === item._id}
                        startTimer={startTimer}
                        saveDeletedItem={(item) => saveDeletedItem(index, item)}
                      />
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </tbody>
            )}
          </Droppable>
        </table>
      </DragDropContext>
      {isAddingMode ? (
        <div className={`pricing__edit-window col-${keys.length}`} ref={addWindowRef}>
          <div className="pricing__edit-line">
            {keys.map((_, index) => (
              <div key={index} className="pricing__edit-wrap"></div>
            ))}
            <div className="pricing__edit-icon icon" onClick={closeAddingRow}>
              <img src={closeSvg} alt="close" />
            </div>
          </div>
          <div className="pricing__edit-line">
            {keys.map((_, index) => (
              <div key={index} className="pricing__edit-wrap">
                <input
                  className="pricing__edit-input"
                  type="text"
                  value={addingRow[index]}
                  onChange={(e) => editValue(e, index)}
                  autoFocus={index === 0}
                />
              </div>
            ))}
            <div className="pricing__edit-icon icon" onClick={addRow}>
              <img src={tickSvg} alt="tick" />
            </div>
          </div>
        </div>
      ) : (
        <span className={isProperty || isSpeed || isSalary ? 'hidden' : 'pricing__add'} onClick={openAddingRow}>
          {t('add')}
          <svg
            className="pricing__add-icon"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="17"
            viewBox="0 0 16 17"
            fill="none"
          >
            <path d="M13.3333 8.49992H2.66666" stroke="#D8D8D8" strokeLinecap="round" />
            <path d="M8.00001 3.16675V13.8334" stroke="#D8D8D8" strokeLinecap="round" />
          </svg>
        </span>
      )}
      <button className={`btn-undo ${timer > 0 ? '' : 'hidden'}`} onClick={undoDeletion}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M5 17V15C5 10.0294 8.80558 6 13.5 6C18.1944 6 22 10.0294 22 15"
            stroke="white"
            strokeLinecap="round"
          />
          <path d="M8 15L5 18L2 15" stroke="white" strokeLinecap="round" />
        </svg>
        <span className="btn-undo__label">{t('undo')}</span>
        <span className="btn-undo__timer">{`${timer} ${t('sec')}`}</span>
      </button>
    </div>
  );
};

export default Table;
