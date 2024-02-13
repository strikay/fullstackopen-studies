

import FormikTextInput from './FormikTextInput';
import { View } from 'react-native'
import Button from './Button';
import { Formik } from 'formik';
import * as yup from 'yup';
import { CREATE_USER } from '../graphql/mutations';
import { useMutation } from '@apollo/client';

const initialValues = {
    username: '',
    password: '',
    confirmPassword: ''
}

const validationSchema = yup.object().shape({
    username: yup
        .string()
        .required('Username is required')
        .max(30, "Username must not exceed 30 characters")
        .min(5, "Username must have more than 5 characters"),
    password: yup
        .string()
        .required('Password is required')
        .max(30, "Username must not exceed 30 characters")
        .min(5, "Username must have more than 5 characters"),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref('password'), null], "Passwords must match")
        .required('Password confirmation is required')
});

const SignUpForm = ({onSubmit}) => {
    return(
        <View style={{backgroundColor:'white'}}>
            <FormikTextInput name="username" placeholder="Username"/>
            <FormikTextInput name="password" placeholder="Password" secureTextEntry/>
            <FormikTextInput name="confirmPassword" placeholder="Confirm Password" secureTextEntry/>
            <Button onPress={onSubmit} label="Sign In"/>
        </View>
    )
}

const SignUp = () => {
    const [mutate] = useMutation(CREATE_USER);

    const onSubmit = async (values) => {
        const {username, password} = values;
        const result = await mutate({variables:{user:{username, password}}})
        console.log(result.data)
    }
    return(
        <Formik validationSchema={validationSchema} initialValues={initialValues}  onSubmit={onSubmit}>
            {({handleSubmit}) => <SignUpForm onSubmit={handleSubmit}/>}
        </Formik>
    )
}

export default SignUp;