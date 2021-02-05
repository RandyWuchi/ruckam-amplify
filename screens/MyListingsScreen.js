import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import NewListingButton from '../components/NewListingButton';

const MyListingsScreen = () => {
  return (
    <View>
      <Text>My Listings Screen</Text>
      <NewListingButton />
    </View>
  );
};

export default MyListingsScreen;

const styles = StyleSheet.create({});
