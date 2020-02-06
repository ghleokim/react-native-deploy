import React, { useContext, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
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

  return (
    <>
      <Swiper>
        <TouchableOpacity onPress={() => {handleBannerDetail(1)}}>
          <Image style={[styles.mainBannerImage, { height: bannerHeight, width: bannerWidth }]} source={require('@foodtruckmap/common/src/static/banner/bamdokkabi_1280_480.png')} />
        </TouchableOpacity>
        
        <TouchableOpacity onPress={() => {handleBannerDetail(2)}}>
          <Image style={[styles.mainBannerImage, { height: bannerHeight, width: bannerWidth }]} source={require('@foodtruckmap/common/src/static/banner/tacoandboonguh_1280_480.png')} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => {handleBannerDetail(3)}}>
          <Image style={[styles.mainBannerImage, { height: bannerHeight, width: bannerWidth }]} source={require('@foodtruckmap/common/src/static/banner/bamdokkabi_1280_480.png')} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => {handleBannerDetail(4)}}>
          <Image style={[styles.mainBannerImage, { height: bannerHeight, width: bannerWidth }]} source={require('@foodtruckmap/common/src/static/banner/tacoandboonguh_1280_480.png')} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => {handleBannerDetail(5)}}>
          <Image style={[styles.mainBannerImage, { height: bannerHeight, width: bannerWidth }]} source={require('@foodtruckmap/common/src/static/banner/bamdokkabi_1280_480.png')} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => {handleBannerDetail(6)}}>
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