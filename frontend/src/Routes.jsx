import React from "react";
import { Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import UserLogin from './pages/user-login';
import MainDashboard from './pages/main-dashboard';
import ApplicationTracker from './pages/application-tracker';
import InternshipRecommendations from './pages/internship-recommendations';
import UserProfileManagement from './pages/user-profile-management';
import UserRegistration from './pages/user-registration';
import Settings from 'pages/Settings';

const Routes = () => {
  return (
    <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<ApplicationTracker />} />
        <Route path="/user-login" element={<UserLogin />} />
        <Route path="/main-dashboard" element={<MainDashboard />} />
        <Route path="/application-tracker" element={<ApplicationTracker />} />
        <Route path="/internship-recommendations" element={<InternshipRecommendations />} />
        <Route path="/user-profile-management" element={<UserProfileManagement />} />
        <Route path="/user-registration" element={<UserRegistration />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
    </ErrorBoundary>
  );
};

export default Routes;
