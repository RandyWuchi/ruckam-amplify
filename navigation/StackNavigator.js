import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import AccountScreen from '../screens/AccountScreen';
import ListingDetailsScreen from '../screens/ListingDetailsScreen';
import ListingScreen from '../screens/ListingScreen';
import MessagesRoomScreen from '../screens/MessagesRoomScreen';
import MessagesScreen from '../screens/MessagesScreen';
import MyListingsScreen from '../screens/MyListingsScreen';

const TabOneStack = createStackNavigator();

function TabOneNavigator() {
  return (
    <TabOneStack.Navigator>
      <TabOneStack.Screen name='Listing' component={ListingScreen} />
      <TabOneStack.Screen
        name='ListingDetails'
        component={ListingDetailsScreen}
      />
    </TabOneStack.Navigator>
  );
}

const TabTwoStack = createStackNavigator();

function TabTwoNavigator({ navigation, route }) {
  React.useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route);
    if (routeName === 'MessagesRoom') {
      navigation.setOptions({ tabBarVisible: false });
    } else {
      navigation.setOptions({ tabBarVisible: true });
    }
  }, [navigation, route]);
  return (
    <TabTwoStack.Navigator>
      <TabTwoStack.Screen name='Messages' component={MessagesScreen} />
      <TabTwoStack.Screen
        name='MessagesRoom'
        component={MessagesRoomScreen}
        options={({ route }) => ({
          title: route.params.name,
          headerBackTitle: '',
          headerTintColor: Colors.light.tint,
          headerTitleStyle: { fontWeight: 'bold' },
        })}
      />
    </TabTwoStack.Navigator>
  );
}

const TabFourStack = createStackNavigator();

function TabFourNavigator() {
  return (
    <TabFourStack.Navigator>
      <TabFourStack.Screen name='MyListing' component={MyListingsScreen} />
    </TabFourStack.Navigator>
  );
}

const TabFiveStack = createStackNavigator();

function TabFiveNavigator() {
  return (
    <TabFiveStack.Navigator>
      <TabFiveStack.Screen name='Account' component={AccountScreen} />
    </TabFiveStack.Navigator>
  );
}

export { TabOneNavigator, TabTwoNavigator, TabFourNavigator, TabFiveNavigator };
