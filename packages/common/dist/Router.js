"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var react_native_1 = require("react-native");
var MainStore_1 = require("./store/MainStore");
var RouteMain_1 = require("./modules/RouteMain");
var RouteLogin_1 = require("./modules/RouteLogin");
var RouteMap_1 = require("./modules/RouteMap");
var mobx_react_lite_1 = require("mobx-react-lite");
exports.Router = mobx_react_lite_1.observer(function () {
    var mainStore = react_1.useContext(MainStore_1.mainStoreContext);
    var currentPage = mainStore.currentPage;
    console.log(mainStore.currentPage);
    function routePage(currentPage) {
        if (currentPage === 'mainPage') {
            return (react_1.default.createElement(RouteMain_1.RouteMain, null));
        }
        else if (currentPage === 'loginPage') {
            return (react_1.default.createElement(RouteLogin_1.RouteLogin, null));
        }
        else if (currentPage === 'mapPage') {
            return (react_1.default.createElement(RouteMap_1.RouteMap, null));
        }
        else {
            return (react_1.default.createElement(react_native_1.View, null,
                react_1.default.createElement(react_native_1.Text, null, "wrong value")));
        }
    }
    return (react_1.default.createElement(react_native_1.View, null, routePage(currentPage)));
});
