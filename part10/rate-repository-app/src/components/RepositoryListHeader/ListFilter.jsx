import * as React from 'react';
import { View } from 'react-native';
import { Searchbar } from 'react-native-paper';

const ListFilter = ({searchQuery, setSearchQuery}) => {
  const onChangeSearch = query => setSearchQuery(query);

  return (
    <View style={{padding:15, paddingBottom:0 }}>
        <Searchbar
          placeholder="Search"
          onChangeText={onChangeSearch}
          value={searchQuery}
        />
    </View>

  );
};

export default ListFilter;