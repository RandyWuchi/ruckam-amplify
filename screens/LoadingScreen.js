import React from 'react';
import { StyleSheet, Text, useColorScheme, View } from 'react-native';
import LottieView from 'lottie-react-native';

import Colors from '../constants/Colors';

const LoadingScreen = () => {
  const colorScheme = useColorScheme();

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
