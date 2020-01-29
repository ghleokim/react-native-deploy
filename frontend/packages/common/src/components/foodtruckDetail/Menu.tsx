import React, {useEffect, useState} from 'react';
import {
    View,
    Text,
    Image,
 } from "react-native";

interface IProps {
  id: number,
  name: string,
  price: number,
  content: string,
  imgURL: string,
}

export default (props:IProps) => {

  return (
    <View>
      <Image
      style={{width: 50, height: 50}}
      source={{uri: props.imgURL}}
     />  
      <Text>이름: {props.name}</Text>
      <Text>내용: {props.content}</Text>
      <Text>가격: {props.price}</Text> 
    </View>
  );
  
};
