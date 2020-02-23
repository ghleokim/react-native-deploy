import React, { useState } from 'react';
import {
    View,
    StyleSheet,
    Text,
} from "react-native";
import { CustomText } from '../../static/CustomStyle';
import { StarYellowOutline } from '../foodtruckDetail/Stars';
import { numberWithFirstDecimal } from '../../lib/stringParser'

interface IState {
    state: string,
    star: number,
}

export default (props: IState) => {
    const getState = (state) => {
        if (state === 'open' || state === 'OPEN') {
          return {message:'영업중', color: '#008000'}
        } else if (state === 'prepare' || state === 'PREPARE') {
          return {message:'영업 준비중', color: '#d37f00'}
        } else {
          return {message:'영업 종료', color: '#608080'}
        }
      }

    return (
        <View style={styles.menuContainer}>
          <Text style={[CustomText.body, { flex: 1, textAlign: 'center', fontSize: 14, display: 'flex', justifyContent: 'center', alignItems: 'center' }]}><StarYellowOutline height={25} width={25} /><Text style={{textAlignVertical: 'top', fontWeight: '700'}}>{numberWithFirstDecimal(props.star)}</Text></Text>
          <Text style={[CustomText.body, { flex: 1, textAlign: 'center',  color: getState(props.state).color, fontSize: 14, display: 'flex', justifyContent: 'center', alignItems: 'center' }]}>{getState(props.state).message}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    menuContainer: {
      flexDirection: 'row',
      flex: 1,
    }
  })