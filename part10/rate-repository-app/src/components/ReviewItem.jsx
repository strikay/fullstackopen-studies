import Text from "./Text";
import { View, StyleSheet } from 'react-native';
import theme from "../theme";
import { ItemSeparator } from "./RepositoryList";

const styles = StyleSheet.create({

    flexContainer: {
        display: 'flex',
        padding: 10,
        flexDirection: 'row',
        alignItems: 'stretch',
        backgroundColor: 'white',
      },
    flexRatingContainer: {
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 30,
        borderWidth: 3,
        borderStyle: 'solid',
        borderColor: theme.colors.primary,
        height:60,
        width:60,
        alignItems: 'center',
        justifyContent: 'center',
        flexGrow: 0,
        flexShrink: 0,
        overflow: 'hidden'
    },
    flexRatingText:{
        color: theme.colors.primary,
        fontSize:18,
        
    },
    flexHeadingBlock: { 
      overflowX: 'auto',
      flexBasis: '80%',
      marginLeft: 15,
      paddingRight:5,
      paddinLeft:5,
      flexGrow:2,
    },
});

const ReviewItem = ({review}) => {
    console.log(review)
    const {text, user, rating, createdAt} = review;
    const creationDateObject = new Date(createdAt)
    const creationDateText = creationDateObject.toLocaleDateString().replace(/\//g, ".")
    return (
        <View style={[styles.flexContainer]}>                
            <View style={styles.flexRatingContainer}>
                <Text fontWeight = 'bold' style={styles.flexRatingText}>{rating}</Text>
            </View>
            <View style={styles.flexHeadingBlock}>
                <Text fontWeight = 'bold' fontSize='subheading' >{user.username}</Text>
                <ItemSeparator/>
                <Text>{creationDateText}</Text>
                <ItemSeparator/>
                <Text>{text}</Text>
            </View>
        </View>
    )
};

export default ReviewItem;