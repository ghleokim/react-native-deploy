import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
} from "react-native";
import InfoStaticMaps from './../map/InfoStaticMaps';
import OpeningState from './../seller/OpeningState';
import axios from 'axios';

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
  useEffect(() => {
    axios.get(`openingHours/getTime/${props.data.id}`)
      .then((response) => {
        console.log('getTime : ', response);
        setOTime({beginTime: response.data.beginTime, endTime: response.data.endTime});
      })
      .catch((err) => console.log(err));
  }, []);

  const [mapState, setMapState] = useState({id: props.data.id, _lat: props.data.latitude, _lng: props.data.longitude, state:props.data.state});
  const [oTime, setOTime] = useState({beginTime: '', endTime: ''});

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
      {props.data.state !== 'closed' ? 
        <InfoStaticMaps data={mapState}></InfoStaticMaps>
      : <></>
      }

      <OpeningState state={props.data.state}></OpeningState>
      <OperationTime/>
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