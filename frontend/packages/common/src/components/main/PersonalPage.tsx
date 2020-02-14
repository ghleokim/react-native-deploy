import React, { useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, FlatList, TouchableOpacity } from 'react-native';
import { CustomStyle, CustomText } from '../../static/CustomStyle';
import { mainStoreContext } from '../../store/MainStore';
import axios from 'axios';

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

export const PersonalPage: React.FC = () => {
  const mainStore = useContext(mainStoreContext)
  const userEmail = localStorage.getItem('userEmail')
  const [truckList, setTruckList] = useState<TruckItem[]>([])
  const [scrollState, setScrollState] = useState(false)
  const [scrollState2, setScrollState2] = useState(false)
  
  const [touchInState, setInState] = useState({x: 0,y: 0, timestamp: 0})
  const [touchOutState, setOutState] = useState({x: 0,y: 0, timestamp: 0})

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

  const sampleItem = {
    title: '샘플 푸드트럭',
    rating: 3.5,
    imgURL: 'https://lh3.googleusercontent.com/proxy/wE0WUWNjYwPHqPZD_BxuvLAJckYxuCrxvDdazDUIlEQTlfv5fhZqwAPu_eHe7-YwlLZwItSJVBdGL8SABnncWjmJ1oMwiqyk0bfKo1eM9mM4AKC2j-OHzzlCbvUBGSeTmUk6',
  }

  const ifNotLoggedIn = () => {
    return (
      <View style={{width: '100%', height: '100%', backgroundColor: 'rgba(255,255,255,0.7)', justifyContent: 'center', alignItems: 'center', position: 'absolute', zIndex: 2}}>
        <Text>로그인하시면 내 팔로우 트럭을 볼 수 있어요.</Text>
        <Text>로그인 하러 가기</Text>
      </View>
    )
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

    return (
      <TouchableOpacity activeOpacity={1}
        onPressOut={(e)=>{ 
          if (scrollState) {
            // if on scroll, set state to false and finish
            setScrollState2(false)
          } else {
            // if not on scroll, set press
            console.log('pressed')
         }}}>
        <View style={{width: mainStore.screenWidth * 2 / 5, padding: 10}}>
          { truck.state.toLowerCase() === 'open' ? <></> : <View style={{position: 'absolute', backgroundColor: 'rgba(255,255,255,0.7)', height: '100%', width: '100%', zIndex: 2}}></View>}
          <View style={{width: '100%', height: mainStore.screenWidth * 2 / 5 - 20, alignItems: 'center', justifyContent: 'center', backgroundColor: '#e3e3e3', borderRadius: 25}}>
            {!!truck.imgURL 
            ? <Image style={{width: '100%', height: '100%', borderRadius: 20}} source={{uri: truck.imgURL}}/>
            : <Image style={{width: 30, height: 30}} source={require('@foodtruckmap/common/src/static/icon_processed/plusbutton.png')} defaultSource={require('@foodtruckmap/common/src/static/icon_processed/plusbutton.png')}/>}
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


  const handleTouchOrSwipe = () => {
    const distance = Math.sqrt(
      Math.pow((touchInState.x - touchOutState.x), 2)
      + Math.pow((touchInState.y -touchOutState.y), 2) 
    )
    const duration = touchOutState.timestamp - touchInState.timestamp
    console.log(distance, duration, touchInState, touchOutState)
    // alert(`distance ${distance}, duration ${duration}`)
    // setInState({x: -1, y: -1, timestamp: 0})
    // setOutState({x: -1, y: -1, timestamp: 0})

    if (distance >= 10 || duration >= 300) {
      // alert('swipe')
      console.log('swipe')
      setScrollState(false)
    } else {
      // alert('touch')
      console.log('touch')
      setScrollState(true)
    }
  }

  const MapTruckList: React.FC = () => {
    const NewTruckList = truckList.map(element=>{
      return <TouchableOpacity key={`${element.id}${element.title}123`} activeOpacity={1} 
      onPressIn={(e)=>{setInState({x: e.nativeEvent.locationX, y: e.nativeEvent.locationY, timestamp: e.nativeEvent.timestamp})}}
      onPressOut={(e)=>{setOutState({x: e.nativeEvent.locationX, y: e.nativeEvent.locationY, timestamp: e.nativeEvent.timestamp}); handleTouchOrSwipe()}}
      // onPressOut={(e)=>{ 
      // if (scrollState) {
      //   // if on scroll, set state to false and finish
      //   setScrollState(false)
      // } else {
      //   // if not on scroll, set press
      //   console.log('pressed')
      //  }}}
         >
        <View style={{width: mainStore.screenWidth * 2 / 5, padding: 10}}>
          <View style={{width: '100%', height: mainStore.screenWidth * 2 / 5 - 20, alignItems: 'center', justifyContent: 'center', backgroundColor: '#e3e3e3', borderRadius: 25}}>
            {!!element.imgURL 
            ? <Image style={{width: '100%', height: '100%', borderRadius: 20}} source={{uri: element.imgURL}}/>
            : <Image style={{width: 30, height: 30}} source={require('@foodtruckmap/common/src/static/icon_processed/plusbutton.png')} defaultSource={require('@foodtruckmap/common/src/static/icon_processed/plusbutton.png')}/>}
          </View>
          <View style={{position: 'absolute', top: 10, left: 10, backgroundColor: '#ffff00', paddingHorizontal: 4, paddingVertical: 2}}><Text style={{fontWeight: '700'}}>{element.rating}</Text></View>
          <View style={{paddingTop: 5, paddingHorizontal: 3}}>
            <Text style={CustomText.title} numberOfLines={1} ellipsizeMode='clip'>{element.title}</Text>
          </View>
        </View>
      </TouchableOpacity>
    })
  return <>{NewTruckList}</>
  }

  return (
    <View style={[styles.personalContainer,{width: '100%'}]}>
      <View style={styles.titleContainer}>
        <Text style={[CustomText.title, {fontSize: 18}]}>내가 찜한 푸드트럭</Text>
      </View>

      {/* compare between flatlist and scrollview : flatlist */}
      <View style={{paddingHorizontal: 10}}>
        <FlatList<TruckItem>
          horizontal
          onScroll={(e)=>{
            setScrollState2(true);
          }}
          showsHorizontalScrollIndicator={false}
          data={truckList}
          renderItem={({item})=>
            <FollowingTruckItem truck={item} />
          }
          keyExtractor={(truck)=> `${truck.id}${truck.title}123`}
          />
      </View>

      {/* compare between flatlist and scrollview : scrollview */}
      <View style={{paddingHorizontal: 10}}>
        <ScrollView
          horizontal
          // onScroll={(e)=>{
          //   setScrollState(true);
          // }}
          scrollEventThrottle={30}
          showsHorizontalScrollIndicator={false}
        >
          <MapTruckList />
        </ScrollView>
      </View>
      {/* {ifNotLoggedIn()} */}
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