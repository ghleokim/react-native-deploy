"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __importStar(require("react"));
var react_1 = require("react");
var react_native_1 = require("react-native");
var MainStore_1 = require("../store/MainStore");
var LoginForm_1 = __importDefault(require("../components/auth/LoginForm"));
var mobx_react_lite_1 = require("mobx-react-lite");
exports.RouteLogin = mobx_react_lite_1.observer(function () {
    var mainStore = react_1.useContext(MainStore_1.mainStoreContext);
    var currentPage = mainStore.currentPage;
    return (React.createElement(react_native_1.View, null,
        React.createElement(react_native_1.Text, { style: styles.sectionTitle }, currentPage),
        React.createElement(LoginForm_1.default, null)));
});
var styles = react_native_1.StyleSheet.create({
    mainBanner: {
        height: 100,
        width: '100%',
        backgroundColor: '#f3f3f3'
    },
    mainBannerImage: {
        height: 100,
        width: '100%',
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '600'
    }
});
