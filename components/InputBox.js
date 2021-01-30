import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import Colors from '../constants/Colors';

const InputBox = () => {
  const [message, setMessage] = useState('');

  const onMessageSend = async () => {};

  const onMicPress = () => {
    console.warn('Microphone');
  };

  const handleSubmit = () => {
    if (!message) {
      onMicPress();
    } else {
      onMessageSend();
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={65}
    >
      <View style={styles.container}>
        <TouchableWithoutFeedback>
          <View style={styles.mainContainer}>
            <TextInput
              style={styles.input}
              multiline
              value={message}
              onChangeText={setMessage}
              placeholder='Type a message'
              editable
              accessible
              accessibilityLabel='Type a message'
              autoFocus
              enablesReturnKeyAutomatically
            />

            <MaterialCommunityIcons
              style={styles.icon}
              name='attachment'
              size={24}
              color='grey'
            />
            {!message && (
              <MaterialCommunityIcons
                style={styles.icon}
                name='camera'
                size={24}
                color='grey'
              />
            )}
          </View>
        </TouchableWithoutFeedback>
        <TouchableOpacity onPress={handleSubmit}>
          <View style={styles.buttonContainer}>
            {!message ? (
              <MaterialCommunityIcons
                name='microphone'
                size={28}
                color='white'
              />
            ) : (
              <MaterialCommunityIcons name='send' size={24} color='white' />
            )}
          </View>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default InputBox;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: Colors.light.white,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: 'grey',
  },
  mainContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    marginRight: 5,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'grey',
  },
  buttonContainer: {
    backgroundColor: Colors.light.tint,
    borderRadius: 50,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    marginTop: 5,
    marginBottom: 2,
  },
  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    lineHeight: 16,
    ...Platform.select({
      web: {
        paddingTop: 6,
        paddingLeft: 4,
      },
    }),
    marginTop: Platform.select({
      ios: 6,
      android: 0,
      web: 6,
    }),
    marginBottom: Platform.select({
      ios: 5,
      android: 3,
      web: 4,
    }),
  },
  icon: {
    marginHorizontal: 5,
  },
});
