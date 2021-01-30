import React from 'react';
import { StyleSheet, View } from 'react-native';

import Colors from '../../constants/Colors';

const ListItemSeparator = () => {
  return <View style={styles.separator} />;
};

const styles = StyleSheet.create({
  separator: {
    width: '100%',
    backgroundColor: Colors.light.light,
    height: 1,
  },
});

export default ListItemSeparator;
