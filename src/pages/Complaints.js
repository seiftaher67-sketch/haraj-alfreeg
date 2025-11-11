import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Complaints = () => {
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState('');
  const [description, setDescription] = useState('');
  const [messageTitle, setMessageTitle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log({ messageTitle, selectedType, description });
    alert('تم إرسال الرسالة بنجاح!');
  };

  return (
    <div dir="rtl" className="min-h-screen bg-gray-50 py-0 px-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <div className="text-left mb-6">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center text-gray-600 hover:text-gray-800 p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        </div>
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-black mb-4">📝 الشكاوي والمقترحات</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Message Title */}
          <div className="text-right">
            <label className="block text-lg font-semibold text-gray-700 mb-2">عنوان الرسالة</label>
            <input
              type="text"
              value={messageTitle}
              onChange={(e) => setMessageTitle(e.target.value)}
              placeholder="أدخل عنوان الرسالة"
              className="w-3/4 mx-auto p-3 border border-gray-300 rounded-lg focus:outline-none"
              required
            />
          </div>

          {/* Message Type Selector */}
          <div className="text-right">
            <label className="block text-lg font-semibold text-gray-700 mb-2">اختر الرسالة</label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-3/4 mx-auto p-3 border border-gray-300 rounded-lg focus:outline-none"
              required
            >
              <option value="">اختر نوع الرسالة</option>
              <option value="استفسار عام">استفسار عام</option>
              <option value="شكوى">شكوى</option>
              <option value="اقتراح">اقتراح</option>
              <option value="أخرى">أخرى</option>
            </select>
          </div>

          {/* Description Card */}
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-700 mb-4 text-right">الوصف</h3>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="اكتب وصف الرسالة هنا..."
              rows="4"
              className="w-1/2 mx-auto p-3 border border-gray-300 rounded-lg focus:outline-none resize-none"
              style={{ height: '200px' }}
              required
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="bg-yellow-400 text-black px-8 py-3 rounded-lg font-semibold text-lg hover:bg-yellow-500 transition-colors"
            >
              إرسال الرسالة
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Complaints;
