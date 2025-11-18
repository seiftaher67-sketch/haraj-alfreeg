import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { authAPI } from '../services/api';

const EmailVerification = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [verificationStatus, setVerificationStatus] = useState('verifying');
  const [verificationData, setVerificationData] = useState(null);
  const [verificationAttempted, setVerificationAttempted] = useState(false);

  const verifyMutation = useMutation({
    mutationFn: async (token) => {
      const response = await fetch(`http://localhost:8000/api/auth/verify-email?token=${token}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Verification failed');
      }

      return data;
    },
    onSuccess: (data) => {
      setVerificationData(data);
      if (data.already_verified) {
        setVerificationStatus('already_verified');
      } else {
        setVerificationStatus('success');
        setTimeout(() => {
          navigate('/');
        }, 3000);
      }
    },
    onError: (error) => {
      setVerificationStatus('error');
      console.error('Verification error:', error);
    },
  });

  useEffect(() => {
    const token = searchParams.get('token');
    const alreadyVerified = searchParams.get('already_verified');
    const error = searchParams.get('error');

    if (error) {
      setVerificationStatus('error');
      return;
    }

    if (alreadyVerified === 'true' && token) {
      // Handle already verified case
      const [userId, hash] = token.split('.');
      const verifiedAt = searchParams.get('verified_at');
      setVerificationData({
        already_verified: true,
        verified_at: verifiedAt ? new Date(verifiedAt).toISOString() : new Date().toISOString(),
        user_id: userId
      });
      setVerificationStatus('already_verified');
      return;
    }

    if (token && !verificationAttempted) {
      setVerificationAttempted(true);
      verifyMutation.mutate(token);
    } else if (!token) {
      setVerificationStatus('error');
    }
  }, [searchParams, verifyMutation, verificationAttempted]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        {verificationStatus === 'verifying' && (
          <>
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400 mx-auto mb-4"></div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">جاري التحقق من البريد الإلكتروني</h2>
            <p className="text-gray-600">يرجى الانتظار...</p>
          </>
        )}

        {verificationStatus === 'success' && (
          <>
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">تم تأكيد البريد الإلكتروني بنجاح!</h2>
            <p className="text-gray-600 mb-6">يمكنك الآن تسجيل الدخول إلى حسابك والاستمتاع بجميع الميزات.</p>
            <button
              onClick={() => navigate('/')}
              className="w-full bg-yellow-400 text-black py-3 px-4 rounded-lg hover:bg-yellow-500 transition-colors"
            >
              الانتقال إلى الموقع
            </button>
            <p className="text-sm text-gray-500 mt-4">سيتم توجيهك تلقائياً خلال 3 ثوانٍ...</p>
          </>
        )}

        {verificationStatus === 'already_verified' && verificationData && (
          <>
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">تم تفعيل البريد الإلكتروني مسبقاً</h2>
            <p className="text-gray-600 mb-4">تم تفعيل بريدك الإلكتروني في:</p>
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <p className="text-lg font-semibold text-gray-800">
                {new Date(verificationData.verified_at).toLocaleDateString('ar-SA', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                  second: '2-digit'
                })}
              </p>
            </div>
            <p className="text-gray-600 mb-6">يمكنك الآن تسجيل الدخول إلى حسابك والاستمتاع بجميع الميزات.</p>
            <button
              onClick={() => navigate('/')}
              className="w-full bg-yellow-400 text-black py-3 px-4 rounded-lg hover:bg-yellow-500 transition-colors"
            >
              الانتقال إلى الصفحة الرئيسية
            </button>
          </>
        )}

        {verificationStatus === 'error' && (
          <>
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">فشل في تأكيد البريد الإلكتروني</h2>
            <p className="text-gray-600 mb-6">ربما انتهت صلاحية الرابط أو أنه غير صحيح. يرجى المحاولة مرة أخرى.</p>
            <button
              onClick={() => navigate('/')}
              className="w-full bg-yellow-400 text-black py-3 px-4 rounded-lg hover:bg-yellow-500 transition-colors"
            >
              العودة إلى الصفحة الرئيسية
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default EmailVerification;
