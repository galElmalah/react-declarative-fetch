"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = require("axios");
var API = (function () {
    function API(url, options) {
        this.url = url;
        this.options = options;
    }
    API.prototype.send = function () {
        return axios_1.default
            .request(__assign({ url: this.url, method: 'GET' }, this.options))
            .then(function (res) { return res.data; });
    };
    return API;
}());
exports.API = API;
