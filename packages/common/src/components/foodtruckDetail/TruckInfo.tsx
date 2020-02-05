import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
} from "react-native";

interface IState {
  id: Number,
  imgURL?: string,
  title: string,
  contents: string,
  menus: []
}

interface IProps {
  data: IState 
}

export default (props: IProps) => {

  return (
    <View style={styles.menuListContainer}>
      <Text>트럭 정보</Text>
      <Text>{props.data.title}</Text>
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