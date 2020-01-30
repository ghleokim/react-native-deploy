import { observable } from 'mobx';
import { createContext } from 'react';

class SearchStore {
  // Login info
  @observable searchPlaceholder: string = '검색어를 입력해주세요 (\'타코\', \'찹스테이크\', ...)';
  @observable searchKeyword: string;
}

export const searchStoreContext = createContext(new SearchStore());

export type truckStatus = 'closed' | 'open' | 'prepare'

export interface SearchResultItem {
  id: number;
  title: string;
  contents: string;
  imgURL?: string;
  currentStatus: truckStatus;
  latitude?: number;
  longitude?: number;
}

export interface SearchResultType extends Array<SearchResultItem>{}

class SearchResultStore {
  @observable isSelected: boolean = false;
  @observable selectedItem: number;
  @observable searchResult: SearchResultType;
}

export const searchResultContext = createContext(new SearchResultStore());