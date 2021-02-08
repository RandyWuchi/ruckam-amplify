import { SimpleLineIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, useColorScheme, View } from 'react-native';
import { SharedElement } from 'react-navigation-shared-element';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { S3Image } from 'aws-amplify-react-native';

import Colors from '../constants/Colors';
import Text from './Text';

const Card = ({
  title,
  subTitle,
  image,
  onPress,
  address,
  id,
  idTitle,
  idSubTitle,
  idAddress,
}) => {
  const colorScheme = useColorScheme();
  return (
    <View
      style={[styles.card, { backgroundColor: Colors[colorScheme].background }]}
    >
      <TouchableOpacity
        activeOpacity={0.8}
        style={{ marginBottom: 14 }}
        onPress={onPress}
      >
        <SharedElement id={id}>
          <S3Image style={styles.image} imgKey={image} />
        </SharedElement>
        <View style={styles.detailsContainer}>
          <SharedElement id={idTitle}>
            <Text style={styles.title}>{title}</Text>
          </SharedElement>
          <SharedElement id={idSubTitle}>
            <Text style={styles.subTitle}>{subTitle}</Text>
          </SharedElement>
          <View style={styles.locationDetails}>
            <SimpleLineIcons
              name='location-pin'
              size={20}
              color={Colors.light.medium}
            />
            <SharedElement id={idAddress}>
              <Text style={styles.address}>{address}</Text>
            </SharedElement>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  card: {
    overflow: 'hidden',
    borderRadius: 10,
  },
  image: {
    width: '100%',
    height: 200,
  },
  detailsContainer: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  title: {
    marginBottom: 7,
    fontSize: 20,
    fontWeight: '600',
  },
  subTitle: {
    fontWeight: '700',
    color: Colors.light.primary,
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
