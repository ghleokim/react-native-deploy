/// <reference types="react" />
export declare type currentPage = 'mainPage' | 'loginPage' | 'mapPage';
declare class MainStore {
    proxy: string;
    currentPage: currentPage;
    screenHeight: number;
    footerHeight: number;
    scrollviewHeight: number;
    loggedIn: boolean;
    isSeller: boolean;
    userEmail: string;
    count: number;
}
export declare const mainStoreContext: import("react").Context<MainStore>;
export {};
