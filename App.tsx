import React from 'react';
import { SafeAreaView, StatusBar, Platform } from 'react-native';
import AppLoading from 'expo-app-loading';

import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins';

import { ThemeProvider } from 'styled-components/native';
import { Dashboard } from './src/screens/Dashboard';

import theme from './src/global/styles/theme';

const App: React.FC = () => {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ThemeProvider theme={theme}>
        <StatusBar
          barStyle={Platform.OS === 'ios' ? 'dark-content' : 'light-content'}
          backgroundColor={theme.colors.primary}
        />
        <Dashboard />
      </ThemeProvider>
    </SafeAreaView>
  );
};

export { App };
