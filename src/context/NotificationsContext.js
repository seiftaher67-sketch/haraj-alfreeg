import React, { createContext, useContext, useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { userAPI } from '../services/api';

const NotificationsContext = createContext();

export const useNotifications = () => {
  const context = useContext(NotificationsContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationsProvider');
  }
  return context;
};

export const NotificationsProvider = ({ children }) => {
  const queryClient = useQueryClient();

  // Fetch notifications from API
  const { data: notificationsData, isLoading } = useQuery({
    queryKey: ['notifications'],
    queryFn: userAPI.getNotifications,
    refetchInterval: 30000, // Refetch every 30 seconds
    staleTime: 10000, // Consider data fresh for 10 seconds
  });

  const notifications = notificationsData || [];

  // Mark notification as read mutation
  const markAsReadMutation = useMutation({
    mutationFn: userAPI.markNotificationAsRead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
  });

  // Mark all notifications as read mutation
  const markAllAsReadMutation = useMutation({
    mutationFn: userAPI.markAllNotificationsAsRead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
  });

  const markAsRead = (id) => {
    markAsReadMutation.mutate(id);
  };

  const markAllAsRead = () => {
    markAllAsReadMutation.mutate();
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  const value = {
    notifications,
    isLoading,
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
