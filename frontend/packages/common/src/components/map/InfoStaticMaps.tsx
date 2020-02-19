import { NaverMap, Marker } from 'react-naver-maps';
import React from 'react';

interface IProps {
  openLng: number,
  openLat: number,
  curLng: number,
  curLat: number,
  histories: any,
}

export default (props: IProps) => {
 
  return (
    <NaverMap
        id='naverMap'
        style={{height: '200px', backgroundColor: "#000000"}}
        zoom={16}
        center={{y: props.curLat, x: props.curLng, _lat: props.curLat, _lng: props.curLng}}
        onCenterChanged = { (center) => console.log('center : ', center) }
        scrollWheel={false}
        >

        <Marker // 내 위치를 띄우는 마커
          position={{x: props.openLng, y: props.openLat, _lat: props.openLat, _lng: props.openLng}}
          icon={require("@foodtruckmap/common/src/static/img/myPos_24.png")}
          zIndex={10}
        />

        {props.histories.map(history => 
          <Marker // 내 위치를 띄우는 마커
          position={{y: history.latitude, x: history.longitude, _lat: history.latitude, _lng: history.longitude}}
          icon={require("@foodtruckmap/common/src/static/img/sample_shrimp_50.png")}
          zIndex={9}
          key={history.id}
        />  
        )}


      </NaverMap>
    )
}