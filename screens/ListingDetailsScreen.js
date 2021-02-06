import React from 'react';
import {
  Image,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  useColorScheme,
  View,
} from 'react-native';
import { S3Image } from 'aws-amplify-react-native';

import ContactSellerForm from '../components/ContactSellerForm';
import { ListItem } from '../components/Lists';
import Text from '../components/Text';
import Colors from '../constants/Colors';

const ListingDetailsScreen = ({ route }) => {
  const colorScheme = useColorScheme();
  const listing = route.params;

  return (
    <KeyboardAvoidingView
      style={[
        styles.container,
        { backgroundColor: Colors[colorScheme].background },
      ]}
    >
      <ScrollView>
        <S3Image imgKey={listing.images[0]} style={styles.image} />
        <View style={styles.detailsContainer}>
          <Text style={styles.title}>{listing.title}</Text>
          <Text style={styles.price}>{listing.price}</Text>
          <View style={styles.userContainer}>
            <ListItem
              image={listing.user.imageUri}
              title={listing.user.name}
              subTitle='5 Listings'
            />
          </View>
          <ContactSellerForm listing={listing} />
        </View>
      </ScrollView>
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
    marginVertical: 40,
  },
  container: {
    flex: 1,
  },
});
