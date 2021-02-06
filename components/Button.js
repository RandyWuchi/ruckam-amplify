import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

import Colors from '../constants/Colors';

const Button = ({
  title,
  onPress,
  width = '100%',
  height = 48,
  color = 'primary',
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: Colors.light[color] },
        { width },
        { height },
      ]}
      onPress={onPress}
      activeOpacity={0.5}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
    marginVertical: 10,
  },
  text: {
    fontSize: 18,
    color: Colors.light.white,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});
