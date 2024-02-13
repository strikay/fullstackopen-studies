
import {useState } from 'react';
import { View } from 'react-native';
import { Menu } from 'react-native-paper';
import Text from '../Text';
import { IconButton } from 'react-native-paper';

const SortingMenu = ({changeOrderHandler}) => {
  const [visible, setVisible] = useState(false);
  const [orderLabel, setOrderLabel] = useState("Latest Repositories");

  const changeListOrder = (orderBy, orderDirection, orderLabel) => {
    changeOrderHandler(orderBy, orderDirection);
    setOrderLabel(orderLabel)
  }
  const closeMenu = () => setVisible(false);

  return (
            <View style={{ padding:15, flexDirection: 'row', justifyContent: "space-between"}}>
              <Text style={{ padding:10, fontSize:15 }}>
                {orderLabel}
              </Text>
              <Menu
                  visible={visible}
                  onDismiss={closeMenu}
                  anchor={<IconButton
                    icon="menu-down"
                    size={20}
                    onPress={() => setVisible(!visible)}
                  />}
                  >
                <Menu.Item onPress={() => {changeListOrder('CREATED_AT', 'DESC', "Latest Repositories"), closeMenu()}} title="Latest Repositories" />
                <Menu.Item onPress={() => {changeListOrder('RATING_AVERAGE', 'DESC', "Highest Rated Repositories"), closeMenu()}} title="Highest Rated Repositories" />
                <Menu.Item onPress={() => {changeListOrder('RATING_AVERAGE', 'ASC', "Lowest Rated Repositories"), closeMenu()}} title="Lowest Rated Repositories" />
              </Menu>
            </View>
  );
};

export default SortingMenu;