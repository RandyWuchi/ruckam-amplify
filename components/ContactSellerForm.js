import { API, Auth, graphqlOperation } from 'aws-amplify';
import React from 'react';
import { Keyboard, StyleSheet } from 'react-native';
import * as Yup from 'yup';
import {
  createChatRoom,
  createChatRoomUser,
  createMessage,
  updateChatRoom,
} from '../src/graphql/mutations';

import { Form, FormField, SubmitButton } from './Forms';

const validationSchema = Yup.object().shape({
  message: Yup.string().required().min(1).label('Message'),
});

const ContactSellerForm = ({ listing }) => {
  const handleSubmit = async (values, { resetForm }) => {
    Keyboard.dismiss();
    try {
      //Create chat room
      const newChatRoomData = await API.graphql(
        graphqlOperation(createChatRoom, {
          input: { lastMessageID: 'zz753fca-e8c3-473b-8e85-b14196e84e16' },
        })
      );

      if (!newChatRoomData) {
        console.log('Error creating chat room');
      }

      const newChatRoom = newChatRoomData.data.createChatRoom;

      //Add User to chat room
      await API.graphql(
        graphqlOperation(createChatRoomUser, {
          input: { userID: listing.user.id, chatRoomID: newChatRoom.id },
        })
      );

      //Add authenticated User
      const currentUser = await Auth.currentAuthenticatedUser({
        bypassCache: true,
      });
      await API.graphql(
        graphqlOperation(createChatRoomUser, {
          input: {
            userID: currentUser.attributes.sub,
            chatRoomID: newChatRoom.id,
          },
        })
      );

      //Send message
      const newMessageData = await API.graphql(
        graphqlOperation(createMessage, {
          input: {
            content: values.message,
            userID: currentUser.attributes.sub,
            chatRoomID: newChatRoom.id,
          },
        })
      );

      //Update last message
      await API.graphql(
        graphqlOperation(updateChatRoom, {
          input: {
            id: newChatRoom.id,
            lastMessageID: newMessageData.data.createMessage.id,
          },
        })
      );
    } catch (error) {
      console.log('Error sending message:', error);
    } finally {
      resetForm({});
    }
  };

  return (
    <Form
      initialValues={{ message: '' }}
      onSubmit={(values, { resetForm }) => handleSubmit(values, { resetForm })}
      validationSchema={validationSchema}
    >
      <FormField
        maxLength={255}
        multiline
        name='message'
        numberOfLines={3}
        placeholder='Message...'
      />
      <SubmitButton title='Contact Seller' />
    </Form>
  );
};

export default ContactSellerForm;

const styles = StyleSheet.create({});
