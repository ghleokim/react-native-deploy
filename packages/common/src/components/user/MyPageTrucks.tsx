import * as React from 'react';
import { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '../../static/CustomColor';
import { CustomStyle, CustomText } from '../../static/CustomStyle';
import axios from 'axios'
import { mainStoreContext } from '../../store/MainStore';

interface TruckData {
  myTruck: Object,
  following: Object
}

interface MyInfo {
  name: String,
  email: String,
  isSeller: any,
}

interface Props {
  myInfo: MyInfo
}

export const MyPageTrucks : React.FC<Props> = ({myInfo}) => {
  const mainStore = useContext(mainStoreContext)
  const [data, setData] = useState({
    myTruck: {}, following: {}
  })

  console.log(myInfo)
  
  useEffect(()=>{
    if (mainStore.isSeller === true) {
      axios.get('/sellers/myTrucks')
      .then((response)=>{
        console.log('myTrucks: ', response, 'myInfo', myInfo)
        setData({myTruck: response.data, following: {}})
      })   
     } else {
       axios.get('/follows/followList')
      .then(
        (response)=>{
          console.log('following', response)
          setData({myTruck: {}, following: response.data})
        }
      )}
  },[])

  const sellerTruck = () => {
    return <View>
      <Text style={[CustomText.titleHN, {fontSize: 22}]}>내 트럭 보기</Text>
      <Text>this is seller's truck info</Text>
      <Text>{JSON.stringify(data.myTruck)}</Text>
    </View>
  }

  const customerTruck = () => {
    return <View>
      <Text style={[CustomText.titleHN, {fontSize: 22}]}>내가 팔로우 중인 트럭</Text>
      <Text> this is customer's following truck info</Text>
      <Text>{JSON.stringify(data.following)}</Text>
    </View>
  }

  return (
  <View style={styles.myinfoContainer}>
    {myInfo.isSeller ? sellerTruck() : customerTruck()}
  </View>
)
}

const LocalStyles = StyleSheet.create({
myinfoContainer: {
  paddingHorizontal: '10%',
  paddingTop: 20
},
textInline: {
  paddingBottom: 10,
  flexDirection: 'row'
}
})

const styles = { ...CustomStyle, ...LocalStyles }