import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import WelcomeScreen from '../screens/WelcomeScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import ConfirmScreen from '../screens/ConfirmScreen';

export default AuthNavigator = () => {
  const AuthStack = createStackNavigator();

  return (
    <AuthStack.Navigator headerMode='none'>
      <AuthStack.Screen name='Welcome' component={WelcomeScreen} />
      <AuthStack.Screen name='Login' component={LoginScreen} />
      <AuthStack.Screen name='Register' component={RegisterScreen} />
      <AuthStack.Screen name='Confirm' component={ConfirmScreen} />
    </AuthStack.Navigator>
  );
};
