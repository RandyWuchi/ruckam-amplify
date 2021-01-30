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
  username: Yup.string().required().label('Name'),
  email: Yup.string().required().email().label('Email'),
  password: Yup.string().required().min(6).label('Password'),
});

const RegisterScreen = ({ navigation }) => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const colorScheme = useColorScheme();

  const handleSubmit = async () => {
    Keyboard.dismiss();
    setLoading(true);

    try {
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ActivityIndicator visible={loading} />
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
              username: '',
              email: '',
              password: '',
              profilePhoto: null,
            }}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            <ErrorMessage error={error} visible={error} />
            <FormProfileImage name='profilePhoto' />
            <FormField
              autoCorrect={false}
              icon='account'
              name='username'
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
