import { FlatList, View, StyleSheet } from 'react-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../../hooks/useRepositories';
import { Link } from "react-router-native";
import React, { useState } from 'react';
import { useDebounce } from 'use-debounce';
import RepositoryListHeader from '../RepositoryListHeader';


const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

export const ItemSeparator = () => <View style={styles.separator} />;

export class RepositoryListContainer extends React.Component {
  constructor(props) {
    super(props)
  }

  renderHeader = () => {
    const props = this.props;
    return (
      <RepositoryListHeader {...props}/>
    );
  };

  render(){
    const repositoryNodes = this.props.repositories
    ? this.props.repositories.edges.map(edge => edge.node)
    : [];
    return (
      <View style={{flex:1, height:"90%"}}>
        <FlatList
            data={repositoryNodes}
            ItemSeparatorComponent={ItemSeparator}
            ListHeaderComponent={this.renderHeader}
            renderItem={({item, index, separators}) => (
                <Link to={`/repository/${item.id}`}>
                    <RepositoryItem key={index} item={item} separators={separators}/>
                </Link>
            )}
            onEndReached={this.props.onEndReach}
            onEndReachedThreshold={0.5}
          />
      </View>
  );}
}

const RepositoryList = () => {
  const [orderBy, setOrderBy] = useState('CREATED_AT');
  const [orderDirection, setOrderDirection] = useState('DESC');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchKeyword] = useDebounce(searchQuery, 1000);
  
  const changeListOrderHandler = (orderBy, orderDirection) => {
    setOrderBy(orderBy);
    setOrderDirection(orderDirection);
  }
  console.log(searchKeyword)
  const { repositories, fetchMore } = useRepositories({orderBy, orderDirection, searchKeyword, first:4});
  console.log(repositories);

  const onEndReach = () => {
    fetchMore();
  };

  return (
    <View style={{flex:1}}>
      <RepositoryListContainer 
        repositories={repositories} 
        changeOrderHandler={changeListOrderHandler} 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery}
        onEndReach={onEndReach}
        />
    </View>);
}

export default RepositoryList;