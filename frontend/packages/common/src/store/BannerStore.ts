import { observable } from 'mobx';
import { createContext } from 'react';

interface Coordidate {
    X: number;
    Y: number;
    timestamp: number;
}

class BannerStore{

    @observable screenWidth: number = 0;
    @observable screenHeight: number = 0;
    @observable footerHeight: number = 0;
    @observable headerHeight: number = 0;
    @observable scrollviewHeight: number = 0;
  
    @observable pageIndex: number = -1;
    @observable active: Boolean = false;

    @observable touchIn: Coordidate = { X: -1, Y: -1, timestamp: 0};
    @observable touchOut: Coordidate = { X: -1, Y: -1, timestamp: 0};
}

export const BannerStoreContext = createContext(new BannerStore());