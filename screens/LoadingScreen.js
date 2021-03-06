import { Auth } from 'aws-amplify';
import React, { useContext, useEffect } from 'react';
import { StyleSheet, Text, useColorScheme, View } from 'react-native';
import LottieView from 'lottie-react-native';

import Colors from '../constants/Colors';
import { UserContext } from '../context/UserContext';

const LoadingScreen = () => {
  const colorScheme = useColorScheme();
  const [_, setUser] = useContext(UserContext);

  useEffect(() => {
    setTimeout(async () => {
      try {
        const user = await Auth.currentAuthenticatedUser();

        if (!user) {
          setUser((state) => ({ ...state, isLoggedIn: false }));
        } else {
          setUser({
            isLoggedIn: true,
            id: user.attributes.sub,
            email: user.attributes.email,
            name: user.attributes.name,
            imageUri: user.attributes.picture,
          });
        }
      } catch (error) {
        console.log('Error signin in:', error);
      }
    }, 1500);
  }, []);

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: Colors[colorScheme].background },
      ]}
    >
      <Text style={[styles.text, { color: Colors[colorScheme].text }]}>
        RuckAm
      </Text>
      <LottieView
        source={require('../assets/animations/loading.json')}
        autoPlay
        loop
        style={{ width: '100%' }}
      />
    </View>
  );
};

export default LoadingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 32,
  },
});
