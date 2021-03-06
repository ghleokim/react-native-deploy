import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
} from "react-native";
import InfoStaticMaps from './../map/InfoStaticMaps';
import OpeningState from './../seller/OpeningState';
import TruckSaleHistoryDetail from "./TruckSaleHistoryDetail";
import { CustomText } from '../../static/CustomStyle';
import { StarYellow } from './Stars';

interface IState {
  id: number,
  imgURL?: string,
  title: string,
  contents: string,
  latitude: Number,
  longitude: Number,
  state: string,
  menus: [],
  starRatingAVG: number,
  truckNotice: string,
}

interface IProps {
  id: number,
  data: IState
}

export default (props: IProps) => {
  const [mapState, setMapState] = useState({ id: props.id, _lat: props.data.latitude, _lng: props.data.longitude, state: props.data.state });
  const [oTime, setOTime] = useState({ beginTime: '', endTime: '' });

  const OperationTime: React.FC = () => {
    return (
      <View>
        <Text>영업 시간</Text>
        <Text>{oTime.beginTime} - {oTime.endTime}</Text>
      </View>
    )
  }

  return (
    <View style={styles.menuListContainer}>
    <View style={styles.menuListContentContainer}>
    <View style={styles.truckInfoContent}>
      <View style={styles.truckInfoCard}>
        <Text style={styles.truckInfoSubTitle}>가게 소개</Text>
        <Text style={{color:'#505050', lineHeight: 25, fontSize: 14}}>{props.data.truckNotice}</Text>
      </View>

      <View style={styles.truckInfoCard}>
      <TruckSaleHistoryDetail truckId={props.id} mapState={mapState}></TruckSaleHistoryDetail>
      </View>
    </View>
  </View>
  </View>
  );
};

const styles = StyleSheet.create({
  menuListContainer: {
    paddingHorizontal: 12,
    paddingBottom: 20
  },
  menuListContentContainer: {
    borderRightWidth: 2,
    borderLeftWidth: 1,
    borderBottomWidth: 4,
    borderTopWidth: 1,
    borderLeftColor: '#e6e6e8',
    borderRightColor: '#d6d6d8',
    borderBottomColor: '#86878b',
    borderTopColor: '#f6f6f8',
    paddingTop: 10,
    paddingBottom: 20,
    borderRadius: 5,
  },
  menuListTitle: {
    alignSelf: 'center',
  },
  truckInfoCard: {
    paddingBottom: 10,
  },
  truckInfoSubTitle: {
    fontSize: 16,
    fontWeight: '800',
    paddingVertical: 10
  },
  truckInfoContent: {
    marginHorizontal: 10
  },
})
