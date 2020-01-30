import React from 'react';
import {
    View,
    TouchableOpacity,
    Button,
    Image
 } from "react-native";

export default () => {
    return (
      <View>
      <TouchableOpacity activeOpacity = { .5 } >
 
      <Image
      style={{width: 50, height: 50}}
      source={{uri: 'https://facebook.github.io/react-native/img/tiny_logo.png'}}
    />          
        </TouchableOpacity>

        </View>
      )
};
