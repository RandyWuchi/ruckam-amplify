import React, { useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

import NewListingButton from '../components/NewListingButton';
import ProductCard from '../components/ProductCard';
import Text from '../components/Text';

const MyListingsScreen = () => {
  const [myListings, setMyListings] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchMyListings = () => {};

  return (
    <View style={styles.container}>
      {myListings.length === 0 ? (
        <View style={styles.noListing}>
          <Text style={styles.text}>You have not posted any listing</Text>
        </View>
      ) : (
        <FlatList
          data={myListings}
          onRefresh={fetchMyListings}
          refreshing={refreshing}
          keyExtractor={(myListing) => myListing.id.toString()}
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
          renderItem={({ item }) => (
            <View style={styles.cards}>
              <ProductCard
                title={item.title}
                subTitle={'$' + item.price}
                image={item.images}
              />
            </View>
          )}
        />
      )}
      <NewListingButton />
    </View>
  );
};

export default MyListingsScreen;

const styles = StyleSheet.create({
  cards: {
    padding: 10,
    flex: 1,
  },
  container: {
    flex: 1,
  },
  noListing: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  text: {
    fontSize: 18,
    fontWeight: '600',
    opacity: 0.5,
  },
});
