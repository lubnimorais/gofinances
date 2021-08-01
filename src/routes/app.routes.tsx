import React from 'react';
import { useTheme } from 'styled-components';
import { Feather } from '@expo/vector-icons';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Dashboard } from '../screens/Dashboard';
import { Register } from '../screens/Register';

const { Navigator, Screen } = createBottomTabNavigator();

const AppRoutes: React.FC = () => {
  const theme = useTheme();

  return (
    <Navigator
      initialRouteName="Dashboard"
      tabBarOptions={{
        activeTintColor: theme.colors.secondary,
        inactiveTintColor: theme.colors.text,
        labelPosition: 'beside-icon',
        style: {
          height: 55,
        },
      }}
    >
      <Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          title: 'Listagem',
          tabBarIcon: ({ color, size }) => (
            <Feather name="list" size={size} color={color} />
          ),
        }}
      />

      <Screen
        name="Register"
        component={Register}
        options={{
          title: 'Cadastrar',
          tabBarIcon: ({ color, size }) => (
            <Feather name="dollar-sign" size={size} color={color} />
          ),
        }}
      />

      <Screen
        name="Resume"
        component={Register}
        options={{
          title: 'Resumo',
          tabBarIcon: ({ color, size }) => (
            <Feather name="pie-chart" size={size} color={color} />
          ),
        }}
      />
    </Navigator>
  );
};

export { AppRoutes };
