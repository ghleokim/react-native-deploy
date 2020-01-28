import React, { useContext } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Swiper } from './Swiper';
import { mainStoreContext } from '../../store/MainStore';

export const BannerSwiper: React.FC = () => {
  const mainStore = useContext(mainStoreContext)

  const bannerWidth = mainStore.screenWidth
  const bannerHeight = mainStore.screenWidth / 2.6
  console.log(`bannerheight` , bannerHeight)
  return (
    <>
      <Swiper>
        <Image style={[styles.mainBannerImage, { height: bannerHeight, width: bannerWidth }]} source={require('@foodtruckmap/common/src/static/banner/bamdokkabi_1280_480.png')} />
        <Image style={[styles.mainBannerImage, { height: bannerHeight, width: bannerWidth }]} source={require('@foodtruckmap/common/src/static/banner/tacoandboonguh_1280_480.png')} />
        <Image style={[styles.mainBannerImage, { height: bannerHeight, width: bannerWidth }]} source={require('@foodtruckmap/common/src/static/banner/bamdokkabi_1280_480.png')} />
        <Image style={[styles.mainBannerImage, { height: bannerHeight, width: bannerWidth }]} source={require('@foodtruckmap/common/src/static/banner/tacoandboonguh_1280_480.png')} />
        <Image style={[styles.mainBannerImage, { height: bannerHeight, width: bannerWidth }]} source={require('@foodtruckmap/common/src/static/banner/bamdokkabi_1280_480.png')} />
        <Image style={[styles.mainBannerImage, { height: bannerHeight, width: bannerWidth }]} source={require('@foodtruckmap/common/src/static/banner/tacoandboonguh_1280_480.png')} />
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