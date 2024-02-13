import { Text, Pressable, View } from 'react-native';
import FormikTextInput from '../FormikTextInput';
import theme from '../../theme';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useMutation } from '@apollo/client';
import { CREATE_REVIEW } from '../../graphql/mutations';

const initialValues = {
    ownerName: '',
    repositoryName: '',
    rating: 0,
    text: ''
  };

  const ReviewForm = ({onSubmit}) => {

    return (
      <View style={{backgroundColor:'white'}}>
        <FormikTextInput name="ownerName" placeholder="Repository owner name"/>
        <FormikTextInput name="repositoryName" placeholder="Repository name"/>
        <FormikTextInput name="rating" placeholder="Rating between 0 and 100"/>
        <FormikTextInput name="text" placeholder="Review" multiline/>
        <Pressable onPress={onSubmit} style={{padding:15, margin:15, borderRadius:5, backgroundColor:theme.colors.primary, color:'white'}}>
          <Text style={{color:'white', alignSelf:'center', fontSize: theme.fontSizes.subheading, fontWeight:theme.fontWeights.bold}}>Create a Review</Text>
        </Pressable>
      </View>
    )
  }

  const validationSchema = yup.object().shape({
    ownerName: yup
      .string()
      .required('Repository owner name is required'),
    repositoryName: yup
      .string()
      .required('Repository name is required'),
    rating: yup
      .number()
      .required('Rating is required')
      .max(100, "Rating must not exceed 100")
      .min(0, "Rating must not fall below 0")
      ,
  });

  const Review = () => {
    const [mutate] = useMutation(CREATE_REVIEW);

    const onSubmit = async (values) => {
      const result = await mutate({variables: {review:{...values, rating:Number(values.rating)}}})
      console.log(result.data)
    }

    return(
      <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
        {({handleSubmit}) => (<ReviewForm onSubmit={handleSubmit}/>)}
      </Formik>
    )
  }

  export default Review;