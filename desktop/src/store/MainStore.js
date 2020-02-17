import { observable } from 'mobx';
import { createContext } from 'react';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../components/config/config';

class MainStore {
  @observable userEmail = '';
  @observable password = '';
  @observable userName = '';
  @observable isLoggedIn = false;

  @observable HeaderTextTwo = '수제버거가';
}

export const MainStoreContext = createContext(new MainStore());