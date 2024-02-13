
import { useQuery } from '@apollo/client';

import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = (variables/* orderBy, orderDirection, searchKeyword */) => {

    const { data, loading, fetchMore, ...result } = useQuery(GET_REPOSITORIES, {
        fetchPolicy: 'cache-and-network',
        variables: {
            after: "",
            ...variables,
        },
        //variables: {orderBy, orderDirection, searchKeyword}
    });



    if(loading || !data){
        console.log("Loading...",result.error);
        const repositories = undefined;
        return { repositories, loading };
    }

    const handleFetchMore = () => {
        const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;
    
        if (!canFetchMore) {
          return;
        }
    
        fetchMore({
          variables: {
            after: data.repositories.pageInfo.endCursor,
            ...variables,
          },
        });
      };

    const { repositories } = data;
    return { 
        repositories, 
        fetchMore:handleFetchMore, 
        loading, 
        ...result 
    };
};

export default useRepositories;