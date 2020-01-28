import { observable } from 'mobx';
import { createContext } from 'react';

interface SearchResult {
  [key: string]: Array<{
    truckTitle: ''
  }>
}

class SearchStore {
  // Login info
  @observable proxy: string = 'http://70.12.246.0:8001';
  @observable searchPlaceholder: string = '검색어를 입력해주세요 (\'타코\', \'찹스테이크\', ...)'
  @observable searchKeyword: string = '검색어를 입력해주세요 (\'타코\', \'찹스테이크\', ...)';
  
  @observable searchResult: SearchResult = {};
}

export const searchStoreContext = createContext(new SearchStore());