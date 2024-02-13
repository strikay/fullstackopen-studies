import { View } from 'react-native';
import RepositoryStatistics from './RepositoryStatistics';
import RepositoryDetails from './RepositoryDetails';

export const toKNotation = (value) => {
    const formattedValue = value < 999
        ? value
        : Math.floor(value/100)/10+"k";

    return formattedValue;
}
const RepositoryItem = ({item}) => {
    const stars = {statistic: toKNotation(item.stargazersCount), label: 'Stars'}
    const forks = {statistic: toKNotation(item.forksCount), label: 'Forks'};
    const reviews = {statistic: toKNotation(item.reviewCount), label: 'Reviews'};
    const rating = {statistic:item.ratingAverage, label: 'Rating'};
    const repositoryStatisticsProps = {stars, forks, reviews, rating};

    const {ownerAvatarUrl, fullName, description, language} = item;
    const repositoryDetails = {ownerAvatarUrl, fullName, description, language};

    
    return(
        <View testID="repositoryItem">
            <RepositoryDetails {...repositoryDetails}/>
            <RepositoryStatistics {...repositoryStatisticsProps}/>
        </View>
    )
};

export default RepositoryItem;