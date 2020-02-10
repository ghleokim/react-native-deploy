import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Button,
  StyleSheet
} from "react-native";
import Menu from './Menu'
import { CustomText } from '../../static/CustomStyle';
import MenuForm from './MenuForm'

interface IMenu {
  id: number,
  name: string,
  price: number,
  content: string,
  imgURL: string,
  isSoldOut: boolean,
}


interface IProps {
  menulist: IMenu[],
  handleUpdateMenu: any,
  handleAddMenuSubmit: Function,
  handleDeleteMenu: Function,
}

export default (props: IProps) => {

  const [isMenuAdding, setIsMenuAdding] = useState(false);

  const handleUpdateMenu = (requestDto, menuId) => {
    props.handleUpdateMenu(requestDto, menuId);
  }

  const handleDeleteMenu = (deletedMenuId) => {
    props.handleDeleteMenu(deletedMenuId);
  }

  const handleAddMenuSubmit = (requestDto) => {
    props.handleAddMenuSubmit(requestDto);
    setIsMenuAdding(false);
  }

  const handleAddMenuCancel = () => {
    setIsMenuAdding(false);
  }

  return (
    <View style={styles.menuListContainer}>
      <View style={styles.menuListContentContainer}>
        <View style={styles.menuListTitle}>
          <Text style={[CustomText.textCenter, CustomText.titleHN, { fontSize: 22 }]}>메뉴</Text>
        </View>
        <FlatList<IMenu>
          data={props.menulist}
          renderItem={({ item }) =>
            <Menu
              handleUpdateMenu={handleUpdateMenu}
              handleDeleteMenu={handleDeleteMenu}
              name={item.name}
              price={item.price}
              id={item.id}
              imgURL={item.imgURL}
              content={item.content}
              isSoldOut={item.isSoldOut}
            />}
          keyExtractor={item => item.name}
        />
        {isMenuAdding 
          ? 
          <View style={styles.menuContainer}>
            <MenuForm handleMenuSubmit={handleAddMenuSubmit} handleMenuCancel={handleAddMenuCancel}></MenuForm>
          </View>
        : <Button title="메뉴 추가" onPress={() => setIsMenuAdding(true)}></Button>
        }
        
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  menuListContainer: {
    paddingHorizontal: 12,
    paddingBottom: 20
  },
  menuContainer: {
    borderBottomColor: '#969698',
    borderBottomWidth: 2,
    borderStyle: "dashed",
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    flex: 1
  },
  menuListContentContainer: {
    borderRightWidth: 2,
    borderLeftWidth: 1,
    borderBottomWidth: 4,
    borderTopWidth: 1,
    borderLeftColor: '#e6e6e8',
    borderRightColor: '#d6d6d8',
    borderBottomColor: '#86878b',
    borderTopColor: '#f6f6f8',
    paddingTop: 10,
    paddingBottom: 20,
    borderRadius: 5,
  },
  menuListTitle: {
    alignSelf: 'center',
  }
})