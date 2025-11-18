import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";
import { authAPI } from "../../../services/api";

const Logout = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await authAPI.logout();
      // Clear local storage
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      // Dispatch event to update navbar immediately
      window.dispatchEvent(new Event('userUpdated'));
      // Redirect to home
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
      // Even if API fails, clear local storage and redirect
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      // Dispatch event to update navbar immediately
      window.dispatchEvent(new Event('userUpdated'));
      navigate('/');
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow border p-8 max-w-sm w-full text-center">
        <ArrowRightOnRectangleIcon className="w-12 h-12 mx-auto text-red-600 mb-4" />
        <h2 className="text-xl font-bold text-gray-800 mb-2">تسجيل الخروج</h2>
        <p className="text-gray-600 mb-6">هل أنت متأكد أنك تريد تسجيل الخروج من حسابك؟</p>
        <button
          onClick={handleLogout}
          disabled={isLoading}
          className="w-full py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'جاري تسجيل الخروج...' : 'تأكيد تسجيل الخروج'}
        </button>
      </div>
    </div>
  );
};

export default Logout;
