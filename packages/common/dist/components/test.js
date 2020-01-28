"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = __importDefault(require("axios"));
function getHello() {
    axios_1.default.get('http://70.12.247.106:8001/hello')
        .then(function (response) {
        console.log(response);
    })
        .catch(function (error) {
        console.log(error);
    });
}
exports.getHello = getHello;
