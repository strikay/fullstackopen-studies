import { View, StyleSheet, Image} from 'react-native';
import Text from '../../Text';
import theme from '../../../theme';

const styles = StyleSheet.create({
    separator: {
        height: 10,
      },

    langueageTag:{
        backgroundColor: theme.colors.primary,  
        padding: 5, 
        borderRadius: 5,
        alignSelf: 'flex-start',
    },

    flexContainer: {
        display: 'flex',
        padding: 10,
        flexDirection: 'row',
        alignItems: 'stretch',
        backgroundColor: 'white',
        flexWrap:'wrap'
      },
    flexImageContainer: {
       borderRadius: 5,
       height:50,
       flexGrow: 0,
       flexShrink: 0,
       overflow: 'hidden'
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

 const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryDetails = ({ownerAvatarUrl, fullName, description, language}) => {
    return (            
        <View style={[styles.flexContainer, {paddingBottom: 0}]}>                
            <View style={styles.flexImageContainer}>
                <Image
                    style={{height:50, width:50}}
                    source={{uri:ownerAvatarUrl}}
                />
            </View>
            <View style={styles.flexHeadingBlock}>
                <Text fontWeight = 'bold' fontSize='subheading' >{fullName}</Text>
                <ItemSeparator/>
                <Text>{description}</Text>
                <ItemSeparator/>
                <View 
                    style={styles.langueageTag}
                    >
                    <Text style={{color:'white'}}>{language}</Text>
                </View>
            </View>
        </View>
    );
}

export default RepositoryDetails;
