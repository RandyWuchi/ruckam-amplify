import { API, graphqlOperation } from 'aws-amplify';
import React, { useContext, useEffect, useLayoutEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

import { ListItemSeparator, MessageListItem } from '../components/Lists';
import Text from '../components/Text';
import Colors from '../constants/Colors';
import { UserContext } from '../context/UserContext';
import { onUpdateChatRoom } from '../src/graphql/subscriptions';
import { getUser } from './queries';

const MessagesScreen = ({ navigation }) => {
  const [chatRooms, setChatRooms] = useState([]);
  const [user] = useContext(UserContext);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Messages',
      headerStyle: { backgroundColor: Colors.light.white },
      headerTitleStyle: {
        fontSize: 20,
        color: Colors.light.primary,
        fontWeight: 'bold',
      },
    });
  }, []);

  const fetchMessagesRooms = async () => {
    try {
      const userData = await API.graphql(
        graphqlOperation(getUser, { id: user.id })
      );

      setChatRooms(userData.data.getUser.chatRoomUser.items);
    } catch (error) {
      console.log('Error @fetchMessagesRoom:', error);
    }
  };

  useEffect(() => {
    fetchMessagesRooms();
  }, []);

  //Subscribe to update on messages
  useEffect(() => {
    const subscription = API.graphql(
      graphqlOperation(onUpdateChatRoom)
    ).subscribe({
      next: () => {
        fetchMessagesRooms();
      },
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <View style={[styles.container]}>
      {chatRooms.length === 0 ? (
        <View style={styles.noMessages}>
          <Text style={styles.text}>You have no messages</Text>
        </View>
      ) : (
        <FlatList
          data={chatRooms}
          bounces={false}
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
