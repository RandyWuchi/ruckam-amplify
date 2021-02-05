import React, { useState } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableWithoutFeedback,
  useColorScheme,
  View,
} from 'react-native';
import * as Yup from 'yup';

import ActivityIndicator from '../components/ActivityIndicator';
import CategoryPickerItem from '../components/CategoryPickerItem';
import {
  Form,
  FormField,
  FormImagePicker,
  FormPicker,
  SubmitButton,
} from '../components/Forms';
import Colors from '../constants/Colors';
import { categories } from '../data/Categories';

const validationSchema = Yup.object().shape({
  title: Yup.string().required().min(1).label('Title'),
  price: Yup.number().required().min(1).max(10000).label('Price'),
  description: Yup.string().label('Description'),
  category: Yup.object().required().nullable().label('Category'),
  images: Yup.array().min(1, 'Please select at least one image.'),
});

const ListingEditScreen = () => {
  const colorScheme = useColorScheme();
  const [loading, setLoading] = useState(false);
  const [enableShift, setEnableShift] = useState(false);

  const handleSubmit = () => {};

  return (
    <>
      <ActivityIndicator visible={loading} />
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <KeyboardAvoidingView
          style={[
            styles.container,
            { backgroundColor: Colors[colorScheme].background },
          ]}
          enabled={enableShift}
          behavior='padding'
        >
          <Form
            initialValues={{
              title: '',
              price: '',
              description: '',
              category: null,
              images: [],
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <FormImagePicker name='images' />
            <FormField maxLength={255} name='title' placeholder='Title' />
            <FormField
              keyboardType='numeric'
              width={120}
              maxLength={8}
              name='price'
              placeholder='Price'
            />
            <FormPicker
              items={categories}
              name='category'
              placeholder='Category'
              numberOfColumns={3}
              width='50%'
              PickerItemComponent={CategoryPickerItem}
            />
            <FormField
              maxLength={255}
              multiline
              name='description'
              placeholder='Description'
              onFocus={() => setEnableShift(true)}
            />

            <SubmitButton title='Post' />
            <View style={{ height: 150 }} />
          </Form>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </>
  );
};

export default ListingEditScreen;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    paddingTop: 30,
  },
});
