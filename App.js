import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import Amplify from 'aws-amplify';
import config from './src/aws-exports';
Amplify.configure(config);

import OfflineNotice from './components/OfflineNotice';
import Navigation from './navigation/index';
import { UserContext, UserProvider } from './context/UserContext';
import { useColorScheme } from 'react-native';
import { AuthContext, AuthProvider } from './context/AuthContext';
import Colors from './constants/Colors';

export default function App() {
  const colorScheme = useColorScheme();
  const [isReady, setIsReady] = useState(false);
  const [_, setUser] = useState(UserContext);
  const [__, setAuth] = useState(AuthContext);

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
