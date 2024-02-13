import { View } from 'react-native';
import { Formik } from 'formik';
import FormikTextInput from './FormikTextInput';
import * as yup from 'yup';
import useSignIn from '../hooks/useSIgnIn';
import { useApolloClient } from '@apollo/client';
import { useAuthStorage } from '../hooks/useAuthStorage';
import Button from './Button';

const SignInForm = ({ onSubmit }) => {
 
  return (
    <View style={{backgroundColor:'white'}}>
      <FormikTextInput name="username" placeholder="Username" />
      <FormikTextInput name="password" placeholder="Password" secureTextEntry />
      <Button onPress={onSubmit} label="Sign In"/>
    </View>
  );
};

const SignIn = () => {
  const [signIn] = useSignIn();
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      const { data } = await signIn({ username, password });
      console.log(data);
      authStorage.setAccessToken(data.authenticate.accessToken);
      apolloClient.resetStore();
    } catch (e) {
      console.log(e);
    }
  };

  return (<SignInContainer onSubmit={onSubmit}/>);
};

export const SignInContainer = ({ onSubmit}) => {

  const initialValues = {
    username: '',
    password: '',
  };
  
  const validationSchema = yup.object().shape({
    username: yup
      .string()
      .required('Username is required'),
    password: yup
      .string()
      .required('Password is required'),
  });

  return (
    <Formik validationSchema={validationSchema} initialValues={initialValues} onSubmit={onSubmit}>
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
  );
}

export default SignIn;