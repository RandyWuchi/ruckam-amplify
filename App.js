import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import Amplify from 'aws-amplify';
import config from './src/aws-exports';
Amplify.configure(config);

import OfflineNotice from './components/OfflineNotice';
import Navigation from './navigation/index';
import { UserProvider } from './context/UserContext';
import { useColorScheme } from 'react-native';
import { AuthProvider } from './context/AuthContext';

export default function App() {
  const colorScheme = useColorScheme();

  return (
    <AuthProvider>
      <UserProvider>
        <OfflineNotice />
        <SafeAreaProvider style={{ flex: 1 }}>
          <Navigation colorScheme={colorScheme} />
          <StatusBar style='auto' />
        </SafeAreaProvider>
      </UserProvider>
    </AuthProvider>
  );
}
