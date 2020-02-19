import React from 'react';
import {
  View,
  Text,
  Button,
} from "react-native";
import { History, LocationState } from 'history';

interface Props {
  history: History<LocationState>
}

export default (history: Props) => {
  const ShowUnauthoritedSeller: React.FC = () => {
    return (
      <View style={{alignSelf:'center'}}>
        <Text>아직 판매자 권한이 승인되지 않았습니다.</Text>
        <Text>승인 후 이용 가능합니다.</Text>
        <Button title='뒤로가기' onPress={ history.history.goBack }></Button>
      </View>
    )
  }

  return <ShowUnauthoritedSeller />
}