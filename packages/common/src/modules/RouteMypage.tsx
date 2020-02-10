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

export const RouteMypage : React.FC<Props> = observer(({history}) => {
  const mainStore = React.useContext(mainStoreContext)
  const handleLogout = () => {
    axios.get('/users/logout')
      .then((response)=>{
        if (response.data === true) {
          mainStore.isLoggedIn = false;
          mainStore.isSeller = false;
          localStorage.removeItem('cookies')
          localStorage.removeItem('userEmail')
          if (localStorage.getItem('isSeller') === 'true') {
            localStorage.removeItem('isSeller')
            localStorage.removeItem('truckId')
            localStorage.removeItem('truckIdList')
          } else {
            localStorage.removeItem('isSeller')
          }
          history.replace('/')
        }
      }).catch((err)=> {
        console.log(err)
      })
    }

  return (
    <View style={{flex: 1}}>
      <TouchableOpacity onPress={()=>{handleLogout()}} style={[styles.buttons, { position: 'absolute', zIndex: 10, alignSelf:'flex-end', flex: 1, paddingHorizontal: 10, top: 20, right: '10%'}]}>
        <Text style={{ color: Colors.white }}>로그아웃</Text>
      </TouchableOpacity>
      <Mypage history={history}/>
    </View>
  )
})

const LocalStyles = StyleSheet.create({})

const styles = { ...CustomStyle, ...LocalStyles }