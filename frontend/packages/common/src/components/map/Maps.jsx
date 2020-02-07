import React, { useContext, useEffect } from 'react';
import { View, TouchableOpacity, Text, Image, ScrollView } from "react-native";
import { NaverMap, Marker } from 'react-naver-maps';
import { observer } from 'mobx-react-lite';
import { mainStoreContext } from '../../store/MainStore';
import { MapStoreContext } from '../../store/MapStore';
import axios from 'axios';

export const Maps =  observer(({history}) => {
  const mainStore = useContext(mainStoreContext);
  const mapStore = useContext(MapStoreContext);

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

  // 위치값을 전달해주어야 함.
  const getMarkersFromLocation = () => {
    axios({
      url: '/trucks/boundary/?'
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

  useEffect(() => { // 라이프사이클 주기때문에 이렇게 하지 않으면, 렌더할 때 무한히 돈당..
    getMyLocation()
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
    mapStore.stat = -1;
  }

  const newOverlay = () => {
    console.log("mapStore.stat : ", mapStore.stat);
    console.log("markers data : ", mapStore.markerData);
    return <View style={{position: 'absolute', 
    left: mapStore.markerData.domEvent.clientX + 150 <= mainStore.screenWidth ?
    mapStore.markerData.domEvent.clientX : mapStore.markerData.domEvent.clientX - 150, 
      top: mapStore.markerData.domEvent.clientY - 20 + 150 <= mapStore.mapHeight ? 
      mapStore.markerData.domEvent.clientY - 20 : mapStore.markerData.domEvent.clientY - 200, 
      width: 150, height: 150, zIndex: 1, backgroundColor:'#ffffff'}}>
      <Image style={{height:50, width: 50}}
        source={require('@foodtruckmap/common/src/static/icon_processed/noun_User_1485759.png')} />
      <Text>{mapStore.markers[mapStore.stat].title}</Text>
      <button style={{width: 100,  }} onClick={() => handleRouteDetail(mapStore.markers[mapStore.stat])}>상세페이지로</button>
      </View>
  }

  const make_markers = mapStore.markers.map((element, index) => {
    return <Marker key={index}
        position={{lat:element.latitude, lng:element.longitude}}
        onClick={(e) => {
          mapStore.markerData = e;
          mapStore.stat = index;
          console.log("e : ", e);
        }}
      />
  });

  const handleListMarkerTrace = (el) => {
    console.log("choiced element : ", el);

    let defaultDistance = {
      y: mapStore.bounds._max.y - mapStore.bounds._min.y,
      x: mapStore.bounds._max.x - mapStore.bounds._min.x
    }
    let defaultZoom = mapStore.zoom;

    while(defaultZoom != 1) {
      defaultZoom--;
      defaultDistance.y *= 2;
      defaultDistance.x *= 2;
    }
  
    const focusCenter = {
      x: (el.longitude + mapStore.userCenter.lng) / 2,
      y: (el.latitude + mapStore.userCenter.lat) / 2,
      _lat: (el.latitude + mapStore.userCenter.lat) / 2,
      _lng: (el.longitude + mapStore.userCenter.lng) / 2
    }

    while(1) {
      let minLat = focusCenter._lat - defaultDistance.y / 2;
      let maxLat = focusCenter._lat + defaultDistance.y / 2;
      let minLng = focusCenter._lng - defaultDistance.x / 2;
      let maxLng = focusCenter._lng + defaultDistance.x / 2;

      if(minLat > mapStore.userCenter.lat || maxLat < mapStore.userCenter.lat || 
        minLng > mapStore.userCenter.lng || maxLng < mapStore.userCenter.lng || 
        minLat > el.latitude || maxLat < el.latitude || 
        minLng > el.longitude || maxLng < el.longitude 
      ) {
        defaultZoom--;
        defaultDistance.y *= 2;
        defaultDistance.x *= 2;
        break;
      }
      else {
        defaultZoom++;
        defaultDistance.y /= 2;
        defaultDistance.x /= 2;
      }
    }

    handleCenter(focusCenter);
    mapStore.zoom = defaultZoom;
    mapStore.selectedId = el.id;
  }

  // 라우팅 소스 작성
  const handleRouteDetail = (el) => {
    history.push(`/trucks/${el.id}`)
  }

  const makeList = mapStore.markers.map((element, index) => {
    console.log("element : ", element);
    return (
      <TouchableOpacity
        style={{ flexDirection: 'row' }}
        key={index} 
        onPress={() => mapStore.selectedId != element.id ? handleListMarkerTrace(element) : handleRouteDetail(element)}>
        <Image
          style={{ borderRadius: 30, width: 60, height: 60 }}
          source={{ uri: element.imgURL }} />
        <View>
          <Text>{element.title}</Text>
          <Text>{element.contents}</Text>
        </View>
      </TouchableOpacity>
    )
  });

  const showListView = () => {
    return (
      <ScrollView style={{position: 'absolute', 
      top: mainStore.scrollviewHeight / 2, 
        width: mainStore.screenWidth, height: mainStore.scrollviewHeight / 2, zIndex: 1, backgroundColor:'#ffffff'}}
      >
        { makeList }
      </ScrollView>
    )
  }

  const drawLargeMap = () => {
    return (
      <NaverMap
        id='naverMap'
        style={{width: mapStore.mapWidth, height: mapStore.mapHeight = mainStore.scrollviewHeight}}
        zoom={mapStore.zoom}
        onZoomChanged = { (zoom) => handleZoomChanged(zoom) }
        onBoundsChanged = { (bounds) => handleBoundsChanged(bounds) }
        center={ mapStore.center }
        onCenterChanged = { (center) => handleCenter(center) }
        naverRef={ref => mapStore.reftest = ref}
        >

        <Marker // 내 위치를 띄우는 마커
          position={mapStore.userCenter}
          visible={mapStore.myPosState}
          />
        
        { make_markers }
      </NaverMap>
    )
  }

  const drawSmallMap = () => {
    return (
      <NaverMap
        id='naverMap'
        style={{width: mapStore.mapWidth, height: mapStore.mapHeight = mainStore.scrollviewHeight / 2, backgroundColor: "#000000"}}
        zoom={mapStore.zoom}
        onZoomChanged = { (zoom) => handleZoomChanged(zoom) }
        onBoundsChanged = { (bounds) => handleBoundsChanged(bounds) }
        center={ mapStore.center }
        onCenterChanged = { (center) => handleCenter(center) }
        naverRef={ref => mapStore.reftest = ref}
        >

        <Marker // 내 위치를 띄우는 마커
          position={mapStore.userCenter}
          />
        
        { make_markers }
      </NaverMap>
    )
  }

  return (
      <View>        
        {mapStore.listState == false && drawLargeMap()}
        {mapStore.listState == true && drawSmallMap()}

        <View style={{position: 'absolute', left: 20, 
          top: 20, width: 40, height: 40, borderRadius: 5, zIndex: 1, backgroundColor: mapStore.myPosState ? '#2F96FC' : '#777777'}}
          onClick={() => getMyLocation()}
        >
          <Image
           style={{
              tintColor: '#FFFFFF',
              height: 40,
              width: 40,
              resizeMode: 'cover',
              overflow: 'hidden'
            }}
            source={require('@foodtruckmap/common/src/static/icon_processed/noun_Pin_1015369.png')}
          />
        </View>

        <View style={{position: 'absolute', left: 20, 
          top: 80, width: 70, height: 40, zIndex: 1, backgroundColor:'#cccccc'}}
          onClick={() => getMarkersFromLocation() }
        >
          <Text>트럭 검색</Text>
        </View>

        <View style={{position: 'absolute', left: 20,
          top: 140, width: 70, height: 40, zIndex: 1, backgroundColor:'#aaaaaa'}}
          onClick={(e) => {
            // toggle 토글을 할 경우, 지도를 줄이고 끝이 아닌 지도를 지우고 새로 그리는 방향으로 해야 한다.
            mapStore.listState = !mapStore.listState;
            mapStore.mapHeight = "50%";
          }}
          >
          <Text>리스트</Text>
        </View>

        { mapStore.stat != -1 && newOverlay() }

        {mapStore.listState == true &&  // 리스트의 조건부 렌더링
          showListView()
        }
      </View>
  )
})
