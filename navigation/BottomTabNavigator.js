import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import * as React from 'react';
import { useColorScheme } from 'react-native';

import Colors from '../constants/Colors';
import {
  TabFiveNavigator,
  TabFourNavigator,
  TabOneNavigator,
  TabTwoNavigator,
} from './StackNavigator';

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
        component={TabTwoNavigator}
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
