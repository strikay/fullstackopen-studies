import { StyleSheet } from 'react-native';
import { useField } from 'formik';

import TextInput from './TextInput';
import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
  errorText: {
    marginTop: 5,
    marginLeft: 15,
    color: theme.colors.error,
  },
  input: {
    marginTop:10,
    marginLeft:15,
    marginRight:15,
    padding:10,
    borderWidth:1,
    borderRadius:5,
    fontSize: theme.fontSizes.subheading
  }
});

const FormikTextInput = ({ name, ...props }) => {
  const [field, meta, helpers] = useField(name);
  const showError = meta.touched && meta.error;

  const inputStyle = {
    ...styles.input,
    borderColor: showError? theme.colors.error:'grey'
  }
  return (
    <>
      <TextInput
        onChangeText={value => {helpers.setValue(value);}}
        onBlur={() => {helpers.setTouched(true)}}
        value={field.value}
        error={showError}
        style={inputStyle}
        {...props}
      />
      {showError && <Text style={styles.errorText}>{meta.error}</Text>}
    </>
  );
};

export default FormikTextInput;