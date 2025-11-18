import React, { useState, useEffect } from 'react';
import { UserIcon, CameraIcon } from '@heroicons/react/24/outline';
import { useMutation, useQuery } from '@tanstack/react-query';
import { userAPI } from '../../../services/api';
import BuildingLocationPicker from '../../../components/BuildingLocationPicker';

const ProfileEdit = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    avatar: null
  });
  const [previewImage, setPreviewImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [buildingName, setBuildingName] = useState('');
  const [streetName, setStreetName] = useState('');
  const [distinctiveMark, setDistinctiveMark] = useState('');
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [savedAddresses, setSavedAddresses] = useState([
    {
      id: 1,
      address: 'الرياض، حي العليا، شارع الملك فهد',
      buildingName: 'مبنى الرياض',
      streetName: 'شارع الملك فهد',
      distinctiveMark: 'مستشفى'
    },
    {
      id: 2,
      address: 'جدة، حي الصفا، شارع التحلية',
      buildingName: 'مبنى جدة',
      streetName: 'شارع التحلية',
      distinctiveMark: 'صيدلية'
    }
  ]);

  // Fetch current profile data
  const { data: profileData, isLoading: profileLoading } = useQuery({
    queryKey: ['profile'],
    queryFn: userAPI.getProfile,
    onSuccess: (data) => {
      if (data.user) {
        setFormData({
          name: data.user.name || '',
          email: data.user.email || '',
          phone: data.user.phone || '',
          avatar: null
        });
        // Handle avatar URL - if it's a relative path, make it full URL
        const avatarUrl = data.user.avatar ? (data.user.avatar.startsWith('http') ? data.user.avatar : `http://localhost:8000${data.user.avatar}`) : null;
        setPreviewImage(avatarUrl);
      }
    },
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const updateProfileMutation = useMutation({
    mutationFn: userAPI.updateProfile,
    onSuccess: (data) => {
      alert('تم حفظ التغييرات بنجاح!');
      // Update local storage with new user data
      const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
      localStorage.setItem('user', JSON.stringify({
        ...currentUser,
        ...data.user
      }));
      // Handle avatar URL - if it's a relative path, make it full URL
      const avatarUrl = data.user.avatar ? (data.user.avatar.startsWith('http') ? data.user.avatar : `http://localhost:8000${data.user.avatar}`) : null;
      setPreviewImage(avatarUrl);

      // Dispatch custom event to update navbar immediately
      window.dispatchEvent(new Event('userUpdated'));
    },
    onError: (error) => {
      alert('حدث خطأ أثناء حفظ التغييرات: ' + error.message);
    }
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        avatar: file
      });
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => setPreviewImage(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfileMutation.mutate(formData);
  };

  const handleImageUpload = () => {
    document.getElementById('avatar-input').click();
  };

  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
  };

  const handleSave = () => {
    if (selectedLocation) {
      const newAddress = {
        id: Date.now(),
        address: selectedLocation.address,
        buildingName: selectedLocation.buildingName || '',
        streetName: selectedLocation.streetName || '',
        distinctiveMark: selectedLocation.distinctiveMark || '',
      };
      setSavedAddresses([...savedAddresses, newAddress]);
      console.log('Saving location:', selectedLocation);
    }
  };

  const handleManualAddressSubmit = () => {
    const manualAddress = {
      id: Date.now(),
      address: `${buildingName}, ${streetName}, ${distinctiveMark}`,
      buildingName,
      streetName,
      distinctiveMark,
    };
    setSavedAddresses([...savedAddresses, manualAddress]);
    console.log('Manual address:', manualAddress);
    setBuildingName('');
    setStreetName('');
    setDistinctiveMark('');
    setIsModalOpen(false);
  };

  if (profileLoading) {
    return <div className="bg-gray-50 min-h-screen p-6 text-right">جاري التحميل...</div>;
  }

  return (
    <div className="bg-gray-50 min-h-screen p-6 text-right">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">تعديل البروفايل</h1>

      <div className="bg-white rounded-2xl shadow border p-6">
        {/* Profile Picture Section */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center border-4 border-gray-300 overflow-hidden">
              {previewImage ? (
                <img src={previewImage} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <UserIcon className="w-16 h-16 text-gray-500" />
              )}
            </div>
            <button
              type="button"
              onClick={handleImageUpload}
              className="absolute bottom-0 right-0 bg-gradient-to-r from-gray-400 to-gray-600 p-3 rounded-full border-4 border-white hover:from-gray-500 hover:to-gray-700 transition-colors"
            >
              <CameraIcon className="w-6 h-6 text-white" />
            </button>
            <input
              id="avatar-input"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              الاسم بالكامل
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#f2b400] focus:border-transparent"
              placeholder="أدخل اسمك الكامل"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              البريد الإلكتروني
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#f2b400] focus:border-transparent"
              placeholder="أدخل بريدك الإلكتروني"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              رقم الهاتف
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#f2b400] focus:border-transparent"
              placeholder="أدخل رقم هاتفك"
              required
            />
          </div>

     
      <div className="bg-white rounded-lg shadow p-6">
        <BuildingLocationPicker onLocationSelect={handleLocationSelect} />
        <div className="flex gap-4 mt-4">
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-yellow-400 text-black px-4 py-2 rounded-lg hover:bg-yellow-500 transition-colors"
          >
            ادخل العنوان
          </button>
          <button
            onClick={handleSave}
            className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
          >
            حفظ
          </button>
        </div>
      </div>

      {/* Modal for manual address entry */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 w-[480px] text-right">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">إدخال العنوان يدوياً</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-600 hover:text-gray-800">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">اسم المبنى</label>
                <input
                  type="text"
                  value={buildingName}
                  onChange={(e) => setBuildingName(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg text-right"
                  placeholder="أدخل اسم المبنى"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">اسم الشارع</label>
                <input
                  type="text"
                  value={streetName}
                  onChange={(e) => setStreetName(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg text-right"
                  placeholder="أدخل اسم الشارع"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">علامة مميزة</label>
                <input
                  type="text"
                  value={distinctiveMark}
                  onChange={(e) => setDistinctiveMark(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg text-right"
                  placeholder="صيدلية - مستشفى - محل تجاري"
                />
              </div>
              <button
                onClick={handleManualAddressSubmit}
                className="w-full bg-yellow-400 text-black py-3 rounded-lg hover:bg-yellow-500 transition-colors"
              >
                تم
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Saved Addresses Section */}
      <div className="bg-white rounded-lg shadow p-6 mt-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">العناوين المحفوظة</h2>
        {savedAddresses.length > 0 ? (
          <div className="space-y-4">
            {savedAddresses.map((address) => (
              <div key={address.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <p className="text-gray-800 font-medium">{address.address}</p>
                    <div className="text-sm text-gray-600 mt-1">
                      <p>المبنى: {address.buildingName}</p>
                      <p>الشارع: {address.streetName}</p>
                      <p>علامة مميزة: {address.distinctiveMark}</p>
                    </div>
                  </div>
                  <button className="text-red-500 hover:text-red-700 ml-4">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">لا توجد عناوين محفوظة بعد.</p>
        )}
      </div>

          <div className="flex justify-center">
            <button
              type="submit"
              disabled={updateProfileMutation.isPending}
              className="w-50 bg-[#f2b400] text-white py-3 px-4 rounded-xl hover:bg-[#e6a100] transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {updateProfileMutation.isPending ? 'جاري الحفظ...' : 'حفظ التغييرات'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileEdit;
