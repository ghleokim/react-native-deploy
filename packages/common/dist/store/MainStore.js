"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var mobx_1 = require("mobx");
var react_1 = require("react");
var MainStore = /** @class */ (function () {
    function MainStore() {
        // global setting
        this.proxy = 'http://70.12.246.0:8001';
        this.currentPage = 'mainPage';
        this.screenHeight = 0;
        this.footerHeight = 0;
        this.scrollviewHeight = 0;
        // userinfo
        this.loggedIn = false;
        this.isSeller = false;
        this.userEmail = '';
        // test
        this.count = 0;
    }
    __decorate([
        mobx_1.observable
    ], MainStore.prototype, "proxy", void 0);
    __decorate([
        mobx_1.observable
    ], MainStore.prototype, "currentPage", void 0);
    __decorate([
        mobx_1.observable
    ], MainStore.prototype, "screenHeight", void 0);
    __decorate([
        mobx_1.observable
    ], MainStore.prototype, "footerHeight", void 0);
    __decorate([
        mobx_1.observable
    ], MainStore.prototype, "scrollviewHeight", void 0);
    __decorate([
        mobx_1.observable
    ], MainStore.prototype, "loggedIn", void 0);
    __decorate([
        mobx_1.observable
    ], MainStore.prototype, "isSeller", void 0);
    __decorate([
        mobx_1.observable
    ], MainStore.prototype, "userEmail", void 0);
    __decorate([
        mobx_1.observable
    ], MainStore.prototype, "count", void 0);
    return MainStore;
}());
exports.mainStoreContext = react_1.createContext(new MainStore());
