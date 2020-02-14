import React, { useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, FlatList, TouchableOpacity } from 'react-native';
import { CustomStyle, CustomText } from '../../static/CustomStyle';
import { mainStoreContext } from '../../store/MainStore';
import axios from 'axios';
import { History, LocationState } from 'history'

interface TruckItem {
  id: number,
  title: string,
  contents: string,
  imgURL?: string,
  latitude: number,
  longitude: number,
  state: string,
  rating: number,
}

interface TruckProps {
  truck?: TruckItem
}

interface Props {
  history: History<LocationState>
}

export const PersonalPage: React.FC<Props> = ({history}) => {
  const mainStore = useContext(mainStoreContext)
  const userEmail = localStorage.getItem('userEmail')
  const [truckList, setTruckList] = useState<TruckItem[]>([])

  const getFollowingTrucks = () => {
    axios.get('/follows/followList')
    .then(response=>{
      console.log(response.data)
      const truckList = response.data.map((element) => {
        return {
            ...element.truck,
            id: element.truckId,
            rating: 4.2
        }
      })
      console.log(truckList)
      setTruckList(truckList)
    })
    .catch(err=>console.log(err))
  }

  useEffect(()=>{getFollowingTrucks()},[])  

  const sampleItemList: TruckItem[] = [
    {
      id: 0,
      title: '타코야끼 트럭',
      contents: '',
      imgURL: '',
      latitude: 0,
      longitude: 0,
      state: 'open',
      rating: 4.2,
    },
    {
      id: 1,
      title: '리틀 쿠반 트럭',
      contents: '',
      imgURL: '',
      latitude: 0,
      longitude: 0,
      state: 'prepare',
      rating: 3.9,
    },
    {
      id: 2,
      title: '쉬림프King',
      contents: '',
      imgURL: '',
      latitude: 0,
      longitude: 0,
      state: 'open',
      rating: 4.2,
    }
  ]

  const SampleList: React.FC = () => {
    return (
      <View style={{paddingHorizontal: 10}}>
        <FlatList<TruckItem>
          horizontal
          showsHorizontalScrollIndicator={false}
          data={sampleItemList}
          renderItem={({item})=>
            <FollowingTruckItem truck={item} />
          }
          keyExtractor={(truck)=> `${truck.id}${truck.title}123`}
          />
      </View>
    )
  }

  const ifNotLoggedIn = () => {
    if (!!userEmail) {
      return <></>
    }
    return (
    <>
      <SampleList />
      <View style={{width: '100%', height: '100%', backgroundColor: 'rgba(255,255,255,0.7)', justifyContent: 'center', alignItems: 'center', position: 'absolute', zIndex: 2}}>
        <Text>로그인하시면 내 팔로우 트럭을 볼 수 있어요.</Text>
        <TouchableOpacity onPress={()=>history.push('/login')}><Text style={{textDecorationLine: 'underline'}}>로그인 하러 가기</Text></TouchableOpacity>
      </View>
    </>
    )
  }

  const handleTouchOrSwipe = (item: number) => {
    const distance = Math.sqrt(
      Math.pow((mainStore.touchIn.X - mainStore.touchOut.X), 2)
      + Math.pow((mainStore.touchIn.Y - mainStore.touchOut.Y), 2) 
    )
    const duration = mainStore.touchOut.timestamp - mainStore.touchIn.timestamp
    console.log(distance, duration, mainStore)
    // alert(`distance ${distance}, duration ${duration}`)
    mainStore.touchIn = {X: -1, Y: -1, timestamp: 0}
    mainStore.touchOut = {X: -1, Y: -1, timestamp: 0}

    if (distance >= 10 || duration >= 300) {
      console.log('swipe')
    } else {
      console.log('touch')
      history.push(`/trucks/${item}`)
    }
  }

  const FollowingTruckItem: React.FC<TruckProps> = ({truck}) => {
    const getState = (state:string) => {
      if (state.toLowerCase() === 'open') {
        return {message:'영업중', color: '#008000'}
      } else if (state.toLowerCase() === 'prepare') {
        return {message:'영업 준비중', color: '#e0c000'}
      } else {
        return {message:'영업 종료', color: '#608080'}
      }
    }

    const stateProp = getState(truck.state)
    const TruckIconBW: React.FC = () => {return <Image style={{width: '100%', height: '100%'}} source={require('@foodtruckmap/common/src/static/icon_processed/truck_bw_120.png')} defaultSource={require('@foodtruckmap/common/src/static/icon_processed/truck_bw_120.png')}/>}

    return (
      <TouchableOpacity activeOpacity={1}
        onPressIn={(e)=>{
          mainStore.touchIn = {X: e.nativeEvent.locationX, Y: e.nativeEvent.locationY, timestamp: e.nativeEvent.timestamp}
        }}
        onPressOut={(e)=>{ 
          mainStore.touchOut = {X: e.nativeEvent.locationX, Y: e.nativeEvent.locationY, timestamp: e.nativeEvent.timestamp}
          handleTouchOrSwipe(truck.id)
        }}>
        <View style={{width: mainStore.screenWidth * 2 / 5, padding: 10}}>
          { truck.state.toLowerCase() === 'open' ? <></> : <View style={{position: 'absolute', backgroundColor: 'rgba(255,255,255,0.7)', height: '100%', width: '100%', zIndex: 2}}></View>}
          <View style={{width: '100%', height: mainStore.screenWidth * 2 / 5 - 20, alignItems: 'center', justifyContent: 'center', backgroundColor: '#e3e3e3', borderRadius: 25}}>
            {!!truck.imgURL 
            ? <Image style={{width: '100%', height: '100%', borderRadius: 20}} source={{uri: truck.imgURL}} defaultSource={require('@foodtruckmap/common/src/static/icon_processed/truck_bw_120.png')}/>
            : <TruckIconBW />}
          </View>
          <View style={{position: 'absolute', top: 10, left: 10, zIndex: 4, backgroundColor: '#ffff00', paddingHorizontal: 4, paddingVertical: 2}}><Text style={{fontWeight: '700'}}>{truck.rating}</Text></View>
          <View style={{position: 'absolute', top: 10, right: 10, zIndex: 4, backgroundColor: stateProp.color, paddingHorizontal: 4, paddingVertical: 2}}><Text style={{fontWeight: '700', color: '#ffffff'}}>{stateProp.message}</Text></View>
          <View style={{paddingTop: 5, paddingHorizontal: 3}}>
            <Text style={CustomText.title} numberOfLines={1} ellipsizeMode='clip'>{truck.title}</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }


  return (
    <View style={[styles.personalContainer,{width: '100%'}]}>
      <View style={styles.titleContainer}>
        <Text style={[CustomText.title, {fontSize: 18}]}>내가 찜한 푸드트럭</Text>
      </View>

      <View style={{paddingHorizontal: 10}}>
        <FlatList<TruckItem>
          horizontal
          showsHorizontalScrollIndicator={false}
          data={truckList}
          renderItem={({item})=>
            <FollowingTruckItem key={`${item.id}${item.title}`} truck={item} />
          }
          keyExtractor={(truck)=> `${truck.id}${truck.title}`}
          />
      </View>

      {ifNotLoggedIn()}
    </View>
  )

}


const LocalStyles = StyleSheet.create({
  personalContainer: {
    width: '100%',
  },
  titleContainer: {
    paddingTop: 12,
    paddingLeft: 16
  }
})

const styles = { ...CustomStyle, ...LocalStyles }