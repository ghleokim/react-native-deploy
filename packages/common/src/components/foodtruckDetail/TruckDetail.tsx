import React from 'react';
import {
    Button,
    View,
    Text,
    StyleSheet,
 } from "react-native";
 import MenuList from './MenuList';
import Line from '../Line'

const res= {
  truck: {
    title: "스누피의 네네트럭",
    intro: "저희 가게 많이 사랑해주세요."
  },
  menu: [
    {name: '더 진한 초코우유', price: 1500},
    {name: '더 진한 딸기우유',  price: 1500},
    {name: '더 진한 메론우유',  price: 1500},
    {name: '더 진한 바나나우유',  price: 1500},
  ]
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  title: {
    alignSelf: 'center',
    marginVertical: 20,
  },
  line: {
    borderBottomWidth: 1,
    borderColor: '#eeeeee',
    width: '95%',
    margin: 'auto',
  },
  intro: {
    fontSize: 10
  }
})

export default () => {
    return (
      <View style={styles.container}>
        
      <View style={styles.title}>
      <Text>{res.truck.title}</Text>
    </View>

    <Line></Line>

    <View>
      <Text>소개글</Text>
      <Text>{res.truck.intro}</Text>
    </View>

        <Line></Line>
      <MenuList menulist={res.menu}></MenuList>

      <Line></Line>
      </View>
    )
}
