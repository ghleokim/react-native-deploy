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
var react_1 = __importStar(require("react"));
var react_native_1 = require("react-native");
var SignUpForm_1 = __importDefault(require("./components/auth/SignUpForm"));
var Router_1 = require("./Router");
var TruckDetail_1 = __importDefault(require("./components/foodtruckDetail/TruckDetail"));
var mobx_react_lite_1 = require("mobx-react-lite");
var MainStore_1 = require("./store/MainStore");
exports.App = mobx_react_lite_1.observer(function () {
    var mainStore = react_1.useContext(MainStore_1.mainStoreContext);
    mainStore.screenHeight = react_native_1.Dimensions.get('screen').height;
    mainStore.footerHeight = 30;
    mainStore.scrollviewHeight = mainStore.screenHeight - mainStore.footerHeight;
    return (react_1.default.createElement(react_native_1.View, { style: { height: mainStore.screenHeight, flex: 1 } },
        react_1.default.createElement(react_native_1.ScrollView, { style: { height: mainStore.scrollviewHeight, paddingBottom: 30 } },
            react_1.default.createElement(react_native_1.View, { style: styles.sectionContainer },
                react_1.default.createElement(Router_1.Router, null),
                react_1.default.createElement(SignUpForm_1.default, null),
                react_1.default.createElement(TruckDetail_1.default, null))),
        react_1.default.createElement(react_native_1.View, { style: [styles.footer] },
            react_1.default.createElement(react_native_1.TouchableOpacity, { onPress: function () { return mainStore.currentPage = "mainPage"; }, style: { alignItems: "baseline", flex: 1, flexDirection: "row" } },
                react_1.default.createElement(react_native_1.Text, { style: { color: '#FFFFFF' } }, "Main")),
            react_1.default.createElement(react_native_1.TouchableOpacity, { onPress: function () { return mainStore.currentPage = "loginPage"; }, style: { alignItems: "baseline", flex: 1, flexDirection: "row" } },
                react_1.default.createElement(react_native_1.Text, { style: { color: '#FFFFFF' } }, "Login")),
            react_1.default.createElement(react_native_1.TouchableOpacity, { onPress: function () { return mainStore.currentPage = "mapPage"; }, style: { alignItems: "baseline", flex: 1, flexDirection: "row" } },
                react_1.default.createElement(react_native_1.Text, { style: { color: '#FFFFFF' } }, "Map")))));
});
var styles = react_native_1.StyleSheet.create({
    sectionContainer: {
        marginTop: 32,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
    },
    sectionDescription: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: '400',
        alignItems: "center"
    },
    highlight: {
        fontWeight: '700',
    },
    footer: {
        position: 'absolute',
        height: 30,
        bottom: 0,
        right: 0,
        left: 0,
        backgroundColor: '#3f3f3f',
        flexDirection: 'row'
    },
    smallButton: {
        height: 30,
        flex: 1,
        flexDirection: "column"
    }
});
