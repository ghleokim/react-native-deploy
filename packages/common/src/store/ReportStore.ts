import { observable } from 'mobx';
import { createContext } from 'react';

class ReportStore {
  // user current pos
  @observable sellectedClassifiedCode: string = '';
  @observable sellectedString: string = '';
  @observable dropDownState: Boolean = false;
}

export const ReportStoreContext = createContext(new ReportStore());