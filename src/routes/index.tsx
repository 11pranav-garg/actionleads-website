import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { trackPageView } from '../utils/analytics';
import Home from '../pages/Home';
import Contact from '../pages/Contact';
import Pricing from '../pages/Pricing';
import RequestLeads from '../pages/RequestLeads';
import CheckStatus from '../pages/CheckStatus';
import PrivacyPolicy from '../pages/PrivacyPolicy';
import TermsOfService from '../pages/TermsOfService';
import CookiePolicy from '../pages/CookiePolicy';
import PaymentSuccess from '../pages/PaymentSuccess';
import ThankYou from '../pages/ThankYou';

// Page titles mapping
const pageTitles: { [key: string]: string } = {
  '/': 'ActionLeads - Affordable Apollo Data',
  '/contact': 'Contact Us - ActionLeads',
  '/pricing': 'Pricing - ActionLeads',
  '/request-leads': 'Request Leads - ActionLeads',
  '/check-status': 'Check Status - ActionLeads',
  '/privacy': 'Privacy Policy - ActionLeads',
  '/terms': 'Terms of Service - ActionLeads',
  '/cookies': 'Cookie Policy - ActionLeads',
  '/payment-success': 'Payment Successful - ActionLeads',
  '/thank-you': 'Thank You - ActionLeads',
};

const AppRoutes = () => {
  const location = useLocation();
  
  useEffect(() => {
    // Track page view on route change
    const pageTitle = pageTitles[location.pathname] || 'ActionLeads';
    trackPageView(location.pathname, pageTitle);
  }, [location]);
  
  return (
    <Routes location={location}>
      <Route path="/" element={<Home />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/request-leads" element={<RequestLeads />} />
      <Route path="/check-status" element={<CheckStatus />} />
      <Route path="/privacy" element={<PrivacyPolicy />} />
      <Route path="/terms" element={<TermsOfService />} />
      <Route path="/cookies" element={<CookiePolicy />} />
      <Route path="/payment-success" element={<PaymentSuccess />} />
      <Route path="/thank-you" element={<ThankYou />} />
    </Routes>
  );
};

export default AppRoutes;