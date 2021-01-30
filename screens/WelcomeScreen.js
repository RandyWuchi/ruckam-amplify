import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

import Button from '../components/Button';
import routes from '../navigation/routes';

const WelcomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image style={styles.logo} source={require('../assets/logo.png')} />
        <Text style={styles.tagLine}>Market place for used items</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title='Login'
          onPress={() => navigation.navigate(routes.LOGIN)}
        />
        <Button
          title='Register'
          color='success'
          onPress={() => navigation.navigate(routes.REGISTER)}
        />
      </View>
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  logoContainer: {
    position: 'absolute',
    top: 150,
    alignItems: 'center',
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
  tagLine: {
    fontSize: 25,
    fontWeight: '600',
  },
  buttonContainer: {
    width: '100%',
    padding: 20,
  },
});
