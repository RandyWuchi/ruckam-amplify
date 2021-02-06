import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';

import authStorage from '../auth/storage';
import AuthNavigator from './AuthNavigator';
import BottomTabNavigator from './BottomTabNavigator';
import LoadingScreen from '../screens/LoadingScreen';
import { UserContext } from '../context/UserContext';
import ListingEditScreen from '../screens/ListingEditScreen';
import { AuthContext } from '../context/AuthContext';

export default Navigation = ({ colorScheme }) => {
  return (
    <NavigationContainer
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
};

const Stack = createStackNavigator();

const RootNavigator = () => {
  const [user] = React.useContext(UserContext);
  const [auth, setAuth] = React.useContext(AuthContext);

  const restoreUser = async () => {
    const user = await authStorage.getUser();

    if (user) setAuth(user);
  };

  React.useEffect(() => {
    restoreUser();
  }, []);

  return (
    <Stack.Navigator headerMode='none'>
      {user.isLoggedIn === null ? (
        <Stack.Screen name='Loading' component={LoadingScreen} />
      ) : user.isLoggedIn && auth ? (
        <Stack.Screen name='BottomTab' component={BottomTabNavigator} />
      ) : (
        <Stack.Screen name='Auth' component={AuthNavigator} />
      )}
      <Stack.Screen
        name='ListingEdit'
        component={ListingEditScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
