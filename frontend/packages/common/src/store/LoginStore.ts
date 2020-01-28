import { observable } from 'mobx';
import { createContext } from 'react';

class LoginStore {
  // Login info
  @observable proxy: string = 'http://70.12.246.0:8001';
  @observable userEmail: string = '';
  @observable pass: string = '';
  @observable responsedata: string = '';
}

export const loginStoreContext = createContext(new LoginStore());