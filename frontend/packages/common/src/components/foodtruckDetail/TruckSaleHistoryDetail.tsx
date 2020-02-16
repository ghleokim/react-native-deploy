import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
} from "react-native";
import axios from 'axios'
import moment from 'moment'

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
          <Text>{moment(history.beginTime).format('YYYY년 MM월 DD일')}</Text>
          <Text>{moment(history.beginTime).format('hh:mm')} ~ {moment(history.endTime).format('hh:mm')}</Text>
        </View>
    )
  }

  return (
      <View style={styles.historyContainer}>
        <View style={styles.historyTitle}>
          <Text style={styles.historyTitleText}>History</Text>
        </View>
        <View style={styles.historyBody}>
          {truckHistories.map(history => historyRow(history))}
        </View>
      </View>
  );

};

const styles = StyleSheet.create({
  historyContainer: {},
  historyTitle: {},
  historyTitleText: {
    fontSize: 20,
  },
  historyBody: {
      borderWidth: 1,
      borderColor: '#e6e6e8',
  },
  historyRow: {
      borderBottomWidth: 1,
      borderColor: '#e6e6e8',
      paddingBottom: 5,
      paddingTop: 5,
  },
})
