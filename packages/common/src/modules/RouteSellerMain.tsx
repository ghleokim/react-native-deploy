import * as React from 'react';
import {} from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { observer } from 'mobx-react-lite';
import { mainStoreContext } from '../store/MainStore';
import SellerMain from '../components/seller/SellerMain';
import { RouteComponentProps } from 'react-router-dom';
import { CustomStyle } from '../static/CustomStyle';

interface Props extends RouteComponentProps {}

export const RouteSellerMain : React.FC<Props> = observer(({history}) => {
  const mainStore = React.useContext(mainStoreContext)

  return (
    <View style={{flex: 1}}>
      {mainStore.isSeller === true ? <SellerMain /> : <>{history.push('/')}</>}
    </View>
  )
})

const LocalStyles = StyleSheet.create({})

const styles = { ...CustomStyle, ...LocalStyles }