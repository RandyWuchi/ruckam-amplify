import { useRoute } from '@react-navigation/native';
import { API, Auth, graphqlOperation } from 'aws-amplify';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

import InputBox from '../components/InputBox';
import MessageBox from '../components/MessageBox';
import { messagesByChatRoom } from '../src/graphql/queries';
import { onCreateMessage } from '../src/graphql/subscriptions';

const MessagesRoomScreen = () => {
  const [messages, setMessages] = useState([]);
  const [myId, setMyId] = useState(null);
  const route = useRoute();

  //Fetch message from backend
  const fetchMessages = async () => {
    const messagesData = await API.graphql(
      graphqlOperation(messagesByChatRoom, {
        chatRoomID: route.params.id,
        sortDirection: 'DESC',
      })
    );
    setMessages(messagesData.data.messagesByChatRoom.items);
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  //Get current user
  useEffect(() => {
    const getMyId = async () => {
      const currentUser = await Auth.currentAuthenticatedUser();

      setMyId(currentUser.attributes.sub);
    };
    getMyId();
  }, []);

  //Get realtime messages
  useEffect(() => {
    const subscription = API.graphql(
      graphqlOperation(onCreateMessage)
    ).subscribe({
      next: (data) => {
        const newMessage = data.value.data.onCreateMessage;

        if (newMessage.chatRoomID !== route.params.id) {
          console.log('Message is in another room');
          return;
        }

        setMessages((messages) => [newMessage, ...messages]);
      },
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        inverted
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <MessageBox myId={myId} message={item} />}
      />
      <InputBox chatRoomID={route.params.id} />
    </View>
  );
};

export default MessagesRoomScreen;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
});
