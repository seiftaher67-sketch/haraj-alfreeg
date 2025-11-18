import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { modelAPI } from '../services/api';
import { TruckIcon } from '@heroicons/react/24/outline';

export default function Exhibitions() {
  const { data: models, isLoading, error } = useQuery({
    queryKey: ['models'],
    queryFn: () => modelAPI.getModels(),
  });

  const getImageUrl = (model) => {
    if (model.image_path) {
      return `http://localhost:8000/storage/${model.image_path}`;
    }
    return '/assets/images/trucks/Frame 112.png';
  };

  if (isLoading) {
    return (
      <div dir="rtl" className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">المعروضات</h1>
            <p className="text-lg text-gray-600">جاري التحميل...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div dir="rtl" className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">المعروضات</h1>
            <p className="text-lg text-red-600">حدث خطأ في تحميل البيانات</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div dir="rtl" className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">المعروضات</h1>
          <p className="text-lg text-gray-600">اكتشف أحدث المعروضات في معرضنا</p>
        </div>

        {/* Models Grid */}
        {models && models.data && models.data.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {models.data.map((model) => (
              <div
                key={model.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                {/* Image */}
                <div className="relative h-48">
                  <img
                    src={getImageUrl(model)}
                    alt={model.truck_name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2">
                    {model.truck_name}
                  </h3>

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">الموديل:</span>
                    <span className="font-medium text-gray-900">{model.model_name}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <TruckIcon className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">لا توجد معروضات</h3>
            <p className="text-gray-600">لم يتم العثور على موديلات</p>
          </div>
        )}
      </div>
    </div>
  );
}
