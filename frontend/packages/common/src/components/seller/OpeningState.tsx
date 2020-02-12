import React, { useState } from 'react';
import {
    View,
    StyleSheet,
    Text,
} from "react-native";
import { CustomText } from '../../static/CustomStyle';

interface IState {
    state: string
}

export default (props: IState) => {
    const getState = (state) => {
        if (state === 'open') {
          return {message:'영업중', color: '#008000'}
        } else if (state === 'prepare') {
          return {message:'영업 준비중', color: '#e0c000'}
        } else {
          return {message:'영업 종료', color: '#608080'}
        }
      }

    return (
        <View style={styles.menuContainer}>
            {/* TODO : 스타일을 정해야 함 */}
            <Text style={[CustomText.body, { flex: 1, textAlign: 'center', fontSize: 14}]}>영업 상태</Text>
            <Text style={[CustomText.body, { flex: 1, textAlign: 'center',  color: getState(props.state).color, fontSize: 14 }]}>{getState(props.state).message}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    menuContainer: {
      borderBottomColor: '#969698',
      borderBottomWidth: 1,
      paddingVertical: 12,
      paddingHorizontal: 16,
      flexDirection: 'row',
      flex: 1
    }
  })