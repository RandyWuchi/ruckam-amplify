import { Auth } from 'aws-amplify';
import React, { useContext, useLayoutEffect } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

import Icon from '../components/Icon';
import { ListItem, ListItemSeparator } from '../components/Lists';
import Screen from '../components/Screen';
import { AuthContext } from '../context/AuthContext';
import { UserContext } from '../context/UserContext';
import { menuItems } from '../data/MenuItems';
import authStorage from '../auth/storage';
import Colors from '../constants/Colors';

const AccountScreen = ({ navigation }) => {
  const [user, setUser] = useContext(UserContext);
  const [_, setAuth] = useContext(AuthContext);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Account',
      headerStyle: { backgroundColor: Colors.light.white },
      headerTitleStyle: {
        fontSize: 20,
        color: Colors.light.primary,
        fontWeight: 'bold',
      },
    });
  }, []);

  const handleLogOut = async () => {
    try {
      await Auth.signOut();
      setAuth(null);
      setUser((state) => ({ ...state, isLoggedIn: false }));
      authStorage.removeToken();
    } catch (error) {
      console.log('Error @signOut', error);
    }
  };
  return (
    <Screen style={styles.screen}>
      <View style={styles.container}>
        <ListItem
          title={user.name}
          subTitle={user.email}
          image={user.imageUri}
        />
      </View>
      <View style={styles.container}>
        <FlatList
          data={menuItems}
          keyExtractor={(menuItem) => menuItem.title}
          ItemSeparatorComponent={ListItemSeparator}
          renderItem={({ item }) => (
            <ListItem
              title={item.title}
              IconComponent={
                <Icon
                  name={item.icon.name}
                  backgroundColor={item.icon.backgroundColor}
                />
              }
            />
          )}
        />
      </View>
      <ListItem
        title='Log Out'
        IconComponent={<Icon name='logout' backgroundColor='#ffe66d' />}
        onPress={handleLogOut}
      />
      <View style={styles.brand}>
        <Text style={styles.brandText}>RuckAm</Text>
      </View>
    </Screen>
  );
};

export default AccountScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  container: {
    marginVertical: 20,
  },
  brand: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 120,
  },
  brandText: {
    color: '#9B9B9B',
    fontWeight: '500',
  },
});
