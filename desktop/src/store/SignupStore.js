import { observable } from 'mobx';
import { createContext } from 'react';

class SignupStore {
  @observable current = 'landing';

  @observable nameInput: false;
  @observable emailInput: false;
  @observable emailState: false;
  @observable passwordInput: false;
  @observable passwordCheckState: false;
  @observable passwordLengthState: false;
  @observable businessState: false;
  
  @observable sellerName = '';
  @observable sellerEmail = '';
  @observable sellerPassword = '';
  @observable sellerPasswordCheck = '';
  @observable sellerBusinessRegistrationNumber = '';
}

export const SignupStoreContext = createContext(new SignupStore());