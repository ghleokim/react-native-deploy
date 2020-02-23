import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Colors } from '../../static/CustomColor';
import { CustomStyle } from '../../static/CustomStyle';
import { History, LocationState } from 'history';

interface TruckProps {
  title: String,
  imgURL?: string,
  state: String,
  id: number,
}

interface Props {
  truck: TruckProps,
  history: History<LocationState>
}

export const MyPageTruckItem : React.FC<Props> = ({truck, history}) => { 
  const moveToTruckDetail = () => {
    console.log("clickedTruck : ", truck);
    history.push(`/trucks/${truck.id}`);
  }
  return (
  <View>
    <TouchableOpacity
      style={styles.truckContainer}
      onPress={() => moveToTruckDetail()}>
      <Image
        source={{ uri: truck.imgURL ? truck.imgURL : '' }}
        style={{ position:'absolute', width: '100%', height: 100, borderRadius: 20, borderWidth: 1, borderColor: Colors.gray }}
        defaultSource={require('@foodtruckmap/common/src/static/icon_processed/truck_bw_120.png')}
        />
      <Text style={{ fontWeight: '700', fontSize: 22, backgroundColor: 'rgba(255,255,255,0.5)', alignSelf: 'center', zIndex: 1, paddingHorizontal: 10, paddingVertical: 5}}>{truck.title}</Text>
    </TouchableOpacity>
  </View>
)}

const LocalStyles = StyleSheet.create({
truckContainer: {
  height: 100,
  justifyContent: 'center',
  flexDirection: 'row'
},
textInline: {
  paddingBottom: 10,
  flexDirection: 'row'
}
})

const styles = { ...CustomStyle, ...LocalStyles }