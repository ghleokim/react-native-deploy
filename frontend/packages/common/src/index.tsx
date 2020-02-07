import React, { useContext } from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
} from 'react-native';
import { observer } from 'mobx-react-lite';
import { Routes } from './Routes';
import { mainStoreContext } from './store/MainStore';
import { CustomStyle } from './static/CustomStyle';
import axios from 'axios';

const HTTPS_AWS='https://food-truck.shop/api'
const AWS = 'http://54.180.141.50:8001';
const LOCAL = 'http://localhost:8001';
const HODUN = 'http://70.12.247.106:8001';

axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.withCredentials = true;
axios.defaults.baseURL=HTTPS_AWS;

export const App: React.FC = observer(() => {
  const mainStore = useContext(mainStoreContext);

  mainStore.screenWidth = Dimensions.get('window').width;
  mainStore.screenHeight = Dimensions.get('window').height;
  mainStore.scrollviewHeight = mainStore.screenHeight - mainStore.footerHeight - mainStore.headerHeight;

  console.log(mainStore)
  console.log(`isloggedin ${mainStore.isLoggedIn} isSeller ${mainStore.isSeller}`)
  console.log(`screenheight ${mainStore.screenHeight} scrollviewheight ${mainStore.scrollviewHeight}`)
  console.log(`proxy ${AWS}`)

  return (
    <View style={{ height: mainStore.screenHeight, flex: 1 }}>
      <Routes height={mainStore.scrollviewHeight} headerHeight={mainStore.headerHeight} footerHeight={mainStore.footerHeight} />
    </View>
  )
})

// define new style here to override CustomStyle stylesheet.
const localStyle = StyleSheet.create({
  background: {
    position: 'absolute',
    backgroundColor: '#efefef',
  },
  sectionContainer: {
    marginTop: 0,
  },
  navButton: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    flexDirection: "column"
  },
  navButtonImage: {
    tintColor: '#ffffff',
    height: 30,
    width: 30,
    resizeMode: 'cover',
    overflow: 'hidden'
  },
  navButtonText: {
    fontWeight: '300',
    fontSize: 8,
    color: '#ffffff'
  }
});

const styles = { ...CustomStyle, ...localStyle }