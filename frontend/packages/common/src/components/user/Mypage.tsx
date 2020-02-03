import * as React from 'react';
import {} from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '../../static/CustomColor';
import { CustomStyle } from '../../static/CustomStyle';

const dummy = {
  userEmail: 'test@a.kr',
  name: '김건호',
  following: [1,2,3,4],
  
}

export const Mypage : React.FC = () => {

  return (
    <View>
      <Text>{dummy.name}</Text>
    </View>
  )
}

const LocalStyles = StyleSheet.create({})

const styles = { ...CustomStyle, ...LocalStyles }