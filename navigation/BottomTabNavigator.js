import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { useColorScheme } from 'react-native';

import Colors from '../constants/Colors';
import AccountScreen from '../screens/AccountScreen';
import ListingDetailsScreen from '../screens/ListingDetailsScreen';
import ListingScreen from '../screens/ListingScreen';
import MessagesRoomScreen from '../screens/MessagesRoomScreen';
import MessagesScreen from '../screens/MessagesScreen';
import MyListingsScreen from '../screens/MyListingsScreen';

const BottomTab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();
  return (
    <BottomTab.Navigator
      initialRouteName='Listing'
      tabBarOptions={{
        activeTintColor: Colors[colorScheme].tint,
        showLabel: false,
      }}
    >
      <BottomTab.Screen
        name='Listing'
        component={TabOneNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name='ios-home' color={color} size={30} />
          ),
        }}
      />
      <BottomTab.Screen
        name='Messages'
        component={TabtwoNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name='mail' color={color} size={30} />
          ),
        }}
      />
      <BottomTab.Screen
        name='MyListing'
        component={TabFourNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name='list' color={color} size={30} />
          ),
        }}
      />
      <BottomTab.Screen
        name='Account'
        component={TabFiveNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name='person' color={color} size={30} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

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

function TabtwoNavigator({ navigation, route }) {
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
