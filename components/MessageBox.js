import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import dayjs from 'dayjs';

const relativeTime = require('dayjs/plugin/relativeTime');
dayjs.extend(relativeTime);

import Colors from '../constants/Colors';

const MessageBox = ({ myId, message }) => {
  const isMyMessage = () => {
    return message.user.id === myId;
  };

  return (
    <View
      style={[
        styles.container,
        { alignItems: isMyMessage() ? 'flex-end' : 'flex-start' },
      ]}
    >
      <View
        style={[
          styles.messageBox,
          {
            backgroundColor: isMyMessage() ? '#DCF8C5' : 'white',
            marginLeft: isMyMessage() ? 60 : 0,
            marginRight: isMyMessage() ? 0 : 60,
          },
        ]}
      >
        {!isMyMessage() && <Text style={styles.name}>{message.user.name}</Text>}
        <Text style={styles.message}>{message.content} </Text>
        <Text style={[styles.time]}>{dayjs(message.createdAt).fromNow()}</Text>
      </View>
    </View>
  );
};

export default MessageBox;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 5,
    paddingTop: 10,
  },
  messageBox: {
    borderRadius: 15,
    padding: 10,
    flexGrow: 1,
    justifyContent: 'flex-end',
    minHeight: 20,
  },
  name: {
    color: Colors.light.tint,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  message: {
    marginBottom: 5,
    fontSize: 16,
  },
  time: {
    alignSelf: 'flex-end',
    fontSize: 10,
    marginLeft: 50,
  },
});
