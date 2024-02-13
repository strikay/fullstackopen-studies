import { View, ScrollView, StyleSheet, Text, StatusBar, Pressable } from 'react-native';
import { useNavigate } from "react-router-native";
import Constants from 'expo-constants';
import theme from '../theme';
import useAuthDetails from '../hooks/useAuthDetails';
import { useAuthStorage } from '../hooks/useAuthStorage';
import { useApolloClient } from '@apollo/client';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    paddingBottom: Constants.statusBarHeight,
    paddingLeft: 15,
    backgroundColor: theme.colors.appBarBackground,
  },
});

const Tab = (props) => {
    const handlePress = props.onPress;
    const styles = StyleSheet.create({
      appBarHeading: {
        color:'white',
        fontSize:theme.fontSizes.subheading,
        fontWeight:theme.fontWeights.bold,
      },
      tab:{
        marginRight: 20,
      }
    })
    return (
        <Pressable style={styles.tab} onPress={handlePress}>
            <Text style={styles.appBarHeading}>{props.label}</Text>
        </Pressable>
    )
}

const AppBarTabs = () => {
  const navigate = useNavigate();
  const {authDetails} = useAuthDetails(true);
  const authStorage = useAuthStorage();
  const apolloClient =  useApolloClient();
  
  const myDetails = authDetails ? authDetails.me : null

  const signOut = () => {
    authStorage.removeAccessToken();
    apolloClient.resetStore();
  }
  const toggleAuthentication = () => {
    !myDetails
    ? navigate('/sign-in')
    : signOut()
  };
  return (<>        
      <ScrollView horizontal> 
        <Tab onPress={()=>{navigate('/')}} label='Repositories'/>
        {myDetails && <Tab onPress={()=>{navigate('/review')}} label='Create a review'/>}
        {myDetails && <Tab onPress={()=>{navigate('/my_reviews')}} label='My Reviews'/>}
        <Tab onPress={toggleAuthentication} label={myDetails ? 'Sign out' : 'Sign in'}/>
        {!myDetails && <Tab onPress={()=>{navigate('/sign-up')}} label='Sign Up'/>}
      </ScrollView>
  </>)

}

const AppBar = () => {

  return (
  <View style={styles.container}>
    <StatusBar backgroundColor = {theme.colors.appBarBackground}/>
    <AppBarTabs/>
  </View>);
};

export default AppBar;