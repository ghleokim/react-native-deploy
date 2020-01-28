import React, {useEffect, useState} from 'react';
import {
    Button,
    View,
    Text,
 } from "react-native";

interface IProps {
  name: string,
  price: number
}

export default (props:IProps) => {

  return (
    <View>
    <Text>{props.name}</Text>
    <Text>{props.price}</Text>
    </View>
  );
  
};
