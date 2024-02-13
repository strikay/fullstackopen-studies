import { FlatList, View, Alert } from "react-native"
import { useNavigate } from "react-router-native";
import { ItemSeparator } from "./RepositoryList"
import ReviewItem from "./ReviewItem"
import useAuthDetails from "../hooks/useAuthDetails"
import Button from "./Button"
import { useMutation, useApolloClient } from "@apollo/client";
import { DELETE_REVIEW } from "../graphql/mutations";

const CurrentUserReviews = () => {
    const navigate = useNavigate();
    const apolloClient = useApolloClient();
    const {authDetails} = useAuthDetails(true);
    const myDetails = authDetails ? authDetails.me : null
    
    const reviews = myDetails ? myDetails.reviews.edges.map(edge => edge.node) : []

    const ActionReviewItem = ({review}) => {
        const [mutate] = useMutation(DELETE_REVIEW);
        const deleteReview = async (id) => {
           const result = await mutate({variables: {deleteReviewId:id}});
           console.log(result);
           apolloClient.resetStore();
        }
        const showAlert = () => {  
            Alert.alert(  
                'Delete Review',  
                'Are you sure you want to delete this review?',  
                [  
                    {  
                        text: 'CANCEL',  
                        onPress: () => console.log('Cancel Pressed'),  
                        style: 'cancel',  
                    },  
                    {text: 'DELETE', onPress: () => deleteReview(review.id)},  
                ]  
            );  
        } 
        return(
            <>
                <ReviewItem review={review}/>
                <View style={{display:'flex', flexDirection:'row',  backgroundColor: 'white'}}>
                    <Button onPress={()=> navigate(`/repository/${review.repositoryId}`)} label="View Repository"/>
                    <Button onPress={showAlert} backgroundColor="red" noLeftMargin label="Delete Review"/>
                </View>
            </>
            
        )
    };

    return(
        <FlatList
            data={reviews}
            renderItem={({ item, index, separators }) => (<ActionReviewItem key={index} separators={separators} review={item} />)}
            keyExtractor={({ id }) => id}
            ItemSeparatorComponent={ItemSeparator}
        />
    )
}

export default CurrentUserReviews;