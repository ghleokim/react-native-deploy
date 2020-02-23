import React, { } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
} from "react-native";
import { CustomText } from '../../static/CustomStyle';
import { numberWithCommas } from '../../lib/stringParser'

interface IProps {
  id: number,
  name: string,
  price: number,
  content: string,
  imgURL?: string,
}

export default (props: IProps) => {

  return (
    <View style={styles.menuContainer}>
      <View style={{ alignSelf: 'center' }}>
        <Image
          defaultSource={require('@foodtruckmap/common/src/static/icon_processed/truck_bw_120.png')}
          source={{ uri: props.imgURL }}
          style={{ width: 70, height: 70, borderRadius: 10 }}
        />
      </View>
      <View style={{ marginLeft: 15, flexShrink: 1, alignSelf: 'center', width:'100%' }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={[CustomText.title, { fontSize: 18 }]}>{props.name}</Text>
          <View style={{ marginHorizontal: 10, flexGrow: 1, alignSelf: 'center',  borderStyle: 'dotted', borderColor: '#000000', borderWidth: 1 }}></View>
          <Text style={[CustomText.title, { color: '#20a024', fontSize: 16 }]}>{numberWithCommas(props.price)} 원</Text>
        </View>
        <Text style={[CustomText.body]}>{props.content}</Text>
      </View>
    </View>
  );

};

const styles = StyleSheet.create({
  menuContainer: {
    borderBottomColor: '#969698',
    borderBottomWidth: 2,
    borderStyle: "dashed",
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    flex: 1
  }
})