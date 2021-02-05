import React, { useContext, useLayoutEffect, useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet, View } from 'react-native';

import Card from '../components/Card';
import NewListingButton from '../components/NewListingButton';
import ProfilePicture from '../components/ProfilePicture';
import Text from '../components/Text';
import Colors from '../constants/Colors';
import { UserContext } from '../context/UserContext';
import routes from '../navigation/routes';

const ListingScreen = ({ navigation }) => {
  const [listings, setListings] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [user] = useContext(UserContext);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'RuckAm',
      headerStyle: { backgroundColor: Colors.light.white, height: 70 },
      headerTitleStyle: {
        fontSize: 24,
        color: Colors.light.primary,
        fontWeight: 'bold',
      },
      //headerTintColor: Colors.light.primary,
      headerLeft: () => <ProfilePicture image={user.imageUri} />,
    });
  }, []);

  const fetchListings = async () => {};

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {listings.length === 0 ? (
        <View style={styles.noListing}>
          <Text style={styles.text}> There are no listings available</Text>
        </View>
      ) : (
        <FlatList
          data={listings}
          keyExtractor={(listing) => listing.id.toString()}
          onRefresh={fetchListings}
          refreshing={refreshing}
          renderItem={({ item }) => (
            <View style={{ padding: 20 }}>
              <Card
                title={item.title}
                subTitle={'$' + item.price}
                image={item.images}
                onPress={() =>
                  navigation.navigate(routes.LISTING_DETAILS, item)
                }
              />
            </View>
          )}
        />
      )}

      <NewListingButton />
    </SafeAreaView>
  );
};

export default ListingScreen;

const styles = StyleSheet.create({
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
