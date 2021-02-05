import { useNavigation } from '@react-navigation/native';
import { API, Auth, graphqlOperation, Storage } from 'aws-amplify';
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
import routes from '../navigation/routes';
import { createListing } from '../src/graphql/mutations';

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
  const navigation = useNavigation();

  const uploadImage = async (uri) => {
    try {
      const response = await fetch(uri);

      const blob = await response.blob();

      const urlParts = uri.split('.');
      const extension = urlParts[urlParts.length - 1];

      const key = `${Math.random()}.${extension}`;

      await Storage.put(key, blob, { contentType: 'image/jpeg' });

      const url = await Storage.get(key);

      return url;
    } catch (error) {
      console.log('Error @upLoadImage:', error);
    }
  };

  const handleSubmit = async (values, { resetForm }) => {
    setLoading(true);

    const images = values.images;
    let imagesUrl = [];
    imagesUrl = await Promise.all(images.map((image) => uploadImage(image)));

    try {
      const userInfo = await Auth.currentAuthenticatedUser({
        bypassCache: true,
      });

      const newListing = {
        title: values.title,
        price: values.price,
        description: values.description,
        category: values.category,
        images: imagesUrl,
        userID: userInfo.attributes.sub,
      };

      await API.graphql(graphqlOperation(createListing, { input: newListing }));
      navigation.navigate(routes.LISTING);
    } catch (error) {
      console.log('Error @createListing:', error);
    } finally {
      resetForm({});
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
            onSubmit={(values, { resetForm }) =>
              handleSubmit(values, { resetForm })
            }
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
