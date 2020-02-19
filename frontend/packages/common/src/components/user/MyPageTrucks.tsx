import * as React from 'react';
import { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { Colors } from '../../static/CustomColor';
import { CustomStyle, CustomText } from '../../static/CustomStyle';
import axios from 'axios'
import { mainStoreContext } from '../../store/MainStore';
import { MyPageTruckItem } from './MyPageTruckItem';
import { History, LocationState } from 'history';

interface TruckData {
  myTruck: Object,
  following: Object
}

interface MyInfo {
  name: String,
  email: String,
  isSeller: any,
}

interface Props {
  history: History<LocationState>
  myInfo: MyInfo, 
}

interface TruckProps {
  title: string,
  imgURL?: string,
  state: String,
  id: number,
}

interface IData {
  myTruck: TruckProps[],
  following: TruckProps[],
}

export const MyPageTrucks : React.FC<Props> = ({history, myInfo}) => {
  const mainStore = useContext(mainStoreContext)
  const [data, setData] = useState<IData>({
    myTruck: [], following: []
  })

  console.log(myInfo)
  
  useEffect(()=>{
    if (mainStore.isSeller === true) {
      axios.get('/sellers/myTrucks')
      .then((response)=>{
        console.log('myTrucks: ', response, 'myInfo', myInfo)
        setData({myTruck: response.data, following: []})
      })   
     } else {
       axios.get('/follows/followList')
      .then(
        (response)=>{
          console.log('following', response)
          setData({myTruck: [], following: response.data.map(element=>{return {...element.truck, id: element.truckId}})})
        }
      )}
  },[])

  const sellerTruck = () => {
    return <View>
      <Text style={[CustomText.titleHN, {marginBottom: 10, fontSize: 22}]}>내 트럭 보기</Text>
      { data.myTruck.length === 0 ? 
        <Text>내 푸드트럭이 없습니다. 등록해주세요! </Text>
      : <FlatList<TruckProps>
        data={data.myTruck}
        renderItem={({item}) =>
          <MyPageTruckItem truck={item} history={history}/>
        }
        keyExtractor={item=>`${item.title}${item.id}`}
      />
      }
    </View>
  }

  const customerTruck = () => {
    return <View>
      <Text style={[CustomText.titleHN, {marginBottom: 10, fontSize: 22}]}>내가 찜한 트럭</Text>
      <Text>찜 { data.following.length } 개</Text>
      { data.following.length === 0 ? 
        <Text>찜한 트럭이 없습니다. </Text>
      : <FlatList<TruckProps>
        data={data.following}
        renderItem={({item}) =>
          <MyPageTruckItem truck={item} history={history}/>
        }
        keyExtractor={item=>item.id.toString()}
      />
  }
    </View>
  }

  return (
  <View style={styles.myinfoContainer}>
    {myInfo.isSeller ? sellerTruck() : customerTruck()}
  </View>
)
}

const LocalStyles = StyleSheet.create({
myinfoContainer: {
  paddingHorizontal: '10%',
  paddingTop: 20
},
textInline: {
  paddingBottom: 10,
  flexDirection: 'row'
}
})

const styles = { ...CustomStyle, ...LocalStyles }