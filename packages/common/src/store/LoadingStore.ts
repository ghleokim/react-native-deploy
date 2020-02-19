import { observable, computed, action } from 'mobx';
import { createContext } from 'react';

class LoadingStore {
    @observable loadingCount: number = 0;

    @action
    increase = () => {
        this.loadingCount = this.loadingCount <= 0 
            ? 1 
            : this.loadingCount+1
    }

    @action
    decrease = () => {
        this.loadingCount = this.loadingCount - 1
    }
}

export const LoadingStoreContext = createContext(new LoadingStore());