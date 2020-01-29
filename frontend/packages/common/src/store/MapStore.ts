import { observable } from 'mobx';
import { createContext } from 'react';

class MapStore {
  // user current pos
  @observable center = {
    lat: 37.3595704,
    lng: 127.105399
  }
  @observable.ref markers = [
  ]

  @observable.ref userCenter = {
      lat: 37.3595704,
      lng: 127.105399
  }
}

export const MapStoreContext = createContext(new MapStore());