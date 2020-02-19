import React, {useState, useContext, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
} from "react-native";

import { SellerMaps } from '../map/SellerMaps';
import axios from 'axios';

export default () => {
  const [toggle, setToggle] = useState({ map: false, button: false })
  const [truckState, setTruckState] = useState({ open: false, prepare: false, closed: false });
  const [selectedState, setSelectedState] = useState('')
  
  useEffect(() => {
    const sellerTruckId = localStorage.getItem('truckId')
    axios.get(`/trucks/${sellerTruckId}`)
        .then(({data}) => {
          setTruckState({...truckState, [data.result.state.trim().toLowerCase()]: true})
        })
        .catch((err) => {console.log(err)})
  }, [])

  useEffect(() => {
    if(selectedState != 'closed') {
      return;
    }

    const sellerTruckId = localStorage.getItem('truckId')
      
    axios.put(`trucks/${sellerTruckId}/state`,{state: selectedState})
        .then(({data}) => {
            setToggle({ map: false, button: false })
            setTruckState({ open: false, prepare: false, closed: false , [data.state.trim().toLowerCase()]: true})
          })
        .catch((err) => {console.log(err)})
  }, [selectedState])

  const emitFunc = (center) => {
    
    const sellerTruckId = localStorage.getItem('truckId')

    // doesn't work if truckid is null
    if (!!sellerTruckId === false || !!center === false) { console.log('truckid not set or center not set', 'truckid', !!sellerTruckId, 'center', !!center); return 0 }

    const truckStateData = {
          state: selectedState,
          latitude: center._lat,
          longitude: center._lng
        }
    // 요청 보내서 현재 상태 변경

    axios.put(`trucks/${sellerTruckId}/state`,truckStateData)
        .then(({data}) => {
            setToggle({ map: false, button: false })
            setTruckState({ open: false, prepare: false, closed: false , [data.state.trim().toLowerCase()]: true })
        })
        .catch((err) => {console.log(err)})
  }

  const open = (v) => {
    if (v === 'open') {
        setToggle({ map: true, button: false })
        setSelectedState('open')
    } else if (v === 'prepare') {
        setToggle({ map: true, button: false })
        setSelectedState('prepare')
    } else if (v === 'closed' || v === 'cancel') {
        setToggle({ map: false, button: false })
        setSelectedState('closed')
    }
  }

  const closedBtn = () => {
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ fontWeight: '700', fontSize: 16, backgroundColor: 'rgba(255, 255, 255, 0.8)', paddingVertical: 1 }}> 영업 종료 </Text>
          <TouchableOpacity onPress={() => { open('closed') }} style={{ backgroundColor: '#dc191e', height: 40, width: 40, zIndex: 2, marginLeft: 5, borderRadius: 25, alignItems: 'center', justifyContent: 'center', borderBottomColor: '#c5161b', borderRightColor: '#c5161b', borderBottomWidth: 3, borderRightWidth: 3 }}></TouchableOpacity>
        </View>
    )
  }

  const cancelBtn = () => {
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ fontWeight: '700', fontSize: 16, backgroundColor: 'rgba(255, 255, 255, 0.8)', paddingVertical: 1 }}> 준비 취소 </Text>
          <TouchableOpacity onPress={() => { open('cancel') }} style={{ backgroundColor: '#dc191e', height: 40, width: 40, zIndex: 2, marginLeft: 5, borderRadius: 25, alignItems: 'center', justifyContent: 'center', borderBottomColor: '#c5161b', borderRightColor: '#c5161b', borderBottomWidth: 3, borderRightWidth: 3 }}></TouchableOpacity>
        </View>
    )
  }

  const openBtn = () => {
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ fontWeight: '700', fontSize: 16, backgroundColor: 'rgba(255, 255, 255, 0.8)', paddingVertical: 1 }}> 영업 시작 </Text>
          <TouchableOpacity onPress={() => { open('open') }}  style={{ backgroundColor: '#4177c9', height: 40, width: 40, zIndex: 2, marginLeft: 5, borderRadius: 25, alignItems: 'center', justifyContent: 'center', borderBottomColor: '#376dc0', borderRightColor: '#376dc0', borderBottomWidth: 3, borderRightWidth: 3 }}></TouchableOpacity>
        </View>
    )
  }

  const prepareBtn = () => {
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ fontWeight: '700', fontSize: 16, backgroundColor: 'rgba(255, 255, 255, 0.8)', paddingVertical: 1 }}> 영업 준비 </Text>
          <TouchableOpacity onPress={() => { open('prepare') }} style={{ backgroundColor: '#e8c536', height: 40, width: 40, zIndex: 2, marginLeft: 5, borderRadius: 25, alignItems: 'center', justifyContent: 'center', borderBottomColor: '#e6c024', borderRightColor: '#e6c024', borderBottomWidth: 3, borderRightWidth: 3 }}></TouchableOpacity>
        </View>
    )
  }

  const showClosed = () => {
    return (
        <View>
          {prepareBtn()}
          {openBtn()}
        </View>
    )
  }

  const showOpen = () => {
    return (
        <View>
          {closedBtn()}
        </View>
    )
  }

  const showPrepare = () => {
    return (
        <View>
          {cancelBtn()}
          {openBtn()}
        </View>
    )
  }

  return (
      <View style={toggle.map === false ? {} : { height: '100%', position: 'absolute', zIndex: 3 }}>
        { toggle.map === true ?
            <View style={{position: "absolute", bottom: 0}}><SellerMaps emitFunc={emitFunc} /></View>
            : <View style={{position: 'absolute', bottom: 10, width: '100%'}}>{
              toggle.button === true ?
                  <View style={{ width: '100%' }}>
                    <View style={{ position: 'absolute', height: 150, width: '100%', bottom: 10, right: 0 }}>
                      <View style={{ position: 'absolute', flexDirection: 'column', justifyContent: 'space-between', backgroundColor: 'rgba(255, 255, 255, 0.8)', height: 130, alignItems: 'flex-end', borderRadius: 25, paddingVertical: 10, marginLeft: '20%', bottom: 10, right: 20 }}>
                        {truckState.closed ? showClosed() : <></>}
                        {truckState.open ? showOpen() : <></>}
                        {truckState.prepare ? showPrepare() : <></>}
                      </View>
                    </View>
                    <TouchableOpacity onPress={() => { setToggle({ ...toggle, button: false }) }} style={{ backgroundColor: '#ec585c', height: 50, width: 50, zIndex: 2, position: 'absolute', bottom: 0, right: 10, borderRadius: 25, borderBottomColor: '#ca171c', borderBottomWidth: 3 }}></TouchableOpacity>
                  </View>
                  : truckState.closed ?
                    <TouchableOpacity onPress={() => { setToggle({ ...toggle, button: !toggle.button }) }} style={{ backgroundColor: '#bdbdbd', height: 50, zIndex: 2, position: 'absolute', bottom: 0, right: 10, borderRadius: 25, alignItems: 'center', flexDirection: 'row' }}>
                      <Text style={{ paddingBottom: 1, paddingLeft: 7, paddingRight: 10, color: '#ffffff', fontSize: 16, fontWeight: '700'}}>영업 종료</Text>
                      <View style={{ backgroundColor: '#8f8f8f', height: 50, width: 50, zIndex: 3, borderRadius: 25, borderBottomColor: '#7d7d7d', borderBottomWidth: 3 }}></View>
                    </TouchableOpacity>
                  : truckState.open ? 
                    <TouchableOpacity onPress={() => { setToggle({ ...toggle, button: !toggle.button }) }} style={{ backgroundColor: '#4661e0', height: 50, zIndex: 2, position: 'absolute', bottom: 0, right: 10, borderRadius: 25, alignItems: 'center', flexDirection: 'row' }}>
                      <View style={{ backgroundColor: '#1a3bd9', height: 50, width: 50, zIndex: 3, borderRadius: 25, borderBottomColor: '#0d2bba', borderBottomWidth: 3 }}></View>
                      <Text style={{ paddingBottom: 1, paddingLeft: 7, paddingRight: 10, color: '#ffffff', fontSize: 16, fontWeight: '700'}}>영업 중</Text>
                    </TouchableOpacity>
                  : truckState.prepare ? 
                    <TouchableOpacity onPress={() => { setToggle({ ...toggle, button: !toggle.button }) }} style={{ backgroundColor: '#ffdf66', height: 50, zIndex: 2, position: 'absolute', bottom: 0, right: 10, borderRadius: 25, alignItems: 'center', flexDirection: 'row' }}>
                      <View style={{ backgroundColor: '#ffd73b', height: 50, width: 50, zIndex: 3, borderRadius: 25, borderBottomColor: '#d4b53f', borderBottomWidth: 3 }}></View>
                      <Text style={{ paddingBottom: 1, paddingLeft: 7, paddingRight: 10, color: '#ffffff', fontSize: 16, fontWeight: '700'}}>영업 준비중</Text>
                    </TouchableOpacity>
                : <></>}
            </View>
        }
      </View>
  )
}