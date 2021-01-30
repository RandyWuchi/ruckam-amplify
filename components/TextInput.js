import React from 'react';
import { View, TextInput as RNTextInput, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import Colors from '../constants/Colors';
import defaultStyles from '../constants/Styles';

const TextInput = ({ icon, width = '100%', ...otherProps }) => {
  return (
    <View style={[styles.container, { width }]}>
      {icon && (
        <MaterialCommunityIcons
          name={icon}
          size={20}
          color={Colors.light.medium}
          style={styles.icon}
        />
      )}
      <RNTextInput
        placeholderTextColor={Colors.light.medium}
        style={defaultStyles.text}
        {...otherProps}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.light.white,
    borderRadius: 10,
    flexDirection: 'row',
    padding: 15,
    marginVertical: 10,
    borderWidth: 1,
  },
  icon: {
    marginRight: 10,
  },
});

export default TextInput;
