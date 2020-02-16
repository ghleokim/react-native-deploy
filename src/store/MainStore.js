import { observable } from 'mobx';
import { createContext } from 'react';

class MainStore {
  @observable userEmail = '';
  @observable password = '';
  @observable userName = '';
  @observable isLoggedIn = false;
}

export const MainStoreContext = createContext(new MainStore());