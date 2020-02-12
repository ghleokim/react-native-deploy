import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Button,
  StyleSheet
} from "react-native";
import { NaverMap, Marker } from 'react-naver-maps';
import { mainStoreContext } from '../../store/MainStore';
import Line from '../Line'
import InfoStaticMaps from '../map/InfoStaticMaps';
import OpeningState from '../seller/OpeningState';

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

    const SellerState: React.FC = () => {
        return (
        <Text style={{fontSize: 20}}>영업상태 : {infoData.data.state}</Text>
        )
    }

    const HoursOfOperation: React.FC = () => {
        return (
            <View>
                <Text>영업 종료 예정 시간</Text>
                <Text>필요해지면 더 만들겠습니다</Text>
            </View>
        )
    }

    return (
        <View>
            <InfoStaticMaps data={infoData.data}/>
            <Line/>
            <OpeningState state={infoData.data.state}></OpeningState>
            <Line/>
            {/* <HoursOfOperation/> */}




        </View>
    );
};