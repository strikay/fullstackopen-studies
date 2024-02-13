
import { View, StyleSheet } from 'react-native';
import { Route, Routes, Navigate } from 'react-router-native';
import AppBar from './AppBar';
import RepositoryList from './RepositoryList';
import theme from '../theme';
import SignIn from './SignIn';
import SingleRepository from './SingleRepository';
import Review from './Review';
import SignUp from './SignUp';
import CurrentUserReviews from './CurrentUserReviews';



const styles = StyleSheet.create({
    container:{
        backgroundColor: theme.colors.appBackground,
        height: "100%",
        flex:1
    }
})
const Main = () => {
  return (
    <View style={styles.container}>
      
        <AppBar/>
        <Routes>
          <Route path="/" element={<RepositoryList />} exact />
          <Route path="/sign-in" element={<SignIn />} exact />
          <Route path="/sign-up" element={<SignUp />} exact />
          <Route path="/repository/:id" element={<SingleRepository/>} exact/>
          <Route path="/review" element={<Review/>} exact/>
          <Route path="/my_reviews" element={<CurrentUserReviews/>} exact/>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    </View>
  );
};

export default Main;