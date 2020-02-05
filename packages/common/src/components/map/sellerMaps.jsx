import React, { useContext, useEffect } from 'react';
import { View, TouchableOpacity, Text, Image, DrawerLayoutAndroidComponent } from "react-native";
import { NaverMap } from 'react-naver-maps';
import { observer } from 'mobx-react-lite';
import { MapStoreContext } from '../../store/MapStore';

export const SellerMaps = observer(() => {
  const mapStore = useContext(MapStoreContext);

  const handleZoomChanged = (zoom) => {
    mapStore.zoom = zoom;
    console.log("mapStore.zoom : ", mapStore.zoom);
  }
  const handleCenter = (center) => {
    mapStore.center = center;
    console.log("mapStore.center : ", mapStore.center);
    mapStore.stat = -1;
  }

  const drawLargeMap = () => {
    return (
      <NaverMap
        id='naverMap'
        style={{width: mapStore.mapWidth, height: mapStore.mapHeight = mainStore.scrollviewHeight}}
        zoom={mapStore.zoom}
        onZoomChanged = { (zoom) => handleZoomChanged(zoom) }
        center={ mapStore.center }
        onCenterChanged = { (center) => handleCenter(center) }
        naverRef={ref => mapStore.reftest = ref} />
      )
  }

  const getMyLocation = () => {
    if (navigator.geolocation) { // GPS를 지원하면
      navigator.geolocation.getCurrentPosition(function(position) {
        mapStore.userCenter = {
          lat: position.coords.latitude, 
          lng: position.coords.longitude
        };
        mapStore.center = mapStore.userCenter;
        console.log("mapStore.userCenter : ", mapStore.userCenter);
        mapStore.myPosState = !mapStore.reftest.updating
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
    mapStore.zoom = 14; // 내 위치를 누르면 default zoom으로 복귀
  }

  const drawPin = () => {
      return (
        <Image style={{height:30, width: 30}}
        source={require('@foodtruckmap/common/src/static/icon_processed/noun_Pin_1015369.png')} />
      )
  }

  const drawButton = () => {
      return (
          <Button>
              
          </Button>
      )
  }

  useEffect(() => { // 라이프사이클 주기때문에 이렇게 하지 않으면, 렌더할 때 무한히 돈당..
    getMyLocation()
    drawPin()
    drawButton()
  }, []);

  return (
    <View>        
      { drawLargemap() }
    </View>
  )
})