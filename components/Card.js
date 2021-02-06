import React from 'react';
import {
  StyleSheet,
  TouchableWithoutFeedback,
  useColorScheme,
  View,
} from 'react-native';
import { S3Image } from 'aws-amplify-react-native';

import Colors from '../constants/Colors';
import Text from './Text';

const Card = ({ title, subTitle, image, onPress }) => {
  const colorScheme = useColorScheme();
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View
        style={[
          styles.card,
          { backgroundColor: Colors[colorScheme].background },
        ]}
      >
        <S3Image style={styles.image} imgKey={image} />
        <View style={styles.detailsContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subTitle}>{subTitle}</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
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
    padding: 20,
  },
  title: {
    marginBottom: 7,
  },
  subTitle: {
    fontWeight: '700',
    color: Colors.light.primary,
  },
});
