import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';

import AccountScreen from '../screens/AccountScreen';
import ListingDetailsScreen from '../screens/ListingDetailsScreen';
import ListingScreen from '../screens/ListingScreen';
import MessagesRoomScreen from '../screens/MessagesRoomScreen';
import MessagesScreen from '../screens/MessagesScreen';
import MyListingsScreen from '../screens/MyListingsScreen';

const TabOneStack = createSharedElementStackNavigator();

function TabOneNavigator() {
  const options = {
    cardStyleInterpolator: ({ current: { progress } }) => {
      return {
        cardStyle: {
          opacity: progress,
        },
      };
    },
  };
  return (
    <TabOneStack.Navigator>
      <TabOneStack.Screen name='Listing' component={ListingScreen} />
      <TabOneStack.Screen
        name='ListingDetails'
        component={ListingDetailsScreen}
        sharedElementsConfig={(route) => {
          const item = route.params;

          return [
            {
              id: `item.${item.id}.images[0]`,
              animation: 'move',
              resize: 'clip',
            },
            {
              id: `item.${item.id}.title`,
              animation: 'fade',
              resize: 'clip',
            },
            {
              id: `item.${item.id}.price`,
              animation: 'fade',
              resize: 'clip',
            },
            {
              id: `item.${item.id}.address`,
              animation: 'move',
              resize: 'clip',
            },
          ];
        }}
        options={() => options}
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
