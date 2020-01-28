import * as React from 'react';
import { useContext } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { mainStoreContext } from '../store/MainStore';
import { observer } from 'mobx-react-lite';
import TruckDetail from '../components/foodtruckDetail/TruckDetail';

export const RouteTruck: React.FC = observer(() => {
  const mainStore = useContext(mainStoreContext);
  const currentPage = mainStore.currentPage

  return (
    <View>
      <Text>{currentPage}</Text>
      <TruckDetail />
    </View>
  )
})

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    alignItems: "center"
  },
  highlight: {
    fontWeight: '700',
  },
  mainBanner: {
    height: 100,
    width: '100%',
    backgroundColor: '#f3f3f3'
  },
  mainBannerImage: {
    height: 100,
    width: '100%',
  },

})