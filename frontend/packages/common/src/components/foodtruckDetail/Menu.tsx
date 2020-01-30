import React, {useEffect, useState} from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
 } from "react-native";

interface IProps {
  id: number,
  name: string,
  price: number,
  content: string,
  imgURL?: string,
}

export default (props:IProps) => {

  return (
    <View style={styles.menuContainer}>
      <Image
      defaultSource={{uri: `https://picsum.photos/id/${props.id}/200`}}
      source={{uri: props.imgURL}}
      style={{width: 50, height: 50}}
     />  
      <Text>이름: {props.name}</Text>
      <Text>내용: {props.content}</Text>
      <Text>가격: {props.price}</Text> 
    </View>
  );
  
};

const styles = StyleSheet.create({
  menuContainer: {
    borderBottomColor: '#969698',
    borderBottomWidth: 2,
    borderStyle: "dashed",
    paddingVertical: 12,
    paddingHorizontal: 24,
  }
})