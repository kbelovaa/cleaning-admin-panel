import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { auth } from '../../http/authAPI';
import { setIsAuthAction, setUserAction } from '../../store/actions/userActions';
import ScrollToTop from '../ScrollToTop/ScrollToTop';
import Sidebar from '../Sidebar/Sidebar';
import Home from '../Home/Home';
import Payments from '../Payments/Payments';
import Users from '../Users/Users';
import Orders from '../Orders/Orders';
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
  }, []);

  return (
    <BrowserRouter>
      <ScrollToTop />
      {loading ? (
        <div className="spinner"></div>
      ) : (
        <Routes>
          {isAuth ? (
            <Route path="/" element={<Sidebar />}>
              <Route index element={<Home />} />
              <Route path="payments" element={<Payments />} />
              <Route path="users" element={<Users />} />
              <Route path="orders" element={<Orders />} />
              <Route path="settings" element={<Settings />} />
              <Route path="holidays" element={<Holidays />} />
              <Route path="price_per_sqm" element={<PricePerSqm />} />
              <Route path="type_of_cleaning_coeff" element={<CleaningCoeff />} />
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
    </BrowserRouter>
  );
};

export default App;
