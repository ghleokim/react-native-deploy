import React, { useContext, useEffect } from 'react';
import { View, TouchableOpacity, Text, Image, ScrollView } from "react-native";
import { NaverMap, Marker } from 'react-naver-maps';
import { observer } from 'mobx-react-lite';
import { mainStoreContext } from '../../store/MainStore';
import { MapStoreContext } from '../../store/MapStore';
import axios from 'axios';
import { CustomText } from '../../static/CustomStyle';
import { Colors } from '../../static/CustomColor';

export const Maps =  observer(({history}) => {
  const mainStore = useContext(mainStoreContext);
  const mapStore = useContext(MapStoreContext);
  console.log(mapStore)

  const getDistance = (point1, point2)=> {
    const toRadians = (value) => value * Math.PI / 180
    const R = 6371e3; // metres
    const lat1 = point1.latitude
    const lon1 = point1.longitude
    const lat2 = point2.latitude
    const lon2 = point2.longitude

    const φ1 = toRadians(lat1);
    const φ2 = toRadians(lat2);
    const Δφ = toRadians(lat2-lat1);
    const Δλ = toRadians(lon2-lon1);
    console.log(point1, point2)

    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    const result = Math.floor(R * c)

    if (result > 1000) {
      return `${Math.floor(result/10) / 100} km` 
    } else {
      return `${result} m`
    }
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

  // 위치값을 전달해주어야 함.
  const getMarkersFromLocation = () => {
    mapStore.selectedId = -1;
    axios({
      url: '/trucks/boundary/?'
        + 'startLatitude=' + mapStore.bounds._sw._lat
        + '&startLongitude=' + mapStore.bounds._sw._lng
        + '&endLatitude=' + mapStore.bounds._ne._lat
        + '&endLongitude=' + mapStore.bounds._ne._lng,
      method: 'get'
    }).then((response) => {
      const incoming= { data: [] }
      if (response.data) {incoming.data = response.data.map((element)=>{element.state = element.state.toLowerCase(); return element})}
      mapStore.markers = incoming.data === undefined ? [] : incoming.data;
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
    if(mapStore.stat != -1 && mapStore.listState === false) getMarkersFromLocation();
    mapStore.stat = -1;
  }

  const newOverlay = () => {
    if(mapStore.selectedId === -1) return;
    console.log("mapStore.stat : ", mapStore.stat);
    console.log("markers data : ", mapStore.markerData);
    return <View style={{position: 'absolute', 
    left: mapStore.markerData.domEvent.clientX + 150 <= mainStore.screenWidth ?
    mapStore.markerData.domEvent.clientX : mapStore.markerData.domEvent.clientX - 150, 
      top: mapStore.markerData.domEvent.clientY - 20 + 150 <= mapStore.mapHeight ? 
      mapStore.markerData.domEvent.clientY - 20 : mapStore.markerData.domEvent.clientY - 200, 
      width: 'auto', height: 50, zIndex: 1, backgroundColor:'#ffffff',
      borderColor: '#2c200d', borderRadius: 10, borderWidth: 2, paddingHorizontal: 10, justifyContent: 'center'
      }}>
      <Text style={{fontWeight: '700'}}>{mapStore.markers[mapStore.stat].title}</Text>
      <TouchableOpacity style={{width: 100}} onPress={() => handleRouteDetail(mapStore.markers[mapStore.stat])}><Text style={{color: '#606060'}}>상세보기</Text></TouchableOpacity>
      </View>
  }

  const make_markers = mapStore.markers.map((element, index) => {
    return <Marker key={index}
        position={{lat:element.latitude, lng:element.longitude}}
        visible={mapStore.selectedId === -1 ? true : mapStore.selectedId === element.id - 1 ? true : false }
        // 마커의 크기를 바꾸는 것은 별로.
        onClick={(e) => {
          mapStore.markerData = e;
          mapStore.stat = index;
          mapStore.selectedId = element.id - 1;
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

      if(minLat < mapStore.userCenter.lat && maxLat > mapStore.userCenter.lat && 
        minLng < mapStore.userCenter.lng && maxLng > mapStore.userCenter.lng && 
        minLat < el.latitude && maxLat > el.latitude && 
        minLng < el.longitude && maxLng > el.longitude 
      ) {
        defaultZoom++;
        defaultDistance.y /= 2;
        defaultDistance.x /= 2;
      }
      else {
        defaultZoom -= 2;
        defaultDistance.y *= 4;
        defaultDistance.x *= 4;
        break;
      }
    }

    handleCenter(focusCenter);
    mapStore.zoom = defaultZoom;
    mapStore.selectedId = el.id - 1;
  }

  // 라우팅 소스 작성
  const handleRouteDetail = (el) => {
    history.push(`/trucks/${el.id}`)
  }

  const makeList = mapStore.markers.map((element, index) => {
    // console.log("element : ", element);
    return (
      <TouchableOpacity
        style={[ {
          borderBottomColor: `rgba(186,186,186, 0.5)`,
          borderBottomWidth: 1,
        }, {
          flexDirection: 'row',
          backgroundColor: mapStore.selectedId != element.id - 1 ? '#ffffff' : '#f0e2cc'
        }]}
        key={index} 
        onPress={() => mapStore.selectedId !== element.id - 1 ? handleListMarkerTrace(element) : handleRouteDetail(element)}>
        <View style={[ element.state === 'open' ? {backgroundColor: 'rgba(255,255,255,0)', zIndex: -1} : {backgroundColor: 'rgba(255,255,255,0.5)', zIndex: 2} , {position: 'absolute', width: '100%', height: '100%'}]}></View>
        <View style={{ flex: 1, flexDirection: 'row', paddingHorizontal: '6%', paddingVertical: '3%'}}>
          <View style={{ flex: 1 }}>
            <Image
              style={{ borderRadius: 30, width: 60, height: 60 }}
              source={{ uri: element.imgURL }}
              defaultSource={{uri: `https://picsum.photos/id/${element.id}/200`}}
              />
          </View>
          <View style={{ flex: 3, justifyContent: 'center' }}>
            <Text style={[CustomText.title, { color: Colors.black, paddingVertical: 2 }]}>{element.title} <Text style={[CustomText.body,  { paddingHorizontal:3, borderRadius: 5, backgroundColor: '#008000', color: Colors.white, paddingBottom: 3}]}>{element.state}</Text></Text>
            <Text style={[CustomText.body,  { color: Colors.black }]}>{element.contents}</Text>
            <Text style={[CustomText.body,  { color: Colors.deepcoral, fontWeight: '700' }]}>{getDistance({latitude: mapStore.userCenter.lat, longitude: mapStore.userCenter.lng}, {latitude: element.latitude, longitude: element.longitude})}</Text>
          </View>
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
          icon={require("@foodtruckmap/common/src/static/img/myPos_24.png")}
          zIndex={10}
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
          icon={require("@foodtruckmap/common/src/static/img/myPos_24.png")}
          zIndex={10}
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

        {mapStore.listState == true && (mapStore.markers.length ? showListView()
          : <View>
              <Text
                style={{ flexDirection: 'row', backgroundColor: '#ffffff', }}>아 데이터가 없네 젠장</Text>
            </View>
        )}
      </View>
  )
})
