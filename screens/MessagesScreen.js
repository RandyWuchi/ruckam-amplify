import React, { useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

import { ListItemSeparator, MessageListItem } from '../components/Lists';
import Text from '../components/Text';

const MessagesScreen = () => {
  const [chatRooms, setChatRooms] = useState([]);
  return (
    <View style={[styles.container]}>
      {chatRooms.length === 0 ? (
        <View style={styles.noMessages}>
          <Text style={styles.text}>You have no messages</Text>
        </View>
      ) : (
        <FlatList
          data={chatRooms}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={ListItemSeparator}
          renderItem={({ item }) => (
            <MessageListItem chatRoom={item.chatRoom} />
          )}
        />
      )}
    </View>
  );
};

export default MessagesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  noMessages: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  text: {
    fontSize: 18,
    fontWeight: '600',
    opacity: 0.5,
  },
});
