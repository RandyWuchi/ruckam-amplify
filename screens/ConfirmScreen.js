import { useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import * as Yup from 'yup';

import ActivityIndicator from '../components/ActivityIndicator';

import {
  ErrorMessage,
  Form,
  FormField,
  SubmitButton,
} from '../components/forms';
import Screen from '../components/Screen';

const validationSchema = Yup.object().shape({
  code: Yup.string().required().label('Confirm Code'),
});

const ConfirmScreen = () => {
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const route = useRoute();

  const handleSubmit = async ({ code }) => {
    const { email, password } = route.params;
    setLoading(true);
    try {
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };
  return (
    <>
      <ActivityIndicator visible={loading} />
      <Screen style={styles.container}>
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
          <View style={styles.button}>
            <SubmitButton title='Confirm' />
          </View>
        </Form>
      </Screen>
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
