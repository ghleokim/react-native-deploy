import { observable } from 'mobx';
import { createContext } from 'react';

class SellerMapStore {
  // user current pos
  @observable center = {
    lat: 37.3595704,
    lng: 127.105399,
    _lat: 37.3595704,
    _lng: 127.105399
  }
  @observable.ref userCenter = {
  }
  @observable zoom = 14
  @observable mapPosition = {}

  @observable myPosState:boolean = false;
  
  //test
  @observable reftest: any;
}

export const SellerMapStoreContext = createContext(new SellerMapStore());