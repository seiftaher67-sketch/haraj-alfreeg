import { QueryClient } from '@tanstack/react-query';

// Create a client
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

// API base URL
const API_BASE_URL = 'http://localhost:8000/api';

// Helper function to get full image URL
const getFullImageUrl = (path) => {
  if (!path) return null;
  if (path.startsWith('http')) return path;
  return `http://localhost:8000${path}`;
};

// API functions
export const authAPI = {
  register: async (userData) => {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Registration failed');
    }

    return data;
  },

  login: async (credentials) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Login failed');
    }

    return data;
  },

  logout: async () => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/auth/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Logout failed');
    }

    return data;
  },
};

export const userAPI = {
  getProfile: async () => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/user`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch user profile');
    }

    return data;
  },

  updateProfile: async (profileData) => {
    const token = localStorage.getItem('token');
    const formData = new FormData();

    // Add text fields
    Object.keys(profileData).forEach(key => {
      if (key !== 'avatar') {
        formData.append(key, profileData[key]);
      }
    });

    // Add file if exists
    if (profileData.avatar) {
      formData.append('avatar', profileData.avatar);
    }

    const response = await fetch(`${API_BASE_URL}/user/update`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to update profile');
    }

    return data;
  },

  getNotifications: async () => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/notifications`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch notifications');
    }

    return data;
  },

  markNotificationAsRead: async (notificationId) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/notifications/${notificationId}/read`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to mark notification as read');
    }

    return data;
  },

  markAllNotificationsAsRead: async () => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/notifications/mark-all-read`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to mark all notifications as read');
    }

    return data;
  },
};// Wallet API functions
export const walletAPI = {
  getWallet: async () => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/wallet`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch wallet balance');
    }

    return data;
  },

  getTransactions: async () => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/wallet/transactions`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch transactions');
    }

    return data;
  },

  topup: async (topupData) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/wallet/topup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(topupData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to top up wallet');
    }

    return data;
  },
};

// Listing API functions
export const listingAPI = {
  createListing: async (listingData) => {
    const token = localStorage.getItem('token');
    const formData = new FormData();

    // Add text fields
    Object.keys(listingData).forEach(key => {
      if (key !== 'image' && key !== 'video' && key !== 'pdf') {
        if (listingData[key] !== null && listingData[key] !== undefined) {
          if (Array.isArray(listingData[key]) && key === 'other') {
            listingData[key].forEach(feature => {
              formData.append('other[]', feature);
            });
          } else {
            formData.append(key, listingData[key]);
          }
        }
      }
    });

    // Add files directly
    if (listingData.image && listingData.image.length > 0) {
      listingData.image.forEach((file, index) => {
        formData.append(`files[image][${index}]`, file);
      });
    }
    if (listingData.video) {
      formData.append('files[video]', listingData.video);
    }
    if (listingData.pdf && listingData.pdf.length > 0) {
      listingData.pdf.forEach((file, index) => {
        formData.append(`files[pdf][${index}]`, file);
      });
    }

    const response = await fetch(`${API_BASE_URL}/listings`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to create listing');
    }

    return data;
  },
};

// Model API functions
export const modelAPI = {
  getModels: async () => {
    const response = await fetch(`${API_BASE_URL}/models`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch models');
    }

    return data;
  },
};
