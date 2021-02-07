import React, { useLayoutEffect } from 'react';
import {
  Dimensions,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  useColorScheme,
  View,
} from 'react-native';
import { S3Image } from 'aws-amplify-react-native';
import MapView, { Marker } from 'react-native-maps';

import ContactSellerForm from '../components/ContactSellerForm';
import { ListItem } from '../components/Lists';
import Text from '../components/Text';
import Colors from '../constants/Colors';

const ListingDetailsScreen = ({ route, navigation }) => {
  const colorScheme = useColorScheme();
  const listing = route.params;
  const { width, height } = Dimensions.get('window');
  const listingCount = listing.user.listing.items.length;

  const ASPECT_RATIO = width / height;
  const LATITUDE = listing.latitude;
  const LONGITUDE = listing.longitude;
  const LATITUDE_DELTA = 0.0922;
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitle: '',
      headerTintColor: Colors.light.primary,
      title: 'Details',
      headerTitleStyle: {
        fontSize: 18,
        color: Colors.light.primary,
        fontWeight: 'bold',
      },
    });
  }, []);

  return (
    <KeyboardAvoidingView
      style={[
        styles.container,
        { backgroundColor: Colors[colorScheme].background },
      ]}
      behavior='position'
    >
      <ScrollView>
        <S3Image imgKey={listing.images[0]} style={styles.image} />
        <View style={styles.detailsContainer}>
          <Text style={styles.title}>{listing.title}</Text>
          <Text style={styles.price}>{'$' + listing.price}</Text>
          <View style={styles.userContainer}>
            <ListItem
              image={listing.user.imageUri}
              title={listing.user.name}
              subTitle={`${listingCount} Listings`}
            />
          </View>
          <View style={styles.descriptionContainer}>
            <Text style={styles.description}>{listing.description}</Text>
          </View>
          <ContactSellerForm listing={listing} />
          {listing.latitude && listing.longitude && (
            <View style={styles.mapContainer}>
              <MapView
                initialRegion={{
                  latitude: parseFloat(LATITUDE),
                  longitude: parseFloat(LONGITUDE),
                  latitudeDelta: parseFloat(LATITUDE_DELTA),
                  longitudeDelta: parseFloat(LONGITUDE_DELTA),
                }}
                style={styles.map}
              >
                <Marker
                  coordinate={{
                    latitude: parseFloat(LATITUDE),
                    longitude: parseFloat(LONGITUDE),
                  }}
                />
              </MapView>
            </View>
          )}
        </View>
      </ScrollView>
      <View style={{ height: 100 }} />
    </KeyboardAvoidingView>
  );
};

export default ListingDetailsScreen;

const styles = StyleSheet.create({
  detailsContainer: {
    padding: 20,
  },
  image: {
    width: '100%',
    height: 300,
  },
  price: {
    color: Colors.light.primary,
    fontWeight: 'bold',
    fontSize: 20,
    marginVertical: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: '500',
  },
  userContainer: {
    marginVertical: 20,
  },
  container: {
    flex: 1,
  },
  descriptionContainer: {
    borderTopWidth: 1,
    paddingTop: 20,
    borderTopColor: Colors.light.gray,
    marginBottom: 20,
  },
  description: {
    fontWeight: '400',
    padding: 10,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  mapContainer: {
    height: 300,
    borderRadius: 5,
    overflow: 'hidden',
  },
});
