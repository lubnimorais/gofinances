import 'react-native-gesture-handler';
import 'intl';
import 'intl/locale-data/jsonp/pt-BR';

import React from 'react';
import { SafeAreaView, StatusBar, Platform } from 'react-native';
import AppLoading from 'expo-app-loading';
import { NavigationContainer } from '@react-navigation/native';

import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins';

import { ThemeProvider } from 'styled-components/native';
import theme from './src/global/styles/theme';

import { AppRoutes } from './src/routes/app.routes';

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
        <NavigationContainer>
          <AppRoutes />
        </NavigationContainer>
      </ThemeProvider>
    </SafeAreaView>
  );
};

export { App };
