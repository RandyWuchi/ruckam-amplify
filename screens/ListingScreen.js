import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import NewListingButton from '../components/NewListingButton';

const ListingScreen = () => {
  return (
    <View style={{ flex: 1 }}>
      <Text>Listing Screen</Text>
      <NewListingButton />
    </View>
  );
};

export default ListingScreen;

const styles = StyleSheet.create({});
