
import React, { useContext, useEffect } from 'react';
import { View, Image, Button, TouchableOpacity, Text } from "react-native";
import { NaverMap } from 'react-naver-maps';
import { observer } from 'mobx-react-lite';
import { SellerMapStoreContext } from '../../store/SellerMapStore';
import { mainStoreContext } from '../../store/MainStore';

export const SellerMaps = observer(({emitFunc}) => {
  const sellerMapStore = useContext(SellerMapStoreContext);
  const mainStore = useContext(mainStoreContext);

  const handleZoomChanged = (zoom) => {
    sellerMapStore.zoom = zoom;
    console.log("sellerMapStore.zoom : ", sellerMapStore.zoom);
  }
  const handleCenter = (center) => {
    sellerMapStore.center = center;
    console.log("sellerMapStore.center : ", sellerMapStore.center);
  }

  const drawLargeMap = () => {
    return (
      <NaverMap
        id='sellerMaps'
        style={{width: mainStore.screenWidth, height: mainStore.scrollviewHeight}}
        zoom={sellerMapStore.zoom}
        onZoomChanged = { (zoom) => handleZoomChanged(zoom) }
        center={ sellerMapStore.center }
        onCenterChanged = { (center) => handleCenter(center) }
        naverRef={ref => sellerMapStore.reftest = ref} />
      )
  }

  const getMyLocation = () => {
    if (navigator.geolocation) { // GPS를 지원하면
      navigator.geolocation.getCurrentPosition(function(position) {
        sellerMapStore.userCenter = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        sellerMapStore.center = sellerMapStore.userCenter;
        console.log("sellerMapStore.userCenter : ", sellerMapStore.userCenter);
      }, function(error) {
        console.error(error);
      }, {
        enableHighAccuracy: false,
        maximumAge: 0,
        timeout: Infinity
      });
    } else {
      alert('GPS를 지원하지 않습니다');
    }
    sellerMapStore.zoom = 14;
  }

  const drawPin = () => {
    return (
      <View style={{position: 'absolute', top: mainStore.scrollviewHeight / 2 - 35, left: mainStore.screenWidth / 2 - 25}}>
        <Image style={{height:50, width: 50}}
        source={require('@foodtruckmap/common/src/static/icon_processed/noun_Pin_1015369.png')} />
      </View>
    )
  }

  const drawButton = () => {
      return (
        <View style={{position: 'absolute', bottom: 25, right: 10}}>
          <TouchableOpacity onPress={() => {console.log("center : ", sellerMapStore.center); emitFunc()}} style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#4177c9', height: 50, zIndex: 3, borderRadius: 25, borderBottomColor: '#4177c9', borderBottomWidth: 3 }}>
            <Text style={{ paddingBottom: 1, paddingLeft: 7, paddingRight: 10, color: '#ffffff', fontSize: 16, fontWeight: '700'}}>위치 확정하기</Text>
          </TouchableOpacity> 
          {/* // 위치선정을 끝냈을 때. sellerMapStore.center를 리턴하면 됨. */}
        </View>
      )
  }

  // const printConsole = () => {
  //   console.log("main : ", mainStore);
  // }

  useEffect(() => { // 라이프사이클 주기때문에 이렇게 하지 않으면, 렌더할 때 무한히 돈당..
    getMyLocation()
  }, []);

  return (
    <View>

      { drawLargeMap() }
      { drawButton() }
      { drawPin() }
      {/* { printConsole() } */}
    
    </View>
  )
})