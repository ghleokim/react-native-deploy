import * as React from 'react';
import { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, ImageBackground } from 'react-native';
import { Colors } from '../../static/CustomColor';
import { CustomStyle, CustomText } from '../../static/CustomStyle';
import axios from 'axios'
import { mainStoreContext } from '../../store/MainStore';

interface TruckProps {
  title: String,
  imgURL?: string,
  state: String,
  id: number,
}

interface Props {
  truck: TruckProps
}

export const MyPageTruckItem : React.FC<Props> = ({truck}) => {
  return (
  <View style={styles.truckContainer}>
    <Image
      source={{ uri: truck.imgURL ? truck.imgURL : '' }}
      style={{ position:'absolute', width: '100%', height: 100, borderRadius: 20, borderWidth: 1, borderColor: Colors.gray }}
      defaultSource={{ uri: `https://picsum.photos/id/${truck.id ? truck.id : 0}/200` }}
      />
    <Text style={{ fontWeight: '700', fontSize: 22, backgroundColor: 'rgba(255,255,255,0.5)', alignSelf: 'center', zIndex: 1, paddingHorizontal: 10, paddingVertical: 5}}>{truck.title}</Text>
  </View>
)}

const LocalStyles = StyleSheet.create({
truckContainer: {
  height: 100,
  justifyContent: 'center',
  flexDirection: 'row'
},
textInline: {
  paddingBottom: 10,
  flexDirection: 'row'
}
})

const styles = { ...CustomStyle, ...LocalStyles }