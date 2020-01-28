import React, { useState, useContext } from 'react';
import { View, Text, Button } from "react-native"
import { currentPage, mainStoreContext } from './store/MainStore';
import { RouteMain } from './modules/RouteMain';
import { RouteLogin } from './modules/RouteLogin';
import { RouteMap } from './modules/RouteMap';
import { observer } from 'mobx-react-lite';

export const Router: React.FC = observer(() => {
  const mainStore = useContext(mainStoreContext);

  const currentPage = mainStore.currentPage

  console.log(mainStore.currentPage)
  
  function routePage (currentPage: currentPage) {
    if (currentPage === 'mainPage') {
      return (
        <RouteMain />
      )
    } else if (currentPage === 'loginPage') {
      return (
        <RouteLogin />
      )
    } else if (currentPage === 'mapPage') {
      return (
        <RouteMap />
      )
    } else {
      return (
        <View><Text>wrong value</Text></View>
      )
    }
  }

  return (
    <View>
      {routePage(currentPage)}
    </View>
  )
})