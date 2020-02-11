import { observable } from 'mobx';
import { createContext } from 'react';

class MapStore {
  // user current pos
  @observable center = {
  }
  @observable.ref markers = []
  @observable.ref markerData = {}
  @observable.ref userCenter = {
  }
  @observable zoom = 14
  @observable bounds = {
  }
  @observable mapPosition = {}
  @observable fabtop;
  @observable mapHeight = "400px"

  @observable myPosState : boolean = false;

  @observable listState = false;
  @observable selectedId: number = -1;
  
  @observable loading: boolean = true;
  @observable boundsChanged: boolean = false;

  //test
  @observable reftest: any;
  @observable stat: number = -1;
}

export const MapStoreContext = createContext(new MapStore());