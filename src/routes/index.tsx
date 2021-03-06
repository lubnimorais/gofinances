import React from 'react';
import { View, ActivityIndicator } from 'react-native';

import { useAuth } from '../hooks/auth';

import { AuthRoutes } from './auth.routes';
import { AppRoutes } from './app.routes';

const Routes: React.FC = () => {
  const { user, userStorageLoading } = useAuth();

  if (userStorageLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#999" />
      </View>
    );
  }

  return user ? <AppRoutes /> : <AuthRoutes />;
};

export { Routes };
