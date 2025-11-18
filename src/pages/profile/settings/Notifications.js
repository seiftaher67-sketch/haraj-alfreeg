import React, { useState, useEffect } from "react";
import { BellIcon, CheckCircleIcon } from "@heroicons/react/24/outline";
import { CheckCircleIcon as CheckCircleSolid } from "@heroicons/react/24/solid";
import { useNotifications } from "../../../context/NotificationsContext";

const Notifications = () => {
  const { notifications, markAsRead, markAllAsRead } = useNotifications();

  const sortedNotifications = [...notifications].sort((a, b) => b.timestamp - a.timestamp);

  const formatTime = (timestamp) => {
    const now = new Date();
    const notificationTime = new Date(timestamp);
    const diff = now - notificationTime;
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 60) {
      return `منذ ${minutes} دقيقة`;
    } else if (hours < 24) {
      return `منذ ${hours} ساعة`;
    } else {
      return `منذ ${days} يوم`;
    }
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case "bid":
        return <CheckCircleSolid className="w-6 h-6 text-green-600" />;
      case "auction":
        return <BellIcon className="w-6 h-6 text-blue-600" />;
      case "ended":
        return <BellIcon className="w-6 h-6 text-red-600" />;
      case "account":
        return <CheckCircleIcon className="w-6 h-6 text-purple-600" />;
      default:
        return <BellIcon className="w-6 h-6 text-gray-600" />;
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen p-6 text-right">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">الإشعارات</h1>
        {notifications.some(n => !n.read) && (
          <button
            onClick={markAllAsRead}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            تحديد الكل كمقروء
          </button>
        )}
      </div>

      <div className="bg-white rounded-2xl shadow border">
        {sortedNotifications.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            <BellIcon className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p>لا توجد إشعارات</p>
          </div>
        ) : (
          <ul className="divide-y">
            {sortedNotifications.map((notification) => (
              <li
                key={notification.id}
                className={`p-6 hover:bg-gray-50 transition-colors cursor-pointer ${
                  !notification.read ? 'bg-blue-50 border-r-4 border-blue-500' : ''
                }`}
                onClick={() => !notification.read && markAsRead(notification.id)}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    {getNotificationIcon(notification.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className={`text-lg font-medium ${!notification.read ? 'text-gray-900' : 'text-gray-700'}`}>
                        {notification.title}
                      </h3>
                      {!notification.read && (
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      )}
                    </div>
                    <p className={`mt-1 text-sm ${!notification.read ? 'text-gray-800' : 'text-gray-600'}`}>
                      {notification.message}
                    </p>
                    <p className="mt-2 text-xs text-gray-500">
                      {formatTime(notification.timestamp)}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Notifications;
