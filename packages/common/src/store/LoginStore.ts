import { observable } from 'mobx';
import { createContext } from 'react';

export type loginCurrentPage = 'login' | 'signup';

class LoginStore {
  // route info
  @observable loginCurrentPage: loginCurrentPage = 'login';
  @observable responsedata: string = '';

  // Login info
  @observable proxy: string = 'http://70.12.246.0:8001';
  @observable userEmail: string = '';
  @observable pass: string = '';

  // Signup info
  @observable signupEmail: string = '';
  @observable signupPass: string = '';
  @observable signupName: string = '';
}

export const loginStoreContext = createContext(new LoginStore());