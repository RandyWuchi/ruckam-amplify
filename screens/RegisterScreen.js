import { Auth, Storage } from 'aws-amplify';
import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  StyleSheet,
  View,
  Text,
  useColorScheme,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  StatusBar,
} from 'react-native';
import * as Yup from 'yup';

import ActivityIndicator from '../components/ActivityIndicator';
import {
  ErrorMessage,
  Form,
  FormField,
  FormProfileImage,
  SubmitButton,
} from '../components/Forms';
import Colors from '../constants/Colors';
import routes from '../navigation/routes';

const validationSchema = Yup.object().shape({
  profilePhoto: Yup.string(),
  fullName: Yup.string().required().label('Name'),
  email: Yup.string().required().email().label('Email'),
  password: Yup.string().required().min(6).label('Password'),
});

const RegisterScreen = ({ navigation }) => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const colorScheme = useColorScheme();

  const uploadImage = async (uri) => {
    try {
      const response = await fetch(uri);

      const blob = await response.blob();

      const urlParts = uri.split('.');
      const extension = urlParts[urlParts.length - 1];

      const key = `${Math.random()}.${extension}`;

      await Storage.put(key, blob, { contentType: 'image/jpeg' });

      return key;
    } catch (error) {
      console.log('Error @upLoadImage:', error);
    }
  };

  const handleSubmit = async ({ fullName, email, password, profilePhoto }) => {
    Keyboard.dismiss();
    setLoading(true);

    //Upload image to s3 storage
    let profileImage;
    profileImage = await uploadImage(profilePhoto);

    try {
      //Register user
      const { user } = await Auth.signUp({
        username: email,
        password,
        attributes: { name: fullName, picture: profileImage },
      });

      //Navigate user to the confirm screen
      user && navigation.navigate(routes.CONFIRM, { email, password });
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ActivityIndicator visible={loading} />
      <StatusBar hidden />
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <KeyboardAvoidingView
          style={[
            styles.container,
            { backgroundColor: Colors[colorScheme].background },
          ]}
          behavior='padding'
        >
          <Form
            initialValues={{
              fullName: '',
              email: '',
              password: '',
              profilePhoto: null,
            }}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            <FormProfileImage name='profilePhoto' />
            <ErrorMessage error={error} visible={error} />
            <FormField
              autoCorrect={false}
              icon='account'
              name='fullName'
              placeholder='Name'
            />
            <FormField
              name='email'
              autoCorrect={false}
              autoCapitalize='none'
              icon='email'
              keyboardType='email-address'
              placeholder='Email'
              textContentType='emailAddress'
            />
            <FormField
              name='password'
              autoCapitalize='none'
              autoCorrect={false}
              icon='lock'
              placeholder='Password'
              textContentType='password'
              secureTextEntry
            />
            <SubmitButton title='Register' />
            <TouchableOpacity
              style={styles.login}
              onPress={() => navigation.replace(routes.LOGIN)}
            >
              <Text style={{ color: '#2e2e2e', marginTop: 10 }}>
                Already have an account ?{' '}
                <Text style={{ color: Colors.light.primary }}>Login</Text>
              </Text>
            </TouchableOpacity>
          </Form>
          <View style={{ height: 50 }} />
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: 20,
  },
  register: {
    flexDirection: 'row',
    marginBottom: 30,
    marginTop: 10,
  },
});
