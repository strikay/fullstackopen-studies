import { View, StyleSheet} from 'react-native';
import Text from '../../Text';

const styles = StyleSheet.create({
    flexContainer: {
        display: 'flex',
        padding: 10,
        flexDirection: 'row',
        alignItems: 'stretch',
        backgroundColor: 'white',
        flexWrap:'wrap'
      },
    flexBottomItem: {
      flexGrow:1,
    },
    flexCenteredText: {
      alignSelf: 'center'
    }
  });


const IndividualStatistic = ({statistic, label}) => {

    return(
        <View style={styles.flexBottomItem}>
            <Text fontWeight = 'bold' fontSize='subheading' style={styles.flexCenteredText}>{statistic}</Text>
            <Text style={styles.flexCenteredText}>{label}</Text>
        </View>
    )
}

const RepositoryStatistics = ({stars, forks, reviews, rating}) => {
    return (
        <View style={styles.flexContainer}>
            <IndividualStatistic {...stars}/>
            <IndividualStatistic {...forks}/>
            <IndividualStatistic {...reviews}/>
            <IndividualStatistic {...rating}/>
        </View>
    );
}

export default RepositoryStatistics;