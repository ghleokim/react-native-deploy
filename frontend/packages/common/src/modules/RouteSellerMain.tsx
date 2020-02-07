import * as React from 'react';
import {} from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { observer } from 'mobx-react-lite';
import { mainStoreContext } from '../store/MainStore';
import SellerMain from '../components/seller/SellerMain';
import { Mypage } from '../components/user/Mypage';
import { RouteComponentProps } from 'react-router-dom';
import { CustomStyle } from '../static/CustomStyle';
import { Colors } from '../static/CustomColor';
import axios from 'axios'

interface Props extends RouteComponentProps {}

export const RouteSellerMain : React.FC<Props> = observer(({history}) => {
  const mainStore = React.useContext(mainStoreContext)
  console.log(mainStore.isSeller)
  const handleLogout = () => {
    axios.get('/users/logout')
      .then((response)=>{
        if (response.data === true) {
          mainStore.isLoggedIn = false;
          mainStore.isSeller = false;
          localStorage.removeItem('cookies')
          history.replace('/')
        }
      }).catch((err)=> {
        console.log(err)
      })
    }

  return (
    <View style={{flex: 1}}>
       <TouchableOpacity onPress={()=>{handleLogout()}} style={[styles.buttons, { position: 'absolute', zIndex: 10, alignSelf:'flex-end', flex: 1, width: '20%'}]}>
          <Text style={{ color: Colors.white }}>로그아웃</Text>
       </TouchableOpacity>
      {mainStore.isSeller === true ? <SellerMain /> : <></>}
    </View>
  )
})

const LocalStyles = StyleSheet.create({})

const styles = { ...CustomStyle, ...LocalStyles }