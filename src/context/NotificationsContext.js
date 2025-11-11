import React, { createContext, useContext, useState } from 'react';

const NotificationsContext = createContext();

export const useNotifications = () => {
  const context = useContext(NotificationsContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationsProvider');
  }
  return context;
};

export const NotificationsProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "تم قبول مزايدتك",
      message: "تم قبول مزايدتك على سيارة تويوتا كورولا 2020",
      timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
      read: false,
      type: "bid"
    },
    {
      id: 2,
      title: "مزايدة جديدة متاحة",
      message: "تم إضافة مزايدة جديدة على سيارة هوندا سيفيك",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
      read: false,
      type: "auction"
    },
    {
      id: 3,
      title: "انتهت المزايدة",
      message: "انتهت مزايدة سيارة نيسان التي كنت تشارك فيها",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
      read: true,
      type: "ended"
    },
    {
      id: 4,
      title: "تحديث في حسابك",
      message: "تم تحديث معلومات حسابك بنجاح",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), // 3 days ago
      read: true,
      type: "account"
    }
  ]);

  const markAsRead = (id) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  const value = {
    notifications,
    setNotifications,
    markAsRead,
    markAllAsRead,
    unreadCount
  };

  return (
    <NotificationsContext.Provider value={value}>
      {children}
    </NotificationsContext.Provider>
  );
};
