import { useNavigation } from '@react-navigation/native';
import { API, Auth, graphqlOperation, Storage } from 'aws-amplify';
import React, { useEffect, useState } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  useColorScheme,
  View,
} from 'react-native';
import * as Yup from 'yup';
import Geocoder from 'react-native-geocoding';

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
import useLocation from '../hooks/useLocation';
import routes from '../navigation/routes';
import { createListing } from '../src/graphql/mutations';
import Screen from '../components/Screen';

const validationSchema = Yup.object().shape({
  title: Yup.string().required().min(1).label('Title'),
  price: Yup.number().required().min(1).max(10000).label('Price'),
  description: Yup.string().label('Description'),
  category: Yup.object().required().nullable().label('Category'),
  images: Yup.array().min(1, 'Please select at least one image.'),
});

const ListingEditScreen = () => {
  const colorScheme = useColorScheme();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [enableShift, setEnableShift] = useState(false);
  const navigation = useNavigation();

  const getAddress = () => {
    Geocoder.from(location.latitude, location.longitude)
      .then((json) => {
        var addressComponent = json.results[0].formatted_address;
      })
      .catch((error) => console.warn(error));
  };

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

  const handleSubmit = async (values, { resetForm }) => {
    setLoading(true);

    const listingAddress = getAddress();

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
        latitude: location.latitude,
        longitude: location.longitude,
        address: listingAddress,
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
      <Screen>
        <ScrollView showsVerticalScrollIndicator={false}>
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
        </ScrollView>
      </Screen>
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
