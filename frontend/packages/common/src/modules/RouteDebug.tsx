import * as React from 'react';
import { useContext } from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';
import { observer } from 'mobx-react-lite';
import { mainStoreContext } from '../store/MainStore';

export const RouteDebug: React.FC = observer(() => {
  const mainStore = useContext(mainStoreContext)
  return (
    <View>
      <Text style={styles.sectionDescription}>screen {mainStore.screenHeight}</Text>
      <Text style={styles.sectionDescription}>window {Dimensions.get('window').height}</Text>
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