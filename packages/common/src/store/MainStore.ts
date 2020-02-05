import { observable } from 'mobx';
import { createContext } from 'react';

class MainStore {
  // global setting
  @observable DEVELOP: boolean = true;

  @observable proxy: string = 'http://54.180.141.50:8001'; //aws
  // @observable proxy: string = 'http://70.12.247.106:8001'; //호준
  // @observable proxy: string = 'http://70.12.246.0:8001'; //다혜
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