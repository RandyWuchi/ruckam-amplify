import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import Colors from '../constants/Colors';
import routes from '../navigation/routes';

const NewListingButton = () => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate(routes.LISTING_EDIT);
  };
  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <MaterialCommunityIcons
        name='plus'
        color={Colors.light.white}
        size={40}
      />
    </TouchableOpacity>
  );
};

export default NewListingButton;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.light.primary,
    borderRadius: 30,
    height: 60,
    width: 60,
    position: 'absolute',
    right: 20,
    bottom: 20,
  },
});
