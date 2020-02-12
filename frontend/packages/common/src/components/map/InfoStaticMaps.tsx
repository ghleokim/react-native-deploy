import { NaverMap, Marker } from 'react-naver-maps';
import React from 'react';

interface IState {
    id: Number,
    _lat: Number,
    _lng: Number,
    state: string,
  }

interface IProps {
  data: IState,
}

export default (infoData: IProps) => {
    return (
    <NaverMap
        id='naverMap'
        style={{height: '200px', backgroundColor: "#000000"}}
        zoom={16}
        center={ {x: infoData.data._lng, y: infoData.data._lat, _lat: infoData.data._lat, _lng: infoData.data._lng} }
        onCenterChanged = { (center) => console.log('center : ', center) }
        scrollWheel={false}
        >
        <Marker // 내 위치를 띄우는 마커
        position={{x: infoData.data._lng, y: infoData.data._lat, _lat: infoData.data._lat, _lng: infoData.data._lng}}
        icon={require("@foodtruckmap/common/src/static/img/myPos_24.png")}
        zIndex={10}
        />
    </NaverMap>
    )
}