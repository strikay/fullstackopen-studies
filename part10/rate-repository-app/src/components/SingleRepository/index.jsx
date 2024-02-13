import { useQuery } from "@apollo/client";
import { GET_REPOSITORY } from "../../graphql/queries";
import { useParams } from "react-router-native";
import * as Linking from 'expo-linking';
import RepositoryItem from "../RepositoryList/RepositoryItem";
import Text from "../Text";
import { View, Pressable, FlatList } from 'react-native';
import theme from "../../theme";
import { ItemSeparator } from "../RepositoryList";
import ReviewItem from "../ReviewItem";


const RepositoryInfo = ({repository}) => {
    return (
        <View style={{backgroundColor:'white', marginBottom:10}}>
            <RepositoryItem item={repository}/>
            <Pressable onPress={() => Linking.openURL(repository.url)} style={{padding:15, margin:15, borderRadius:5, backgroundColor:theme.colors.primary, color:'white'}}>
                <Text style={{color:'white', alignSelf:'center', fontSize: theme.fontSizes.subheading, fontWeight:theme.fontWeights.bold}}>Open in Github</Text>
            </Pressable>
        </View>
    );
}

const SingleRepository = () => {
    const params = useParams();
    const variables = { repositoryId: params.id, reviewsFirst:4, reviewsAfter:"" }
    
    const {data, loading, fetchMore} = useQuery(GET_REPOSITORY, {
        fetchPolicy: 'cache-and-network',
        variables
    });
    if(loading){
        return <Text>Loading</Text>
    }
    const handleFetchMore = () => {
        const canFetchMore = !loading && data?.repository.reviews.pageInfo.hasNextPage;
    
        if (!canFetchMore) {
          return;
        }
    
        fetchMore({
          variables: {
            ...variables,
            reviewsAfter: data.repository.reviews.pageInfo.endCursor,
          },
        });
    };

    const repository = data.repository
    const reviews = repository.reviews
        ?repository.reviews.edges.map((edge)=>edge.node)
        :[]

    const onEndReach = () => {
        handleFetchMore();
    };

    return (
      <FlatList
        data={reviews}
        renderItem={({ item, index, separators }) => (<ReviewItem key={index} separators={separators} review={item} />)}
        keyExtractor={({ id }) => id}
        ListHeaderComponent={() => <RepositoryInfo repository={repository} />}
        ItemSeparatorComponent={ItemSeparator}
        onEndReached={onEndReach}
        onEndReachedThreshold={0.5}
      />
    );
  };

export default SingleRepository