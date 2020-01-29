import React, { useContext } from 'react';
import { View, Text } from "react-native"
import { currentPage, mainStoreContext } from './store/MainStore';
import { RouteMain } from './modules/RouteMain';
import { RouteLogin } from './modules/RouteLogin';
import { RouteMap } from './modules/RouteMap';
import { RouteTruck } from './modules/RouteTruck';
import { observer } from 'mobx-react-lite';
import { RouteList } from './modules/RouteList';

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
    } else if (currentPage === 'truckDetailPage') {
      return (
        <RouteTruck />
      )
    } else if (currentPage === 'searchList') {
      return (
        <RouteList />
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