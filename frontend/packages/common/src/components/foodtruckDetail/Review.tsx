import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
} from "react-native";
import { CustomText } from '../../static/CustomStyle';
import Line from '../Line';

interface IProps {
  id: number,
  content: string,
  startRating: number,
  createdAt: string,
  updatedAt: string,
  truckId: number,
  userEmail: string
}

export default (props: IProps) => {

  const formatDate = (date) => {
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
  
    return `${year}년 ${month}월 ${day}일`;
  }

  return (
    <View style={styles.menuContainer}>
      <View style={styles.reviewContainer}>
        <Text style={{alignSelf: 'flex-end'}}>{formatDate(new Date(Date.parse(props.createdAt)))}  <Text style={CustomText.italic}>{props.userEmail === null ? '': (props.userEmail).split('@')[0]}</Text></Text>
        <Text style={[CustomText.title, {fontSize: 16}]}>{props.content}</Text>
      </View>
    </View>
  );

};

const styles = StyleSheet.create({
  menuContainer: {
    borderBottomColor: '#969698',
    borderBottomWidth: 2,
    borderStyle: "dashed",
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    flex: 1
  },
  reviewContainer: {
    width: '100%',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderColor: '#f9b895',
    borderWidth: 3
  },
  reviewContent: {
    
  }
})