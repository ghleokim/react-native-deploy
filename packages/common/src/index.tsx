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
import { Modal } from './components/main/Modal';
import { BannerStoreContext } from './store/BannerStore';
import { LoadingStoreContext } from './store/LoadingStore';
import LoadingBar from './common/LoadingBar';
import LoadingPage from './common/LoadingPage';

const HTTPS_AWS='https://food-truck.shop/api'
const AWS = 'http://54.180.141.50:8001/api';
const LOCAL = 'http://localhost:8001/api';
const HODUN = 'http://70.12.247.106:8001/api';

axios.defaults.baseURL=HTTPS_AWS;
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.withCredentials = true;
axios.defaults.timeout = 2000;

axios.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  if (401 === error.response.status && '/users/login' === error.response.config.url ) {
    alert('잘못된 로그인 정보입니다. 다시 시도해주십시오.')
    return Promise.reject(error)
  } else if (401 === error.response.status) {
    alert('로그인 후 이용 가능한 기능입니다.')
    history.go(-1)
    return Promise.reject(error);
  } else {
      return Promise.reject(error);
  }
});

export const App: React.FC = observer(() => {
  const mainStore = useContext(mainStoreContext);
  const bannerStore = useContext(BannerStoreContext);
  const loadingStore = useContext(LoadingStoreContext);

  axios.interceptors.request.use(function (config) {
    loadingStore.increase()
    return config;
  }, function (error) {
    loadingStore.decrease()
    return Promise.reject(error);
  });

axios.interceptors.response.use(function (response) {
  loadingStore.decrease()
  return response;
  }, function (error) {
    loadingStore.decrease()
    return Promise.reject(error);
  }); 

  mainStore.screenWidth = Dimensions.get('window').width;
  mainStore.screenHeight = Dimensions.get('window').height;
  mainStore.scrollviewHeight = mainStore.screenHeight - mainStore.footerHeight - mainStore.headerHeight;

  const getDimension = () => {
    mainStore.screenWidth = Dimensions.get('window').width;
    mainStore.screenHeight = Dimensions.get('window').height;
    mainStore.scrollviewHeight = mainStore.screenHeight - mainStore.footerHeight - mainStore.headerHeight;
  }

  const getModal = () => {
    if (bannerStore.active === true) {
      if (mainStore.modalData.category === 'banner') {
        return <Modal imgURL={mainStore.modalData.imgURL}/>
      } else if (mainStore.modalData.category === 'notice') {
        return <Modal notice={mainStore.modalData.notice}/>
      } else {
        return <></>
      }
    } else {
      return <></>
    }
  }

  return (
    <View style={{ height: mainStore.screenHeight, flex: 1 }} onLayout={()=>getDimension()}>
      <LoadingBar></LoadingBar>
      <LoadingPage></LoadingPage>
      <Routes height={mainStore.scrollviewHeight} headerHeight={mainStore.headerHeight} footerHeight={mainStore.footerHeight} />
      {getModal()}
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