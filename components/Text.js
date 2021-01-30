import React from 'react';
import { Text as RNText, useColorScheme } from 'react-native';
import Colors from '../constants/Colors';

import defaultStyles from '../constants/Styles';

const Text = ({ children, style, ...otheProps }) => {
  const colorScheme = useColorScheme();

  return (
    <RNText
      style={[defaultStyles.text, { color: Colors[colorScheme].text }, style]}
      {...otheProps}
    >
      {children}
    </RNText>
  );
};

export default Text;
