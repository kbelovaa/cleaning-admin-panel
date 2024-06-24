import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';
import './CustomSelect.scss';

const CustomSelect = ({ options, selectedOption, setSelectedOption, defaultOption, noTranslation }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef(null);

  const { t } = useTranslation();

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (selectRef.current && !selectRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    if (isOpen) {
      const scrollbar = document.getElementsByClassName('scrollbar-container')[0];
      scrollbar.scrollTop = 1;
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="custom-select" ref={selectRef}>
      <div className={`selected-option ${!selectedOption ? 'invalid-field' : ''}`} onClick={() => setIsOpen(!isOpen)}>
        <span className={`selected-option__name ${defaultOption && !selectedOption ? 'default' : ''}`}>
          {defaultOption && !selectedOption
            ? noTranslation
              ? defaultOption
              : t(defaultOption)
            : noTranslation
            ? selectedOption
            : t(selectedOption)}
        </span>
        <svg
          className={`arrow ${isOpen ? 'rotated' : ''}`}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path d="M6 10L12 16L18 10" stroke="#000000" strokeLinecap="round" />
        </svg>
      </div>
      {isOpen && (
        <div className="options-wrapper">
          <PerfectScrollbar
            options={{
              wheelPropagation: false,
              autoHide: false,
            }}
          >
            <ul className="options-list">
              {options.map((option, index) => (
                <li key={index} onClick={() => handleOptionSelect(option)}>
                  {noTranslation ? option : t(option)}
                </li>
              ))}
            </ul>
          </PerfectScrollbar>
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
