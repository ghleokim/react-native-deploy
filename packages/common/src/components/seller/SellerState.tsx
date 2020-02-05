import React from 'react';
import {
  View,
  Button,
} from "react-native";

export default () => {

  const a = () => {}
  const b = () => {}
  const c = () => {}

    return (
      <View>
        <Button title="영업중" onPress={() => a()}></Button>
        <Button title="준비중" onPress={() => b()}></Button>
        <Button title="Closed" onPress={() => c()}></Button>
      </View>
    ) 
}