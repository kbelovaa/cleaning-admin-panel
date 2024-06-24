import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { auth } from '../../http/authAPI';
import { setIpCountryAction, setIsAuthAction, setUserAction } from '../../store/actions/userActions';
import { HistoryProvider } from '../../utils/HistoryContext';
import ScrollToTop from '../ScrollToTop/ScrollToTop';
import Sidebar from '../Sidebar/Sidebar';
import Home from '../Home/Home';
import Cleaners from '../Lists/Cleaners';
import Customers from '../Lists/Customers';
import Jobs from '../Lists/Jobs';
import JobsAdjustment from '../Lists/JobsAdjustment';
import JobsCancelled from '../Lists/JobsCancelled';
import Requests from '../Lists/Requests';
import RequestsUnconfirmed from '../Lists/RequestsUnconfirmed';
import RequestsCancelled from '../Lists/RequestsCancelled';
import Cleaner from '../Cleaner/Cleaner';
import Registration from '../Registration/Registration';
import Customer from '../Customer/Customer';
import Address from '../Address/Address';
import Cleaning from '../Cleaning/Cleaning';
import Subscription from '../Subscription/Subscription';
import Settings from '../Settings/Settings';
import Authorization from '../Authorization/Authorization';
import Holidays from '../Pricing/Holidays';
import PricePerSqm from '../Pricing/PricePerSqm';
import CleaningCoeff from '../Pricing/CleaningCoeff';
import CleaningTypes from '../Pricing/CleaningTypes';
import ExtraServices from '../Pricing/ExtraServices';
import PropertyPricing from '../Pricing/PropertyPricing';
import Tariffs from '../Pricing/Tariffs';
import HowQuickly from '../Pricing/HowQuickly';
import SalaryFormula from '../Pricing/SalaryFormula/SalaryFormula';
import '../../utils/i18n';
import './App.scss';

const App = () => {
  const isAuth = useSelector((state) => state.user.isAuth);

  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  const { i18n } = useTranslation();

  useEffect(() => {
    const getUser = async () => {
      const result = await auth();

      if (!result.message && result.role === 'admin') {
        dispatch(setIsAuthAction(true));
        dispatch(setUserAction(result));
      }

      setLoading(false);
    };

    getUser();

    const getCountryFromIP = async () => {
      try {
        const response = await axios.get('https://ipinfo.io/json?token=353f74029ca066');
        const countryCode = response.data.country;
        dispatch(setIpCountryAction(countryCode.toLowerCase()));

        return countryCode.toLowerCase();
      } catch {
        dispatch(setIpCountryAction(''));
      }
    };

    const countryCode = getCountryFromIP();

    const setLang = (lng) => {
      i18n.changeLanguage(lng);
      document.documentElement.lang = lng;
    };

    const storedLanguage = localStorage.getItem('language');

    if (storedLanguage) {
      setLang(storedLanguage);
    } else if (Object.keys(i18n.options.resources).includes(countryCode)) {
      setLang(countryCode);
    }
  }, []);

  return (
    <BrowserRouter>
      <HistoryProvider>
        <ScrollToTop />
        {loading ? (
          <div className="spinner"></div>
        ) : (
          <Routes>
            {isAuth ? (
              <Route path="/" element={<Sidebar />}>
                <Route index element={<Home />} />
                <Route path="cleaners" element={<Cleaners />} />
                <Route path="register/form" element={<Registration />} />
                <Route path="register/discover" element={<Registration />} />
                <Route path="register/summary" element={<Registration />} />
                <Route path="customers" element={<Customers />} />
                <Route path="jobs" element={<Jobs />} />
                <Route path="adjustments" element={<JobsAdjustment />} />
                <Route path="cancelled_jobs" element={<JobsCancelled />} />
                <Route path="requests" element={<Requests />} />
                <Route path="unconfirmed_requests" element={<RequestsUnconfirmed />} />
                <Route path="cancelled_requests" element={<RequestsCancelled />} />
                <Route path="cleaner/:id" element={<Cleaner />} />
                <Route path="customer/:id" element={<Customer />} />
                <Route path="address/:id" element={<Address />} />
                <Route path="cleaning/:id" element={<Cleaning />} />
                <Route path="subscription/:id" element={<Subscription />} />
                <Route path="settings" element={<Settings />} />
                <Route path="holidays" element={<Holidays />} />
                <Route path="price_per_sqm" element={<PricePerSqm />} />
                <Route path="type_of_cleaning_coefficient" element={<CleaningCoeff />} />
                <Route path="type_of_cleanings" element={<CleaningTypes />} />
                <Route path="extra_services" element={<ExtraServices />} />
                <Route path="property_info" element={<PropertyPricing />} />
                <Route path="how_quickly" element={<HowQuickly />} />
                <Route path="tariffs" element={<Tariffs />} />
                <Route path="salary_formula" element={<SalaryFormula />} />
              </Route>
            ) : (
              <Route path="/" element={<Authorization />} />
            )}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        )}
      </HistoryProvider>
    </BrowserRouter>
  );
};

export default App;
