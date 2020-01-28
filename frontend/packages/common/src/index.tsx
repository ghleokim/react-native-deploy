import React, { useContext } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import SignUpForm from './components/auth/SignUpForm';
import { Router } from './Router';
import TruckDetail from './components/foodtruckDetail/TruckDetail'
import { observer } from 'mobx-react-lite';
import { mainStoreContext } from './store/MainStore';

export const App: React.FC = observer(() => {
  const mainStore = useContext(mainStoreContext);

  mainStore.screenHeight = Dimensions.get('screen').height;
  mainStore.footerHeight = 30;
  mainStore.scrollviewHeight = mainStore.screenHeight - mainStore.footerHeight;

  return (
    <View style={{height: mainStore.screenHeight, flex: 1}}>
      <ScrollView style={{height: mainStore.scrollviewHeight, paddingBottom: 30}}>
        <View style={styles.sectionContainer}>
          <Router />
          <SignUpForm></SignUpForm>
          <TruckDetail/>
        </View>
      </ScrollView>
      <View style={[styles.footer]}>
        <TouchableOpacity onPress={()=>mainStore.currentPage="mainPage"} style={{alignItems: "baseline", flex: 1, flexDirection: "row"}}><Text style={{color:'#FFFFFF'}}>Main</Text></TouchableOpacity>
        <TouchableOpacity onPress={()=>mainStore.currentPage="loginPage"} style={{alignItems: "baseline", flex: 1, flexDirection: "row"}}><Text style={{color:'#FFFFFF'}}>Login</Text></TouchableOpacity>
        <TouchableOpacity onPress={()=>mainStore.currentPage="mapPage"} style={{alignItems: "baseline", flex: 1, flexDirection: "row"}}><Text style={{color:'#FFFFFF'}}>Map</Text></TouchableOpacity>
      </View>
    </View>
  )
})

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
  },
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
  footer: {
    position: 'absolute',
    height: 30,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: '#3f3f3f',
    flexDirection: 'row'
  },
  smallButton: {
    height: 30,
    flex: 1,
    flexDirection: "column"
  }
});