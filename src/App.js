import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { NotificationsProvider } from './context/NotificationsContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import LoginModal from './components/auth/LoginModal';
import RegisterModal from './components/auth/RegisterModal';
import Login from './components/Login';
import Home from './pages/Home';
import ScrollToTop from './components/ScrollToTop';

import Categories from './pages/Categories';
import About from './pages/About';
import Auctions from './pages/Auctions';

import Advertisement from './pages/Advertisement';
import Saved from './pages/Saved';
import ChineseCars from './pages/ChineseCars';
import CarDetails from './pages/CarDetails';
import PaymentPage from './pages/PaymentPage';
import LiveBroadcast from './pages/LiveBroadcast';
import ProfileHome from './pages/profile/ProfileHome';
import ProfileDashboard from './pages/profile/ProfileDashboard';
import AccountPayments from './pages/profile/AccountPayments';
import BidHistory from './pages/profile/BidHistory';
import Recharge from './pages/profile/Recharge';
import SettingsHome from './pages/profile/settings/SettingsHome';
import Support from './pages/profile/settings/Support';
import LegalInfo from './pages/profile/settings/LegalInfo';
import Logout from './pages/profile/settings/Logout';
import Notifications from './pages/profile/settings/Notifications';
import ChangePassword from './pages/profile/settings/ChangePassword';
import ProfileEdit from './pages/profile/settings/ProfileEdit';
import Location from './pages/profile/settings/Location';
import TermsAndConditions from './pages/TermsAndConditions';
import Complaints from './pages/Complaints';
import FAQ from './pages/FAQ';

function App() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  return (
    <NotificationsProvider>
      <BrowserRouter>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col bg-gray-50 text-right">
          <Navbar onLoginClick={() => setIsLoginModalOpen(true)} />
          <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
           
            <Route path="/categories" element={<Categories />} />
            <Route path="/auctions" element={<Auctions />} />
            
            <Route path="/advertisement" element={<Advertisement />} />
            <Route path="/about" element={<About />} />
            <Route path="/saved" element={<Saved />} />
            <Route path="/chinese-cars" element={<ChineseCars />} />
            <Route path="/car-details" element={<CarDetails />} />
            <Route path="/payment" element={<PaymentPage />} />
            <Route path="/live-broadcast" element={<LiveBroadcast />} />
            <Route path="/login" element={<Login />} />
            <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
            <Route path="/complaints" element={<Complaints />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/profile" element={<ProfileHome />}>
              <Route index element={<ProfileDashboard />} />
              <Route path="dashboard" element={<ProfileDashboard />} />
              <Route path="account-payments" element={<AccountPayments />} />
              <Route path="bid-history" element={<BidHistory />} />
              <Route path="recharge" element={<Recharge />} />
              <Route path="settings" element={<SettingsHome />} />
              <Route path="profile-edit" element={<ProfileEdit />} />
              <Route path="location" element={<Location />} />
              <Route path="support" element={<Support />} />
              <Route path="contact" element={<Support />} />
              <Route path="complaints" element={<Support />} />
              <Route path="legal" element={<TermsAndConditions />} />
              <Route path="logout" element={<Logout />} />
              <Route path="notifications" element={<Notifications />} />
              <Route path="change-password" element={<ChangePassword />} />
            </Route>
          </Routes>
        </main>
        <Footer />
        <LoginModal
          isOpen={isLoginModalOpen}
          onClose={() => setIsLoginModalOpen(false)}
          onRegisterClick={() => {
            setIsLoginModalOpen(false);
            setIsRegisterModalOpen(true);
          }}
        />
        <RegisterModal
          isOpen={isRegisterModalOpen}
          onClose={() => setIsRegisterModalOpen(false)}
          onLoginClick={() => {
            setIsRegisterModalOpen(false);
            setIsLoginModalOpen(true);
          }}
        />
      </div>
    </BrowserRouter>
    </NotificationsProvider>
  );
}

export default App;
