import React, { Component, useContext, useEffect } from 'react';
import { View, Text, Image } from "react-native";
import { NaverMap, Marker, Overlay } from 'react-naver-maps';
import { observer } from 'mobx-react-lite';
import { mainStoreContext } from '../store/MainStore';
import { MapStoreContext } from '../store/MapStore';
import axios from 'axios';

export const Maps = observer(() => {
  const mainStore = useContext(mainStoreContext);
  const mapStore = useContext(MapStoreContext);

  /*1. 내 위치를 받는 메소드
    2. 백엔드로부터 푸드트럭 데이터를 받아오는 메소드(해결)
    3. 지도 위에 마커를 그리는 메소드(해결, 내 위치를 기반하여 마커를 띄워주는 것으로 확장 필요)
  */

  const getMyLocation = () => {
    if (navigator.geolocation) { // GPS를 지원하면
      navigator.geolocation.getCurrentPosition(function(position) {
        mapStore.userCenter = {
          lat: position.coords.latitude, 
          lng: position.coords.longitude
        };
        mapStore.center = mapStore.userCenter;
        console.log("mapStore.userCenter : ", mapStore.userCenter);

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

  // 위치값을 전달해주어야 함.
  const getMarkersFromLocation = () => {
    axios({
      url: mainStore.proxy + '/trucks/boundary/?'
        + 'startLatitude=' + mapStore.bounds._sw._lat
        + '&startLongitude=' + mapStore.bounds._sw._lng
        + '&endLatitude=' + mapStore.bounds._ne._lat
        + '&endLongitude=' + mapStore.bounds._ne._lng,
      method: 'get'
    }).then((response) => {
      mapStore.markers = response.data ? response.data : [];
      console.log("mapStore.markers : ", mapStore.markers);
      if(mapStore.markers.length === 0) alert("결과가 없습니다.");
    })
      .catch(function (error) {
        console.log(error);
      });
  }

  const make_markers = mapStore.markers.map((element, index) => {
    return <Marker key={index}
        position={{lat:element.latitude, lng:element.longitude}}
        onClick={(e) => {
          mapStore.stat = index;
          console.log("e :", e);
        }}
      />
  });

  useEffect(() => { // 라이프사이클 주기때문에 이렇게 하지 않으면, 렌더할 때 무한히 돈당..
    getMyLocation()
    // getMarkersFromLocation()
  }, []);

  const handleBoundsChanged = (bounds) => {
    mapStore.bounds = bounds;
    console.log("mapStore.bounds : ", mapStore.bounds);
  }
  const handleZoomChanged = (zoom) => {
    mapStore.zoom = zoom;
    console.log("mapStore.zoom : ", mapStore.zoom);
  }
  const handleCenter = (center) => {
    mapStore.center = center;
    console.log("mapStore.center : ", mapStore.center);
  }

  const newOverlay = ({stat}) => {
    if(mapStore.stat === -1) return;
    console.log("mapStore.stat : ", mapStore.stat);
    console.log("markers data : ", mapStore.markers[mapStore.stat]);
    return <View style={{position: 'absolute', left: 193, top: 448, width: 150, height: 150, zIndex: 1, backgroundColor:'#ffffff'}}>
      <Image style={{height:50, width: 50}}
        source={require('@foodtruckmap/common/src/static/icon_processed/noun_User_1485759.png')} />
      {/* <Text>latitude : {mapStore.markers[mapStore.stat].latitude}</Text>
      <Text>longitude : {mapStore.markers[mapStore.stat].longitude}</Text> */}
      <Text>{mapStore.markers[mapStore.stat].title}</Text>
      <button style={{width: 100,  }}>상세페이지로</button>
      </View>
  }

  return (
      <View>
        <button onClick={() => getMyLocation()}> 내 위치가 어디니??</button>
        <button onClick={() => getMarkersFromLocation() }>현위치에서 탐색</button>
        <p>lat: {mapStore.center._lat}</p>
        <p>lng: {mapStore.center._lng}</p>
        
        <NaverMap
          id='naverMap'
          style={{width: '100%', height: '400px'}}
          zoom={mapStore.zoom}
          onZoomChanged = { (zoom) => handleZoomChanged(zoom) }
          onBoundsChanged = { (bounds) => handleBoundsChanged(bounds) }
          center={ mapStore.center }
          onCenterChanged = { (center) => handleCenter(center) }
          >

          <Marker // 내 위치를 띄우는 마커
            position={mapStore.userCenter}
            />
          
          { make_markers }
        </NaverMap>

        { newOverlay(mapStore.stat) }
      </View>
  )
})