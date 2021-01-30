import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Colors from '../constants/Colors';

const MessageBox = () => {
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
            backgroundColor: isMyMessage() ? Colors.light.primary : 'white',
            marginLeft: isMyMessage() ? 60 : 0,
            marginRight: isMyMessage() ? 0 : 60,
            marginBottom: isMyMessage() ? 2 : 10,
          },
        ]}
      >
        {!isMyMessage() && <Text style={styles.name}>{message.user.name}</Text>}
        <Text style={styles.message}>{message.content} </Text>
        <Text style={styles.time}>3 minutes ago</Text>
      </View>
    </View>
  );
};

export default MessageBox;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
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
  },
  time: {
    alignSelf: 'flex-end',
    fontSize: 10,
    color: 'grey',
  },
});
