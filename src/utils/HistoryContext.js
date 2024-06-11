import React, { createContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const HistoryContext = createContext();

export const HistoryProvider = ({ children }) => {
  const [history, setHistory] = useState(() => {
    const storedHistory = localStorage.getItem('history');
    return storedHistory ? JSON.parse(storedHistory) : [];
  });
  const location = useLocation();
  const { pathname } = location;

  useEffect(() => {
    const isNew =
      pathname.startsWith('/settings') ||
      pathname.startsWith('/cleaners') ||
      pathname.startsWith('/customers') ||
      pathname.startsWith('/requests') ||
      pathname.startsWith('/unconfirmed_requests') ||
      pathname.startsWith('/cancelled') ||
      pathname.startsWith('/jobs') ||
      pathname.startsWith('/adjustments');
    if (isNew) {
      setHistory([pathname]);
    } else {
      setHistory((prevHistory) => {
        const cleanHistory = prevHistory.map((str) => str.replace(/\//g, ''));
        const existingIndex = cleanHistory.indexOf(pathname.replace(/\//g, ''));
        if (existingIndex !== -1) {
          return prevHistory.slice(0, existingIndex + 1);
        }
        return [...prevHistory, pathname];
      });
    }
  }, [location]);

  useEffect(() => {
    const handlePopState = () => {
      const previousPath = history[history.length - 2];

      if (pathname.replace(/\//g, '') === previousPath.replace(/\//g, '')) {
        setHistory((prevHistory) => {
          if (prevHistory.length >= 2) {
            return prevHistory.slice(0, -2);
          }
          return prevHistory;
        });
      }
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  useEffect(() => {
    localStorage.setItem('history', JSON.stringify(history));
  }, [history]);

  console.log(history);

  return <HistoryContext.Provider value={history}>{children}</HistoryContext.Provider>;
};

export default HistoryContext;