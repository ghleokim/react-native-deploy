import { observable } from 'mobx';
import { createContext } from 'react';

export type currentPage = 'mainPage' | 'loginPage' | 'mapPage'

class MainStore {
  // global setting
  @observable proxy: string = 'http://70.12.246.0:8001';
  @observable currentPage: currentPage = 'mainPage';
  @observable screenHeight: number = 0;
  @observable footerHeight: number = 0;
  @observable scrollviewHeight: number = 0;

  // userinfo
  @observable loggedIn: boolean = false;
  @observable isSeller: boolean = false;
  @observable userEmail: string = '';

  // test
  @observable count = 0;
}

export const mainStoreContext = createContext(new MainStore());