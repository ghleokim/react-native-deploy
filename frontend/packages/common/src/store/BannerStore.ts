import { observable } from 'mobx';
import { createContext } from 'react';

class BannerStore{

    @observable screenWidth: number = 0;
    @observable screenHeight: number = 0;
    @observable footerHeight: number = 0;
    @observable headerHeight: number = 0;
    @observable scrollviewHeight: number = 0;
  
    @observable pageIndex: number = 0;
    @observable active: Boolean = false;

}

export const BannerStoreContext = createContext(new BannerStore());