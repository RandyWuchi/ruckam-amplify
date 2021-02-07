import { useNavigation } from '@react-navigation/native';
import { Auth } from 'aws-amplify';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { S3Image } from 'aws-amplify-react-native';

const calendar = require('dayjs/plugin/calendar');
dayjs.extend(calendar);

import Colors from '../../constants/Colors';
import Text from '../Text';
import ListItemDeleteAction from './ListItemDeleteAction';

const MessageListItem = ({ chatRoom }) => {
  const navigation = useNavigation();
  const [otherUser, setOtherUser] = useState(null);

  useEffect(() => {
    const getOtherUser = async () => {
      try {
        const currentUser = await Auth.currentAuthenticatedUser();

        if (
          chatRoom.chatRoomUsers.items[0].user.id === currentUser.attributes.sub
        ) {
          setOtherUser(chatRoom.chatRoomUsers.items[1].user);
        } else {
          setOtherUser(chatRoom.chatRoomUsers.items[0].user);
        }
      } catch (error) {
        console.log('Error @getOtherUser:', error);
      }
    };
    getOtherUser();
  }, []);

  const handleClick = () => {
    navigation.navigate('MessagesRoom', {
      id: chatRoom.id,
      name: otherUser.name,
    });
  };

  const handleDelete = async () => {};

  if (!otherUser) {
    return null;
  }
  return (
    <Swipeable
      renderRightActions={() => <ListItemDeleteAction onPress={handleDelete} />}
    >
      <TouchableWithoutFeedback onPress={handleClick}>
        <View style={styles.container}>
          <View style={styles.leftContainer}>
            <S3Image imgKey={otherUser.imageUri} style={styles.image} />

            <View style={styles.detailsContainer}>
              <Text style={styles.username}>{otherUser.name}</Text>
              <Text style={styles.lastMessage} numberOfLines={1}>
                {chatRoom.lastMessage ? ` ${chatRoom.lastMessage.content}` : ''}
              </Text>
            </View>
          </View>

          <Text style={styles.time}>
            {dayjs(
              chatRoom.lastMessage.updatedAt || chatRoom.lastMessage.createdAt
            ).calendar(null, {
              sameDay: ' h:mm A', // The same day ( 2:30 AM )
              nextDay: '[Tomorrow at] h:mm A', // The next day ( Tomorrow at 2:30 AM )
              nextWeek: 'dddd [at] h:mm A', // The next week ( Sunday at 2:30 AM )
              lastDay: '[Yesterday ] ', // The day before ( Yesterday )
              lastWeek: '[Last] dddd', // Last week ( Last Monday  )
              sameElse: 'DD MMM, YYYY', // Everything else ( 17 MAR, 2020 )
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
    marginLeft: 4,
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
