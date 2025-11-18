import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { authAPI } from '../../services/api';

const RegisterModal = ({ isOpen, onClose, onLoginClick }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    password_confirmation: '',
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const registerMutation = useMutation({
    mutationFn: authAPI.register,
    onSuccess: (data) => {
      setSuccess(true);
      setErrors({});
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        password: '',
        password_confirmation: '',
      });
      // Close modal after 2 seconds
      setTimeout(() => {
        setSuccess(false);
        onClose();
      }, 2000);
    },
    onError: (error) => {
      if (error.message.includes('Validation failed')) {
        // Parse validation errors
        const errorData = JSON.parse(error.message.replace('Validation failed', ''));
        const errors = errorData.errors || {};

        // Check if email is already taken
        if (errors.email && errors.email[0] === 'The email has already been taken.') {
          setErrors({
            general: 'تم إنشاء حسابك بالفعل. يرجى تسجيل الدخول.',
            accountExists: true
          });
        } else {
          setErrors(errors);
        }
      } else {
        setErrors({ general: error.message });
      }
    },
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    registerMutation.mutate(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 w-[480px] text-right">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">إنشاء حساب</h2>
          <button onClick={onClose} className="text-gray-600 hover:text-gray-800">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="space-y-4">
          <h3 className="text-2xl font-semibold text-center">انضم إلينا</h3>
          <p className="text-gray-600 text-center">أنشئ حسابك الجديد من هنا</p>

          {success && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
              تم التسجيل بنجاح! تحقق من بريدك الإلكتروني لتفعيل الحساب.
            </div>
          )}

          {errors.general && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {errors.general}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name Input */}
            <div>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="الاسم الكامل"
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 ${
                  errors.name ? 'border-red-500' : 'border-gray-300'
                }`}
                required
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name[0]}</p>
              )}
            </div>

            {/* Email Input */}
            <div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="البريد الإلكتروني"
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
                required
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email[0]}</p>
              )}
            </div>

            {/* Phone Input */}
            <div>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="رقم الهاتف (اختياري)"
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 ${
                  errors.phone ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">{errors.phone[0]}</p>
              )}
            </div>

            {/* Password Input */}
            <div>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="كلمة المرور"
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 ${
                  errors.password ? 'border-red-500' : 'border-gray-300'
                }`}
                required
              />
              {formData.password && formData.password.length < 6 && (
                <p className="text-yellow-600 text-sm mt-1">كلمة المرور يجب أن تكون 6 أحرف على الأقل</p>
              )}
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password[0]}</p>
              )}
            </div>

            {/* Confirm Password Input */}
            <div>
              <input
                type="password"
                name="password_confirmation"
                value={formData.password_confirmation}
                onChange={handleInputChange}
                placeholder="تأكيد كلمة المرور"
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 ${
                  errors.password_confirmation ? 'border-red-500' : 'border-gray-300'
                }`}
                required
              />
              {errors.password_confirmation && (
                <p className="text-red-500 text-sm mt-1">{errors.password_confirmation[0]}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={registerMutation.isPending}
              className="w-full bg-yellow-400 text-black py-3 rounded-lg hover:bg-yellow-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {registerMutation.isPending ? 'جاري التسجيل...' : 'إنشاء حساب'}
            </button>
          </form>

          {/* Login Link */}
          <p className="text-center text-sm">
            لديك حساب بالفعل؟{' '}
            <button
              onClick={onLoginClick}
              className="text-blue-500 hover:underline bg-transparent border-none cursor-pointer"
            >
              سجل الدخول
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterModal;
