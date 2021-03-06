import { useRoute } from '@react-navigation/native';
import { API, Auth, graphqlOperation } from 'aws-amplify';
import React, { useContext, useState } from 'react';
import {
  KeyboardAvoidingView,
  StatusBar,
  StyleSheet,
  useColorScheme,
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
import { UserContext } from '../context/UserContext';
import { AuthContext } from '../context/AuthContext';
import authStorage from '../auth/storage';
import { createUser } from '../src/graphql/mutations';

const validationSchema = Yup.object().shape({
  code: Yup.string().required().label('Confirm Code'),
});

const ConfirmScreen = () => {
  const colorScheme = useColorScheme();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [_, setUser] = useContext(UserContext);
  const [__, setAuth] = useContext(AuthContext);
  const route = useRoute();

  const saveUserToDB = async (user) => {
    await API.graphql(graphqlOperation(createUser, { input: user }));
  };

  const handleSubmit = async ({ code }) => {
    const { email, password } = route.params;
    setLoading(true);
    try {
      //confirm registration with code received
      await Auth.confirmSignUp(email, code, { forceAliasCreation: true });

      //sign in created user
      const createdUser = await Auth.signIn(email, password);

      const user = {
        id: createdUser.attributes.sub,
        email: createdUser.attributes.email,
        name: createdUser.attributes.name,
        imageUri: createdUser.attributes.picture,
      };

      await saveUserToDB(user);

      //Store Auth in authContext
      setAuth(createdUser);

      //Store token in Auth storage
      await authStorage.storeToken(
        createdUser.signInUserSession.accessToken.jwtToken
      );

      //Store User in User context
      setUser({ ...user, isLoggedIn: true });
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
      <KeyboardAvoidingView
        style={[
          styles.container,
          { backgroundColor: Colors[colorScheme].background },
        ]}
      >
        <Form
          initialValues={{ code: '' }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <ErrorMessage visible={error} error={error} />
          <FormField
            autoCapitalize='none'
            autoCorrect={false}
            icon='email'
            name='code'
            keyboardType='numeric'
            placeholder='Enter the code your received'
          />

          <SubmitButton title='Confirm' />
        </Form>
      </KeyboardAvoidingView>
    </>
  );
};

export default ConfirmScreen;

const styles = StyleSheet.create({
  button: {
    marginTop: 20,
  },
  container: {
    padding: 20,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
