import { useNavigation } from '@react-navigation/native';
import dayjs from 'dayjs';
import React, { useState } from 'react';
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

const MessageListItem = ({ chatRoom }) => {
  const navigation = useNavigation();
  const [otherUser, setOtherUser] = useState(null);

  const handleClick = () => {};

  const handleDelete = async () => {};

  return (
    <Swipeable
      renderRightActions={() => <ListItemDeleteAction onPress={handleDelete} />}
    >
      <TouchableWithoutFeedback onPress={handleClick}>
        <View style={styles.container}>
          <View style={styles.leftContainer}>
            <Image source={{ uri: otherUser.imageUri }} style={styles.image} />

            <View style={styles.detailsContainer}>
              <Text style={styles.username}>{otherUser.name}</Text>
              <Text style={styles.lastMessage} numberOfLines={1}>
                {chatRoom.lastMessage
                  ? `${chatRoom.lastMessage.user.name}: ${chatRoom.lastMessage.content}`
                  : ''}
              </Text>
            </View>
          </View>

          <Text style={styles.time}>
            {dayjs(chatRoom.lastMessage.createdAt).calendar(null, {
              sameDay: '[Today at] h:mm A', // The same day ( Today at 2:30 AM )
              nextDay: '[Tomorrow]', // The next day ( Tomorrow at 2:30 AM )
              nextWeek: 'dddd', // The next week ( Sunday at 2:30 AM )
              lastDay: '[Yesterday]', // The day before ( Yesterday at 2:30 AM )
              lastWeek: '[Last] dddd', // Last week ( Last Monday at 2:30 AM )
              sameElse: 'DD/MM/YYYY', // Everything else ( 7/10/2011 )
            })}
          </Text>
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
