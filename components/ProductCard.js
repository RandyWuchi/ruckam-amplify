import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import Colors from '../constants/Colors';

const ProductCard = ({ title, subTitle, image, onPress }) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.container}>
        <Image source={image} style={styles.image} />
        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subTitle}>{subTitle}</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    backgroundColor: Colors.light.white,
    overflow: 'hidden',
    flexDirection: 'row',
  },
  image: {
    width: '30%',
    height: 104,
    resizeMode: 'cover',
  },
  textContainer: {
    marginLeft: 10,
    marginTop: 10,
    justifyContent: 'center',
  },
  title: {
    marginBottom: 10,
    fontSize: 14,
    fontWeight: 'bold',
  },
  subTitle: {
    marginBottom: 10,
    color: Colors.light.primary,
    fontWeight: '400',
  },
});
