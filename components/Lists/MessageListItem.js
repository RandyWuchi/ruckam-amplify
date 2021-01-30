import React from 'react';
import {
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';

import Colors from '../../constants/Colors';
import Text from '../Text';
import ListItemDeleteAction from './ListItemDeleteAction';

const MessageListItem = () => {
  const handleClick = () => {};

  const handleDelete = async () => {};

  return (
    <Swipeable
      renderRightActions={() => <ListItemDeleteAction onPress={handleDelete} />}
    >
      <TouchableWithoutFeedback onPress={handleClick}>
        <View style={styles.container}>
          <View style={styles.leftContainer}>
            <Image source={{ uri: imageUri }} style={styles.image} />

            <View style={styles.detailsContainer}>
              <Text style={styles.username}>John Wick</Text>
              <Text style={styles.lastMessage} numberOfLines={1}>
                How are you
              </Text>
            </View>
          </View>

          <Text style={styles.time}>27 January</Text>
        </View>
      </TouchableWithoutFeedback>
    </Swipeable>
  );
};

export default MessageListItem;

const styles = StyleSheet.create({
  avatar: {
    width: 50,
    height: 50,
  },
  container: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: Colors.light.white,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 10,
  },
  subTitle: {
    color: 'grey',
  },
  title: {
    fontWeight: '500',
  },
  leftContainer: {
    flexDirection: 'row',
    flex: 1,
  },
  username: {
    fontWeight: 'bold',
  },
  lastMessage: {
    color: 'grey',
    marginRight: 10,
    fontSize: 16,
  },
  time: {
    color: 'grey',
    fontSize: 14,
  },
  detailsContainer: {
    justifyContent: 'space-around',
  },
});
