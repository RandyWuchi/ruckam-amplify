import { API, graphqlOperation } from 'aws-amplify';
import React, { useContext, useEffect, useLayoutEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

import NewListingButton from '../components/NewListingButton';
import ProductCard from '../components/ProductCard';
import Text from '../components/Text';
import Colors from '../constants/Colors';
import { UserContext } from '../context/UserContext';
import { getUser } from '../src/graphql/queries';

const MyListingsScreen = ({ navigation }) => {
  const [myListings, setMyListings] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [user] = useContext(UserContext);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'My Listing',
      headerStyle: { backgroundColor: Colors.light.white },
      headerTitleStyle: {
        fontSize: 20,
        color: Colors.light.primary,
        fontWeight: 'bold',
      },
    });
  }, []);

  const fetchMyListings = async () => {
    setRefreshing(true);

    try {
      const userData = await API.graphql(
        graphqlOperation(getUser, { id: user.id })
      );

      setMyListings(userData.data.getUser.listing.items);
    } catch (error) {
      console.log('Error @fetchMyListing:', error);
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchMyListings();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.cards}>
      <ProductCard
        title={item.title}
        subTitle={'$' + item.price}
        image={item.images}
      />
    </View>
  );

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
          renderItem={renderItem}
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
