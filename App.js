import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Geocoder from 'react-native-geocoding';

import Amplify from 'aws-amplify';
import config from './src/aws-exports';
Amplify.configure(config);

import OfflineNotice from './components/OfflineNotice';
import Navigation from './navigation/index';
import { UserProvider } from './context/UserContext';
import { useColorScheme } from 'react-native';
import { AuthProvider } from './context/AuthContext';
import Colors from './constants/Colors';
import API_KEY from './config/GoogleMapsApiKey';

export default function App() {
  const colorScheme = useColorScheme();

  const initializeApiKey = () => {
    Geocoder.init(API_KEY);
  };

  useEffect(() => {
    initializeApiKey();
  }, []);

  return (
    <AuthProvider>
      <UserProvider>
        <OfflineNotice />
        <SafeAreaProvider
          style={{ flex: 1, backgroundColor: Colors[colorScheme].background }}
        >
          <Navigation colorScheme={colorScheme} />
          <StatusBar style='auto' />
        </SafeAreaProvider>
      </UserProvider>
    </AuthProvider>
  );
}
