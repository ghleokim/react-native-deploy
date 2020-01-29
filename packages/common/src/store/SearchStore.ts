import { observable } from 'mobx';
import { createContext } from 'react';

class SearchStore {
  // Login info
  @observable proxy: string = 'http://70.12.246.0:8001';
  @observable searchPlaceholder: string = '검색어를 입력해주세요 (\'타코\', \'찹스테이크\', ...)';
  @observable searchKeyword: string = '검색어를 입력해주세요 (\'타코\', \'찹스테이크\', ...)';
}

export const searchStoreContext = createContext(new SearchStore());

export type truckStatus = 'closed' | 'open' | 'prepare'

export interface SearchResult {
  id: number;
  title: string;
  description: string;
  imgURL?: string;
  currentStatus: truckStatus;
  latitude?: number;
  longitude?: number;
}

export interface SearchResultItems extends Array<SearchResult>{}

class SearchResultStore {
  @observable isSelected: boolean = false;
  @observable selectedItem: number;
  @observable searchResultItems: SearchResultItems;
}

export const searchResultContext = createContext(new SearchResultStore());