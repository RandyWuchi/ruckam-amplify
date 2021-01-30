import { useFormikContext } from 'formik';
import React from 'react';
import { StyleSheet } from 'react-native';

import ProfileImageInput from '../ProfileImageInput';

const FormProfileImage = ({ name }) => {
  const { values, setFieldValue } = useFormikContext();
  const imageUri = values[name];

  return (
    <>
      <ProfileImageInput
        imageUri={imageUri}
        onChangeImage={(uri) => setFieldValue(name, uri)}
      />
    </>
  );
};

export default FormProfileImage;

const styles = StyleSheet.create({});
