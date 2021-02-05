import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { useColorScheme } from 'react-native';

import Colors from '../constants/Colors';
import AccountScreen from '../screens/AccountScreen';
import ListingDetailsScreen from '../screens/ListingDetailsScreen';
import ListingEditScreen from '../screens/ListingEditScreen';
import ListingScreen from '../screens/ListingScreen';
import MessagesRoomScreen from '../screens/MessagesRoomScreen';
import MessagesScreen from '../screens/MessagesScreen';
import MyListingsScreen from '../screens/MyListingsScreen';
import NewListingButton from './NewListingButton';
import routes from './routes';

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
        name='ListingEdit'
        component={TabThreeNavigator}
        options={({ navigation }) => ({
          tabBarButton: () => (
            <NewListingButton
              onPress={() => navigation.navigate(routes.LISTING_EDIT)}
            />
          ),
          tabBarIcon: () => (
            <Ionicons name='ios-add-circle' color={'#DB3022'} size={48} />
          ),
        })}
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

function TabtwoNavigator() {
  return (
    <TabTwoStack.Navigator>
      <TabTwoStack.Screen name='Messages' component={MessagesScreen} />
      <TabTwoStack.Screen name='MessagesRoom' component={MessagesRoomScreen} />
    </TabTwoStack.Navigator>
  );
}

const TabThreeStack = createStackNavigator();

function TabThreeNavigator() {
  return (
    <TabThreeStack.Navigator>
      <TabThreeStack.Screen
        name='ListingEdit'
        component={ListingEditScreen}
        options={{ headerShown: '' }}
      />
    </TabThreeStack.Navigator>
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
