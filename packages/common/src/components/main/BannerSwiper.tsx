import React, { useContext, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { Swiper } from './Swiper';
import { mainStoreContext } from '../../store/MainStore';

import { BannerStoreContext } from '../../store/BannerStore';

export const BannerSwiper: React.FC = () => {
  const mainStore = useContext(mainStoreContext)
  const BannerStore = useContext(BannerStoreContext)

  const bannerWidth = mainStore.screenWidth
  const bannerHeight = mainStore.screenWidth / 2.6
  console.log(`bannerheight` , bannerHeight)
  
  const handleBannerDetail = (num: number) => {
    BannerStore.pageIndex = num;
    BannerStore.active = !BannerStore.active;
    console.log("pageIndex : " + BannerStore.pageIndex);
    console.log("active: " + BannerStore.active);
  }

  const handleTouchOrSwipe = (item: number, imgURL?: string) => {
    const distance = Math.sqrt(
      Math.pow((BannerStore.touchIn.X - BannerStore.touchOut.X), 2)
      + Math.pow((BannerStore.touchIn.Y - BannerStore.touchOut.Y), 2) 
    )
    const duration = BannerStore.touchOut.timestamp - BannerStore.touchIn.timestamp
    console.log(distance, duration, BannerStore)
    // alert(`distance ${distance}, duration ${duration}`)
    BannerStore.touchIn = {X: -1, Y: -1, timestamp: 0}
    BannerStore.touchOut = {X: -1, Y: -1, timestamp: 0}

    if (distance >= 10 || duration >= 300) {
      // alert('swipe')
      BannerStore.pageIndex = -1;
      BannerStore.active = false;
    } else {
      // alert('touch')
      BannerStore.pageIndex = item;
      BannerStore.active = true;
      mainStore.modalData = {category: 'banner', imgURL: !!imgURL ? imgURL: '' }
    }
  }

  return (
    <>
      <Swiper>
        <TouchableOpacity
          activeOpacity={1}
          onPressIn={(e)=>{BannerStore.touchIn = {X: e.nativeEvent.locationX, Y: e.nativeEvent.locationY, timestamp: e.nativeEvent.timestamp}}}
          onPressOut={(e)=>{BannerStore.touchOut = {X: e.nativeEvent.locationX, Y: e.nativeEvent.locationY, timestamp: e.nativeEvent.timestamp}; handleTouchOrSwipe(1, 'https://lh3.googleusercontent.com/proxy/vwQ06YKty4T_pALw5WJfPSeJkWTBnkv9jprllPijrjcrQ43HvbeZRRmvBnPkzyHP6Pmh3WtfZBtJcs4HjSJDsiQlXi7T6olyWvq9aeFCf7in')}}
        >
          <Image style={[styles.mainBannerImage, { height: bannerHeight, width: bannerWidth }]} source={require('@foodtruckmap/common/src/static/banner/bamdokkabi_1280_480.png')} />
        </TouchableOpacity>
        
        <TouchableOpacity
          activeOpacity={1}
          onPressIn={(e)=>{BannerStore.touchIn = {X: e.nativeEvent.locationX, Y: e.nativeEvent.locationY, timestamp: e.nativeEvent.timestamp}}}
          onPressOut={(e)=>{BannerStore.touchOut = {X: e.nativeEvent.locationX, Y: e.nativeEvent.locationY, timestamp: e.nativeEvent.timestamp}; handleTouchOrSwipe(2, "https://user-images.githubusercontent.com/52501513/74899085-40e84e00-53df-11ea-8682-9ffd9380851a.png")}}
        >
          <Image style={[styles.mainBannerImage, { height: bannerHeight, width: bannerWidth }]} source={require('@foodtruckmap/common/src/static/banner/tacoandboonguh_1280_480.png')} />
        </TouchableOpacity>
      </Swiper>
    </>
  )
}

const styles = StyleSheet.create({

  mainBanner: {
    height: 150,
    width: '100%',
    backgroundColor: '#f3f3f3'
  },
  mainBannerImage: {
    height: 150,
  },
});