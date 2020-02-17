import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
} from "react-native";
import axios from 'axios'
import moment from 'moment'
import {getDay} from '../../lib/datetime'

interface IProps {
  truckId: number
}

export default (props: IProps) => {

  const [truckHistories, setTruckHistories] = useState([])

  useEffect(() => {
    axios.get(`trucks/${props.truckId}/history`)
        .then((response) => {
          setTruckHistories([...response.data]);
        })
        .catch((err) => console.log(err));
  }, []);

  const historyRow = (history) => {
    return (
        <View style={styles.historyRow}>
        

        <View style={{flex: 1, flexDirection: 'row'}}>
          <View style={{flex:0.5}}>
            <Text style={{letterSpacing:0.5}}>{`${moment(history.beginTime).format('YYYY/MM/DD')} (${getDay(history.beginTime)})`}</Text>
            <Text>{moment(history.beginTime).format('hh:mm')} ~ {moment(history.endTime).format('hh:mm')}</Text>
          </View>      
          <View style={{flex:0.5}}>
            <Text style={styles.addr}>{`${String(history.area2).trim().substring(history.area2.lastIndexOf(" ")+1,history.area2.length)} ${history.area3}`}</Text>
          </View>
          
        </View>
        </View>
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

  return (
      <View style={styles.historyContainer}>
        <View style={styles.historyTitle}>
          <Text style={styles.historyTitleText}>History</Text>
        </View>
        <View style={styles.historyBody}>
          {
            truckHistories.length === 0 
            ? emptyHistory() 
            : truckHistories.map(history => historyRow(history))}
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
  historyRow: {
    paddingLeft: 8,
    paddingBottom: 8,
    paddingTop: 8,
  },
  addr: {
    color:'#888888', 
    position:'absolute', 
    right:2, 
    bottom:0, 
    paddingRight:10
  }
})
