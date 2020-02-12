import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Button,
  TouchableOpacity,
  Text,
  Animated,
} from "react-native";

import { SellerMaps } from '../map/SellerMaps';
import { mainStoreContext } from '../../store/MainStore';
import { observer } from 'mobx-react-lite';
import axios from 'axios';

export default observer(() => {
  const MainStore = useContext(mainStoreContext)
  const [toggle, setToggle] = useState({ map: false, button: false })
  const [data, setData] = useState({ open: false, preparing: false, closed: true });

  const emitFunc = (center) => {
    console.log('emitfunction: ', toggle, center)

    const sellerTruckId = localStorage.getItem('truckId')
    console.log('finished', sellerTruckId, !!sellerTruckId)
    
    // doesn't work if truckid is null
    if (!!sellerTruckId === false) { return 0 }
    
    const state = data.open === true ? 'open' : data.preparing === true ? 'prepare' : 'closed'
    const truckStateData = state === 'closed' ? 
    {
      state: state,
    }
    : {
        state: state,
        latitude: center._lat,
        longitude: center._lng
      }
    // 요청 보내서 현재 상태 변경

    axios.put(`/trucks/${sellerTruckId}/state`,truckStateData)
    .then((response) => {console.log(response); setToggle({ map: false, button: false })})
    .catch((err) => {console.log(err)})

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
      { toggle.map === true ?
          <View style={{position: "absolute", bottom: 0}}><SellerMaps emitFunc={emitFunc} /></View>
          : <View style={{position: 'absolute', bottom: 10, width: '100%'}}>{
          toggle.button === true ?
              <View style={{ width: '100%' }}>
                <View style={{ position: 'absolute', height: 150, width: '100%', bottom: 55, right: 0 }}>
                  <View style={{ position: 'absolute', flexDirection: 'column', justifyContent: 'space-between', backgroundColor: 'rgba(255, 255, 255, 0.8)', height: 160, alignItems: 'flex-end', borderRadius: 25, paddingVertical: 10, marginLeft: '20%', bottom: 10, right: 20 }}>
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
                <TouchableOpacity onPress={() => { setToggle({ ...toggle, button: false }) }} style={{ backgroundColor: '#ec585c', height: 50, width: 50, zIndex: 2, position: 'absolute', bottom: 0, right: 10, borderRadius: 25, borderBottomColor: '#ca171c', borderBottomWidth: 3 }}></TouchableOpacity>
              </View>
              : data.closed === true ?
                <TouchableOpacity onPress={() => { setToggle({ ...toggle, button: !toggle.button }) }} style={{ backgroundColor: '#ec585c', height: 50, width: 50, zIndex: 3, position: 'absolute', bottom: 0, right: 10, borderRadius: 25, borderBottomColor: '#ca171c', borderBottomWidth: 3 }}></TouchableOpacity>
                : <TouchableOpacity onPress={() => { setToggle({ ...toggle, button: !toggle.button }) }} style={{ backgroundColor: 'rgba(236,88,92,0.8)', height: 50, zIndex: 2, position: 'absolute', bottom: 0, right: 10, borderRadius: 25, alignItems: 'center', flexDirection: 'row' }}>
                  <View style={{ backgroundColor: '#ec585c', height: 50, width: 50, zIndex: 3, borderRadius: 25, borderBottomColor: '#ca171c', borderBottomWidth: 3 }}></View>
                  <Text style={{ paddingBottom: 1, paddingLeft: 7, paddingRight: 10, color: '#ffffff', fontSize: 16, fontWeight: '700'}}>{data.open === true ? '영업 중' : '영업 준비 중'}</Text>
                </TouchableOpacity>
            }
            </View>
      }
    </View>
  )
})