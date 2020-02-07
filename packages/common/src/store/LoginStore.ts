import { observable } from 'mobx';
import { createContext } from 'react';

export type loginCurrentPage = 'login' | 'signup';

class LoginStore {
  // route info
  @observable loginCurrentPage: loginCurrentPage = 'login';
  @observable responsedata: string = '';

  // Login info
  @observable userEmail: string = '';
  @observable pass: string = '';

  // Signup info
  @observable signupEmail: string = '';
  @observable signupPass: string = '';
  @observable signupPass2: string = '';
  @observable signupName: string = '';
}

export const loginStoreContext = createContext(new LoginStore());