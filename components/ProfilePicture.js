import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { S3Image } from 'aws-amplify-react-native';
import Colors from '../constants/Colors';

const ProfilePicture = ({ image }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity activeOpacity={0.5}>
        <S3Image imgKey={image} style={styles.image} />
      </TouchableOpacity>
    </View>
  );
};

export default ProfilePicture;

const styles = StyleSheet.create({
  container: {
    height: 40,
    width: 40,
    borderRadius: 50,
    marginLeft: 10,
    borderWidth: 3,
    borderColor: Colors.light.light,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 100,
  },
});
