import * as React from 'react';
import ListFilter from './ListFilter';
import SortingMenu from './SortingMenu';


const RepositoryListHeader = ({searchQuery, setSearchQuery, changeOrderHandler}) => {
  return (
    <>
      <ListFilter searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
      <SortingMenu changeOrderHandler={changeOrderHandler}/>
    </>
  )
};

export default RepositoryListHeader;