import { observable } from 'mobx';
import { createContext } from 'react';

class MapStore {
  // user current pos
  @observable center = {
    lat: 37.3595704,
    lng: 127.105399
  }
  @observable.ref markers = [
      {}
  ]
  @observable.ref markerData = {}
  @observable.ref userCenter = {
  }
  @observable zoom = 14
  @observable bounds = {
  }
  @observable mapPosition = {}
  @observable fabtop;
  @observable mapHeight = "400px"

  @observable myPosState:boolean = false;
  @observable listState = false
  @observable selectedId: number = -1;
  
  //test
  @observable reftest: any;
  @observable stat: number = -1;
}

export const MapStoreContext = createContext(new MapStore());