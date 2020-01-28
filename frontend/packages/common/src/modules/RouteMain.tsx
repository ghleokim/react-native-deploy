import * as React from 'react';
import { useContext } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { mainStoreContext } from '../store/MainStore';
import { observer } from 'mobx-react-lite';

export const RouteMain: React.FC = observer(() => {
  const mainStore = useContext(mainStoreContext);
  const currentPage = mainStore.currentPage

  return (
    <View>
      <Text style={styles.sectionTitle}>{currentPage}</Text>
      <View style={styles.mainBanner}>
        <Image style={styles.mainBanner} source={require('@foodtruckmap/common/src/static/banner.png')} />
      </View>
    </View>
  )
})

const styles = StyleSheet.create({
  mainBanner: {
    height: 100,
    width: '100%',
    backgroundColor: '#f3f3f3'
  },
  mainBannerImage: {
    height: 100,
    width: '100%',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600'
  }
})