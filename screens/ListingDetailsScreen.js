import React, { useLayoutEffect, useRef } from 'react';
import { SharedElement } from 'react-navigation-shared-element';
import * as Animatable from 'react-native-animatable';
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
import { SimpleLineIcons } from '@expo/vector-icons';

const ListingDetailsScreen = ({ route, navigation }) => {
  const colorScheme = useColorScheme();
  const buttonRef = useRef();
  const item = route.params;
  const { width, height } = Dimensions.get('window');
  const listingCount = item.user.listing.items.length;

  const ASPECT_RATIO = width / height;
  const LATITUDE = item.latitude;
  const LONGITUDE = item.longitude;
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
        <SharedElement id={`item.${item.id}.images[0]`}>
          <S3Image imgKey={item.images[0]} style={styles.image} />
        </SharedElement>
        <View style={styles.detailsContainer}>
          <SharedElement id={`item.${item.id}.title`}>
            <Text style={styles.title}>{item.title}</Text>
          </SharedElement>
          <SharedElement id={`item.${item.id}.price`}>
            <Text style={styles.price}>{'$' + item.price}</Text>
          </SharedElement>
          <View style={styles.locationDetails}>
            <Animatable.View
              ref={buttonRef}
              animation='fadeIn'
              duration={600}
              delay={300}
            >
              <SimpleLineIcons
                name='location-pin'
                size={30}
                color={Colors.light.medium}
              />
            </Animatable.View>
            <SharedElement id={`item.${item.id}.address`}>
              <Text style={styles.address}>{item.address}</Text>
            </SharedElement>
          </View>
          <View style={styles.userContainer}>
            <ListItem
              image={item.user.imageUri}
              title={item.user.name}
              subTitle={`${listingCount} Listings`}
            />
          </View>
          <View style={styles.descriptionContainer}>
            <Text style={styles.description}>{item.description}</Text>
          </View>
          <ContactSellerForm listing={item} />
          {item.latitude && item.longitude && (
            <View style={styles.mapContainer}>
              <MapView
                initialRegion={{
                  latitude: parseFloat(LATITUDE),
                  longitude: parseFloat(LONGITUDE),
                  latitudeDelta: parseFloat(LATITUDE_DELTA),
                  longitudeDelta: parseFloat(LONGITUDE_DELTA),
                }}
                style={styles.map}
                showsUserLocation={true}
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
  address: {
    fontSize: 16,
    color: Colors.light.medium,
    marginLeft: 2,
  },
  locationDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
});
