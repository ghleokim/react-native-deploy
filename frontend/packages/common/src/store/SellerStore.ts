import { observable } from 'mobx';
import { createContext } from 'react';

class SellerStore {

  // Menu
  @observable menus: [] = [];
  
}

export const sellerStoreContext = createContext(new SellerStore());