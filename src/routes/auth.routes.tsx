import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { SignIn } from '../screens/SignIn';

const StackNavigation = createStackNavigator();

const AuthRoutes: React.FC = () => {
  return (
    <StackNavigation.Navigator headerMode="none">
      <StackNavigation.Screen name="SignIn" component={SignIn} />
    </StackNavigation.Navigator>
  );
};

export { AuthRoutes };
