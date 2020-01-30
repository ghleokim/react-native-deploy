import React from 'react';
import {
    Button,
    View,
    Text,
    StyleSheet,
    Image,
 } from "react-native";
import Line from '../Line'
import EditBtn from '../EditBtn'
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

export default () => {
    return (
      <View>
      <Image
      style={{width: 500, height: 200}}
      source={{uri: 'https://pds.joins.com//news/component/htmlphoto_mmdata/201805/01/321d1bd8-542b-44d6-99ee-ebcb331c177f.jpg'}}
      />

    <View style={{flex: 1, flexDirection: 'row'}}>
        <Text style={{flex:0.4, backgroundColor:'yellow', fontSize:15}}>푸드트럭 이름</Text>
        <Text>네모네모 푸드트럭</Text>
        <EditBtn/>
      </View>

    <View style={{flex: 1, flexDirection: 'row'}}>
      <Text style={{flex:0.2, backgroundColor:'yellow'}}>푸드트럭 이름</Text>
      <Text>네모네모 푸드트럭</Text>
    </View>

    <View style={{flex: 1, flexDirection: 'row'}}>
      <Text style={{flex:0.2, backgroundColor:'yellow'}}>푸드트럭 이름</Text>
      <Text>네모네모 푸드트럭</Text>
    </View>

  <View style={{flex: 1, flexDirection: 'row'}}>
    <Text style={{flex:0.2, backgroundColor:'yellow'}}>푸드트럭 이름</Text>
    <Text>네모네모 푸드트럭</Text>
  </View>

      </View>
    )

}
