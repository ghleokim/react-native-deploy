"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __importStar(require("react"));
var react_1 = require("react");
var react_native_1 = require("react-native");
var MainStore_1 = require("../store/MainStore");
var mobx_react_lite_1 = require("mobx-react-lite");
exports.RouteMap = mobx_react_lite_1.observer(function () {
    var mainStore = react_1.useContext(MainStore_1.mainStoreContext);
    var currentPage = mainStore.currentPage;
    return (React.createElement(react_native_1.View, null,
        React.createElement(react_native_1.Text, { style: styles.sectionTitle }, currentPage),
        React.createElement(react_native_1.Text, { style: styles.sectionTitle }, "Step One"),
        React.createElement(react_native_1.Text, { style: styles.sectionDescription },
            "Edit ",
            React.createElement(react_native_1.Text, { style: styles.highlight }, "App.tsx"),
            " to change this screen and then come back to see your edits."),
        React.createElement(react_native_1.Text, { style: styles.sectionDescription }, mainStore.count),
        React.createElement(react_native_1.Button, { title: "increment", onPress: function () { return mainStore.count++; } }),
        React.createElement(react_native_1.Text, { style: styles.sectionDescription },
            "screen ",
            mainStore.screenHeight)));
});
var styles = react_native_1.StyleSheet.create({
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
    mainBanner: {
        height: 100,
        width: '100%',
        backgroundColor: '#f3f3f3'
    },
    mainBannerImage: {
        height: 100,
        width: '100%',
    },
});
