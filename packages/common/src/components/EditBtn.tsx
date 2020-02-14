import React from 'react';
import {
  View,
  TouchableOpacity,
  Button,
  Image
} from "react-native";

export default () => {
  return (
    <TouchableOpacity activeOpacity={.5} onPress={()=>{console.log('clicked')}}>
      <Image
        style={{ width: 15, height: 15 }}
        source={require('@foodtruckmap/common/src/static/icon_processed/edit_marker.png')}
        />
    </TouchableOpacity>
  )
};
