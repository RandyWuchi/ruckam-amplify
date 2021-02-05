import { useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import InputBox from '../components/InputBox';
import MessageBox from '../components/MessageBox';

const MessagesRoomScreen = () => {
  const [messages, setMessages] = useState([]);
  const [myId, setMyId] = useState(null);
  const route = useRoute();

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
