import { useFormikContext } from 'formik';
import React from 'react';

import Picker from '../Picker';
import Picker2 from '../Picker2';
import ErrorMessage from './ErrorMessage';

const FormPicker = ({ name, placeholder, width }) => {
  const { errors, touched, setFieldValue, values } = useFormikContext();

  return (
    <>
      <Picker2
        onSelectItem={(item) => setFieldValue(name, item)}
        placeholder={placeholder}
        width={width}
        selectedItem={values[name]}
      />
      <ErrorMessage visible={touched[name]} error={errors[name]} />
    </>
  );
};

export default FormPicker;
