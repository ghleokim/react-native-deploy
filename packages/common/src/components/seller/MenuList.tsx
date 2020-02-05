import React, {useEffect, useState} from 'react';
import {
    View,
    Text,
    FlatList ,
 } from "react-native";
 import Menu from './Menu'

interface IMenu {
  id: number,
  name: string,
  price: number,
  content: string,
  imgURL: string,
}

 interface IProps {
  menulist: IMenu[]
}

export default (props:IProps) => {

  return (
    <View>
      <Text>---------메뉴---------</Text>
      <FlatList<IMenu>
        data={props.menulist}
        renderItem={({ item } ) => 
        <Menu 
          name={item.name} 
          price={item.price} 
          id={item.id}
          imgURL={item.imgURL}
          content={item.content}
          />}
        
          keyExtractor={item => item.name}
      />
    </View>
  );
  
};
