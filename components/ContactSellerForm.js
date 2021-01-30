import React from 'react';
import { Keyboard, StyleSheet } from 'react-native';
import * as Yup from 'yup';

import { Form, FormField, SubmitButton } from './Forms';

const validationSchema = Yup.object().shape({
  message: Yup.string().required().min(1).label('Message'),
});

const ContactSellerForm = ({ listing }) => {
  const handleSubmit = async (values, { resetForm }) => {
    Keyboard.dismiss();
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
