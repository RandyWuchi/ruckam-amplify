import React, { useLayoutEffect } from 'react';
import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  useColorScheme,
  View,
} from 'react-native';
import { S3Image } from 'aws-amplify-react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';

import ContactSellerForm from '../components/ContactSellerForm';
import { ListItem } from '../components/Lists';
import Text from '../components/Text';
import Colors from '../constants/Colors';

const ListingDetailsScreen = ({ route, navigation }) => {
  const colorScheme = useColorScheme();
  const listing = route.params;

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
              subTitle='5 Listings'
            />
          </View>
          <View style={styles.descriptionContainer}>
            <Text style={styles.description}>{listing.description}</Text>
          </View>
          <ContactSellerForm listing={listing} />
          <View style={styles.mapContainer}>
            <MapView
              initialRegion={{
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
              provider={PROVIDER_GOOGLE}
              style={styles.map}
            >
              <Marker />
            </MapView>
          </View>
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
