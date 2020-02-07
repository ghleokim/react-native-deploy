import * as React from 'react';
import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '../../static/CustomColor';
import { CustomStyle, CustomText } from '../../static/CustomStyle';
import axios from 'axios';
import { MyPageInfo } from './MyPageInfo';
import { MyPageTrucks } from './MyPageTrucks';

interface MyInfo {
  name: String,
  email: String,
  isSeller: Boolean,
}

export const Mypage : React.FC = () => {
  const [userInfo, setUserInfo] = useState<MyInfo>({
    name: '', email: '', isSeller: false
  })
  
  useEffect(()=>{
    axios.get('/users/getUser')
    .then((response)=>{   
      console.log(response)
      setUserInfo(response.data.result)
    })
  }, [])

  return (
    <View style={styles.pageContainer}>
      <MyPageInfo myInfo={userInfo} />
      <MyPageTrucks myInfo={userInfo} />
    </View>
  )
}

const LocalStyles = StyleSheet.create({
  pageContainer: {
    flex: 1
  }
})

const styles = { ...CustomStyle, ...LocalStyles }