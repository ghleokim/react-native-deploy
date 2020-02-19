import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import axios from 'axios'
import moment from 'moment'
import {getDay, groupByDate, YYYYMMDD_korean_day} from '../../lib/datetime'
import InfoStaticMaps from './../map/InfoStaticMaps';

interface IProps {
  truckId: number,
  mapState: any,
}

export default (props: IProps) => {

  const [truckHistories, setTruckHistories] = useState([])
  const [center, setCenter] = useState(
  {
    latitude: props.mapState._lat,
    longitude: props.mapState._lng,
  }
  )

  useEffect(() => {
    axios.get(`trucks/${props.truckId}/history`)
        .then((response) => {
          setTruckHistories([...response.data]);
        })
        .catch((err) => console.log(err));
  }, []);

  const handleHistory = (latitude, longitude) => {
    setCenter({
      latitude,
      longitude
    })
  }

  const historyRow = (history) => {
    return (
      <TouchableOpacity onPress={() => handleHistory(history.latitude, history.longitude)} key={history.id}>
      <View style={styles.historyRow}>
        <View style={{flex: 1, flexDirection: 'row', paddingVertical: 4, }}>
          <View style={{flex: 10}}></View>
          <View style={{flex: 90, borderWidth: 1, borderColor: '#CCCCCC',borderRadius: 5, flexDirection: 'row', paddingVertical: 7}}>
            <Text style={{flex: 1, textAlign: 'left', paddingLeft: 10, color: '#AAAAAA', letterSpacing: 2}}>{moment(history.beginTime).format('hh:mm')} ~ {moment(history.endTime).format('hh:mm')}</Text>
            <Text style={{flex: 1, textAlign: 'right', paddingRight: 10, color: '#AAAAAA'}}>{`${String(history.area2).trim().substring(history.area2.lastIndexOf(" ")+1,history.area2.length)} ${history.area3}`}</Text>
            </View>
          </View>
      </View>
      </TouchableOpacity>
    )
  }

  const emptyHistory = () => {
    return (
      <View>
        <Text>
          히스토리가 없습니다.
        </Text>
      </View>
    )
  }

  const groupByKey = 'beginTime'
  const showHistory = () => {
    const historiesGroupByDate = groupByDate(truckHistories, groupByKey)

    const historyGroups = Object.keys(historiesGroupByDate).map(function(key) {
      return [key, historiesGroupByDate[key]];
    });

    return historyGroups.map(histories => historiesBox(histories));
  }

  const historiesBox = (histories) => {
    return (
      <View style={styles.historiesBox}>
          <View style={{flexDirection: 'row'}}>            
            <Text style={{flex: 5}}></Text>
            <Text style={styles.historiesBoxDate}>{YYYYMMDD_korean_day(histories[0])}</Text>
          </View>
        {histories[1].map(history => historyRow(history))}
      </View>        
    )
  }

  return (
    <View>
      <View>
      {props.mapState.state !== 'closed' && props.mapState.state !== 'CLOSED' && 
      <InfoStaticMaps openLat={props.mapState._lat} openLng={props.mapState._lng} curLat={center.latitude} curLng={center.longitude} histories={truckHistories}></InfoStaticMaps>
      }
      </View>

      <View style={{paddingVertical: 15}}></View>

      <Text style={styles.truckInfoSubTitle}>히스토리</Text>
        <View style={styles.historyBody}>
          {
            truckHistories.length === 0 
            ? emptyHistory() 
            : showHistory()
          }
        </View>
      </View>
  );

};

const styles = StyleSheet.create({
  historyContainer: {
    borderWidth: 1,
    borderColor: '#e6e6e8',
  },
  historyTitle: {
    borderBottomWidth: 3,
    borderColor: '#e1e1e1',    
  },
  historyTitleText: {
    fontSize: 25,
    fontWeight: '500',
    textAlign: 'center'
  },
  historyBody: {
  },
  truckInfoSubTitle: {
    fontSize: 16,
    fontWeight: '800',
    paddingVertical: 10
  },
  historyRow: {
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  historiesBox: {
    paddingVertical: 7,
  },
  historiesBoxDate: {
    fontSize: 15,
    flex: 80,
  },
})
