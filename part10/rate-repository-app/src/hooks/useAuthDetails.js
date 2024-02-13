const { useQuery } = require("@apollo/client");
const { GET_AUTHENTICATION_DETAILS } = require("../graphql/queries");

const useAuthDetails = (includeReviews) => {

    let loading
    const result = useQuery(GET_AUTHENTICATION_DETAILS, {
        fetchPolicy: 'cache-and-network',
        variables: {includeReviews}
    });

    loading = result.loading;
    if(loading || !result.data){
        console.log(result.error);
        const authDetails = undefined;
        return { authDetails, loading };
    }
    const authDetails = result.data;
    return { authDetails, loading };

};

export default useAuthDetails;