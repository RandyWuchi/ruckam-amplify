import { Auth } from 'aws-amplify';
import React, { useContext, useState } from 'react';
import {
  Image,
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
  SubmitButton,
} from '../components/Forms';
import Colors from '../constants/Colors';
import { AuthContext } from '../context/AuthContext';
import { UserContext } from '../context/UserContext';
import authStorage from '../auth/storage';
import routes from '../navigation/routes';

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label('Email'),
  password: Yup.string().required().min(6).label('Password'),
});

const LoginScreen = ({ navigation }) => {
  const [loginFailed, setLoginFailed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [_, setUser] = useContext(UserContext);
  const [__, setAuth] = useContext(AuthContext);

  const colorScheme = useColorScheme();

  const handleSubmit = async ({ email, password }) => {
    Keyboard.dismiss();
    setLoading(true);

    try {
      //Sign in user
      const user = await Auth.signIn(email, password);

      const key = user.attributes.picture;

      //Store User in User context
      setUser({
        name: user.attributes.name,
        email: user.attributes.email,
        id: user.attributes.sub,
        imageUri: user.attributes.picture,
        isLoggedIn: true,
      });

      //Store user in authContext
      setAuth(user);

      //Store token in Auth storage
      await authStorage.storeToken(user.signInUserSession.accessToken.jwtToken);
    } catch (error) {
      console.log('Error @login:', error.message);
      setLoginFailed(true);
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
          <Image style={styles.logo} source={require('../assets/logo.png')} />
          <Form
            initialValues={{ email: '', password: '' }}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            <ErrorMessage
              error='Invalid email and/or password'
              visible={loginFailed}
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
            <SubmitButton title='Login' />
            <TouchableOpacity
              style={styles.register}
              onPress={() => navigation.replace(routes.REGISTER)}
            >
              <Text style={{ color: '#2e2e2e' }}>
                Dont have an account ?{' '}
                <Text style={{ color: Colors.light.primary }}>Register</Text>
              </Text>
            </TouchableOpacity>
          </Form>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </>
  );
};

export default LoginScreen;

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
