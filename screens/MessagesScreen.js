import React, { useContext, useLayoutEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

import { ListItemSeparator, MessageListItem } from '../components/Lists';
import ProfilePicture from '../components/ProfilePicture';
import Text from '../components/Text';
import Colors from '../constants/Colors';
import { UserContext } from '../context/UserContext';

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
      headerLeft: () => <ProfilePicture image={user.imageUri} />,
    });
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
