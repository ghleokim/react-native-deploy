import React, { useState } from 'react';
import {
  View,
  Button,
  TouchableOpacity,
  Text,
} from "react-native";

import { SellerMaps } from '../map/SellerMaps';

export default () => {
  const [toggle, setToggle] = useState({ map: false, button: false })
  const [data, setData] = useState({ open: false, preparing: false, closed: true });
  
  const emitFunc = () => {
    setToggle({ map: false, button: false })
    console.log(toggle)
  }

  const open = (v) => {
    if (v === 0) setData({ open: true, preparing: false, closed: false });
    else if (v === 1) setData({ open: false, preparing: true, closed: false });
    else if (v === 2) setData({ open: false, preparing: false, closed: true });
  }

  const toggleButton: React.FC = () => {
    return data.closed === true ?
      <TouchableOpacity onPress={() => { setToggle({ ...toggle, button: !toggle.button }) }} style={{ backgroundColor: '#ec585c', height: 50, width: 50, zIndex: 3, position: 'absolute', bottom: 10, right: 10, borderRadius: 25, borderBottomColor: '#ca171c', borderBottomWidth: 3 }}></TouchableOpacity>
      : <TouchableOpacity onPress={() => { setToggle({ ...toggle, button: !toggle.button }) }} style={{ backgroundColor: 'rgba(236,88,92,0.4)', height: 50, zIndex: 2, position: 'absolute', bottom: 10, right: 10, borderRadius: 25 }}>
        <TouchableOpacity onPress={() => { setToggle({ ...toggle, button: !toggle.button }) }} style={{ backgroundColor: '#ec585c', height: 50, width: 50, zIndex: 3, position: 'absolute', bottom: 10, right: 10, borderRadius: 25, borderBottomColor: '#ca171c', borderBottomWidth: 3 }}></TouchableOpacity>
        <Text>{data.open === true ? '영업 중' : '영업 준비 중'}</Text>
      </TouchableOpacity>
  }

  return (
    <View style={toggle.map === false ? {} : { height: '100%', position: 'absolute', zIndex: 3 }}>
      {
        toggle.map === true ?
          <SellerMaps emitFunc={emitFunc} />
          : toggle.button === true ?
            <View style={{ width: '100%' }}>
              <View style={{ position: 'absolute', height: 150, width: '100%', bottom: 70, right: 0 }}>
                <View style={{ position: 'absolute', flexDirection: 'column', justifyContent: 'space-between', backgroundColor: 'rgba(255, 255, 255, 0.8)', alignItems: 'flex-end', height: 140, borderRadius: 25, marginLeft: '20%', paddingLeft: 10, bottom: 10, right: 15 }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ fontWeight: '700', fontSize: 16, backgroundColor: 'rgba(255, 255, 255, 0.8)', paddingVertical: 1 }}> 푸드트럭 영업 종료 </Text>
                    <TouchableOpacity onPress={() => { open(2); setToggle({ map: false, button: false }) }} style={{ backgroundColor: '#dc191e', height: 40, width: 40, zIndex: 2, marginLeft: 5, borderRadius: 25, alignItems: 'center', justifyContent: 'center', borderBottomColor: '#c5161b', borderRightColor: '#c5161b', borderBottomWidth: 3, borderRightWidth: 3 }}></TouchableOpacity>
                  </View>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ fontWeight: '700', fontSize: 16, backgroundColor: 'rgba(255, 255, 255, 0.8)', paddingVertical: 1 }}> 영업 준비하기 </Text>
                    <TouchableOpacity onPress={() => { open(1); setToggle({ map: true, button: false }) }} style={{ backgroundColor: '#e8c536', height: 40, width: 40, zIndex: 2, marginLeft: 5, borderRadius: 25, alignItems: 'center', justifyContent: 'center', borderBottomColor: '#e6c024', borderRightColor: '#e6c024', borderBottomWidth: 3, borderRightWidth: 3 }}></TouchableOpacity>
                  </View>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ fontWeight: '700', fontSize: 16, backgroundColor: 'rgba(255, 255, 255, 0.8)', paddingVertical: 1 }}> 영업 시작하기 </Text>
                    <TouchableOpacity onPress={() => { open(0); setToggle({ map: true, button: false }) }} style={{ backgroundColor: '#4177c9', height: 40, width: 40, zIndex: 2, marginLeft: 5, borderRadius: 25, alignItems: 'center', justifyContent: 'center', borderBottomColor: '#376dc0', borderRightColor: '#376dc0', borderBottomWidth: 3, borderRightWidth: 3 }}></TouchableOpacity>
                  </View>
                </View>
              </View>
              <TouchableOpacity onPress={() => { setToggle({ ...toggle, button: false }) }} style={{ backgroundColor: '#ec585c', height: 50, width: 50, zIndex: 2, position: 'absolute', bottom: 10, right: 10, borderRadius: 25, borderBottomColor: '#ca171c', borderBottomWidth: 3 }}></TouchableOpacity>
            </View>
            : data.closed === true ?
              <TouchableOpacity onPress={() => { setToggle({ ...toggle, button: !toggle.button }) }} style={{ backgroundColor: '#ec585c', height: 50, width: 50, zIndex: 3, position: 'absolute', bottom: 10, right: 10, borderRadius: 25, borderBottomColor: '#ca171c', borderBottomWidth: 3 }}></TouchableOpacity>
              : <TouchableOpacity onPress={() => { setToggle({ ...toggle, button: !toggle.button }) }} style={{ backgroundColor: 'rgba(236,88,92,0.8)', height: 50, zIndex: 2, position: 'absolute', bottom: 10, right: 10, borderRadius: 25, alignItems: 'center', flexDirection: 'row' }}>
                <View style={{ backgroundColor: '#ec585c', height: 50, width: 50, zIndex: 3, borderRadius: 25, borderBottomColor: '#ca171c', borderBottomWidth: 3 }}></View>
                <Text style={{ paddingBottom: 1, paddingLeft: 7, paddingRight: 10, color: '#ffffff', fontSize: 16, fontWeight: '700'}}>{data.open === true ? '영업 중' : '영업 준비 중'}</Text>
              </TouchableOpacity>}
    </View>
  )
}