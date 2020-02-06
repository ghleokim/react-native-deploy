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
  handleMenuSubmit: any
}

export default (props: IProps) => {

  const handleMenuSubmit = (menuId, requestDto) => {
    props.handleMenuSubmit(menuId, requestDto);
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
              handleMenuSubmit={handleMenuSubmit}
              name={item.name}
              price={item.price}
              id={item.id}
              imgURL={item.imgURL}
              content={item.content}
              isSoldOut={item.isSoldOut}
            />}
          keyExtractor={item => item.name}
        />
      </View>
    </View>
  );

};

const styles = StyleSheet.create({
  menuListContainer: {
    paddingHorizontal: 12,
    paddingBottom: 20
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