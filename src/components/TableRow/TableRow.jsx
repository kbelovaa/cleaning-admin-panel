import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import ellipsisSvg from '../../images/ellipsis.svg';
import closeSvg from '../../images/close.svg';
import tickSvg from '../../images/tick.svg';
import './TableRow.scss';

const TableRow = ({
  id,
  index,
  values,
  setValues,
  items,
  setItems,
  provided,
  isDragging,
  startTimer,
  saveDeletedItem,
}) => {
  const [isActionsOpen, setIsActionsOpen] = useState(false);
  const [valuesState, setValuesState] = useState(values);
  const [isEditMode, setIsEditMode] = useState(false);

  const actionsRef = useRef(null);
  const actionsIconRef = useRef(null);
  const editWindowRef = useRef(null);

  const { pathname } = useLocation();

  const isProperty = pathname.startsWith('/property_info');
  const isSpeed = pathname.startsWith('/how_quickly');
  const isSalary = pathname.startsWith('/salary_formula');

  const { t } = useTranslation();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        actionsRef.current &&
        !actionsRef.current.contains(e.target) &&
        actionsIconRef.current &&
        !actionsIconRef.current.contains(e.target)
      ) {
        setIsActionsOpen(false);
      }
    };

    if (isActionsOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isActionsOpen]);

  const closeEditRow = () => {
    setIsEditMode(false);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (editWindowRef.current && !editWindowRef.current.contains(e.target)) {
        closeEditRow();
      }
    };

    if (isEditMode) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isEditMode]);

  const openActions = () => {
    setIsActionsOpen((state) => !state);
  };

  const openEditRow = () => {
    setIsActionsOpen(false);
    setIsEditMode(true);
  };

  const saveEditRow = () => {
    setValues(index, ...valuesState);
    closeEditRow();
  };

  const deleteRow = () => {
    const deletedItem = items.find((elem) => elem._id === id);
    saveDeletedItem(deletedItem);
    startTimer();
    setItems((state) => state.filter((elem) => elem._id !== id));
  };

  const editValue = (e, index) => {
    setValuesState((state) => {
      const newState = [...state];
      newState[index] = e.target.value;
      return newState;
    });
  };

  if (isEditMode) {
    return (
      <tr className="pricing__edit-row">
        <div className={`pricing__edit-window col-${values.length} editing`} ref={editWindowRef}>
          <div className="pricing__edit-line">
            {values.map((value, index) => (
              <div key={index} className="pricing__edit-wrap">
                <span className="pricing__edit-value">{value}</span>
              </div>
            ))}
            <div className="pricing__edit-icon icon" onClick={closeEditRow}>
              <img src={closeSvg} alt="close" />
            </div>
          </div>
          <div className="pricing__edit-line">
            {values.map((_, index) => (
              <div key={index} className="pricing__edit-wrap">
                <input
                  className={`pricing__edit-input ${
                    (isProperty || isSpeed || isSalary) && index === 0 ? 'disabled' : ''
                  }`}
                  type="text"
                  value={valuesState[index]}
                  onChange={(e) => editValue(e, index)}
                  autoFocus={
                    ((isProperty || isSpeed || isSalary) && index === 1) ||
                    (!isProperty && !isSpeed && !isSalary && index === 0)
                  }
                />
              </div>
            ))}
            <div className="pricing__edit-icon icon" onClick={saveEditRow}>
              <img src={tickSvg} alt="tick" />
            </div>
          </div>
        </div>
      </tr>
    );
  }

  return (
    <tr className={isDragging ? 'dragging' : ''} ref={provided.innerRef} {...provided.draggableProps}>
      <td>
        {!isProperty && !isSpeed && !isSalary && (
          <span className="rerange" {...provided.dragHandleProps}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M6 10H18" stroke="#D9D9D9" strokeLinecap="round" />
              <path d="M6 6H18" stroke="#D9D9D9" strokeLinecap="round" />
              <path d="M6 14H18" stroke="#D9D9D9" strokeLinecap="round" />
              <path d="M6 18H18" stroke="#D9D9D9" strokeLinecap="round" />
            </svg>
          </span>
        )}
        <span className={`pricing__cell ${isProperty || isSpeed || isSalary ? 'non-dragable' : ''}`}>
          {t(values[0])}
        </span>
      </td>
      {(values[1] || values[1] === 0) && <td>{values[1]}</td>}
      {(values[2] || values[2] === 0) && <td>{values[2]}</td>}
      {(values[3] || values[3] === 0) && <td>{values[3]}</td>}
      {(values[4] || values[4] === 0) && <td>{values[4]}</td>}
      <td>
        <div className="actions">
          <div className="icon" ref={actionsIconRef} onClick={openActions}>
            <img src={ellipsisSvg} alt="ellipsis" />
          </div>
          <div className={isActionsOpen ? 'actions__window' : 'hidden'} ref={actionsRef}>
            <ul className="actions__list">
              <li className="actions__item" onClick={openEditRow}>
                <svg
                  className="actions__icon"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M15.5858 4.41421C16.3668 3.63317 17.6332 3.63317 18.4142 4.41421L19.5858 5.58579C20.3668 6.36684 20.3668 7.63316 19.5858 8.41421L8.58579 19.4142C8.21071 19.7893 7.70201 20 7.17157 20L4 20L4 16.8284C4 16.298 4.21071 15.7893 4.58579 15.4142L15.5858 4.41421Z"
                    stroke="#2329D6"
                  />
                  <path d="M14 6L18 10" stroke="#2329D6" />
                </svg>
                <span className="actions__label">{t('edit')}</span>
              </li>
              <li className={isProperty || isSpeed || isSalary ? 'hidden' : 'actions__item'} onClick={deleteRow}>
                <svg
                  className="actions__icon"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path d="M19 6H5" stroke="#2329D6" strokeLinecap="round" />
                  <path d="M14 5H10" stroke="#2329D6" strokeLinecap="round" />
                  <path d="M6 10V21H18C18 20 18 10 18 10" stroke="#2329D6" strokeLinecap="round" />
                </svg>
                <span className="actions__label">{t('delete')}</span>
              </li>
            </ul>
          </div>
        </div>
      </td>
    </tr>
  );
};

export default TableRow;
