import { observable } from 'mobx';
import { createContext } from 'react';

export type currentPage = 'mainPage' | 'loginPage' | 'mapPage' | 'truckDetailPage' | 'searchList'

class MainStore {
  // global setting
  @observable proxy: string = 'http://54.180.141.50:8001';
  @observable currentPage: currentPage = 'mainPage';
  @observable screenWidth: number = 0;
  @observable screenHeight: number = 0;
  @observable footerHeight: number = 0;
  @observable headerHeight: number = 0;
  @observable scrollviewHeight: number = 0;

  // userinfo
  @observable isLoggedIn: boolean = false;
  @observable isSeller: boolean = false;

  // bannerinfo
  @observable bannerPage: number = 1;
  @observable bannerTotal: number = 1;
  @observable bannerCountOpacity: number = 1;

  // test
  @observable count = 0;
  @observable testCurrentLocation: any;
}

export const mainStoreContext = createContext(new MainStore());