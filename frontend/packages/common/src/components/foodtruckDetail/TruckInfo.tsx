import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
} from "react-native";
import InfoStaticMaps from './../map/InfoStaticMaps';
import OpeningState from './../seller/OpeningState';
interface IState {
  id: number,
  imgURL?: string,
  title: string,
  contents: string,
  latitude: Number,
  longitude: Number,
  state: string,
  menus: [],
}

interface IProps {
  data: IState
}

export default (props: IProps) => {
  const [mapState, setMapState] = useState({id: props.data.id, _lat: props.data.latitude, _lng: props.data.longitude, state:props.data.state});

  return (
    <View style={styles.menuListContainer}>
      <InfoStaticMaps data={mapState}></InfoStaticMaps>

      {/* 오프닝 스테이트 폼 제작 중 */}
      <OpeningState state={props.data.state}></OpeningState>
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
  }
})