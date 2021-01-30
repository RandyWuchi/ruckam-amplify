import React from 'react';
import { useFormikContext } from 'formik';
import { View } from 'react-native';

import Button from '../Button';

function SubmitButton({ title }) {
  const { handleSubmit } = useFormikContext();

  return (
    <View style={{ width: '100%', marginTop: 30 }}>
      <Button title={title} onPress={handleSubmit} />
    </View>
  );
}

export default SubmitButton;
