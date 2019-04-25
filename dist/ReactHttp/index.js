"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var React = require("react");
var context_1 = require("./context");
var API_1 = require("./API");
var Cache_1 = require("./Cache");
var DEFAULT_STATE = {
    error: null,
    success: false,
    fetching: false,
    data: null,
};
var Fetch = (function (_super) {
    __extends(Fetch, _super);
    function Fetch(props) {
        var _this = _super.call(this, props) || this;
        _this.generateKey = function () {
            var _a = _this.props, url = _a.url, _b = _a.options, options = _b === void 0 ? {} : _b;
            return url + ", " + (options.method || 'GET');
        };
        _this.resetCache = function () { return Cache_1.Cache.resetCache(); };
        _this.setData = function (data) {
            _this.props.onSuccess && _this.props.onSuccess(data);
            _this.setState(__assign({}, DEFAULT_STATE, { success: true, data: data }));
        };
        _this.setDataFromCache = function (key) {
            var data = Cache_1.Cache.get(key);
            _this.setData(data);
        };
        _this.fetchData = function () {
            var withCache = _this.props.withCache;
            var key = _this.generateKey();
            if (withCache && Cache_1.Cache.has(key)) {
                _this.setDataFromCache(key);
                return;
            }
            _this.fetchFromApi();
        };
        _this.fetchFromApi = function () {
            var _a = _this.props, url = _a.url, _b = _a.options, options = _b === void 0 ? {} : _b, withCache = _a.withCache, onFailure = _a.onFailure;
            var key = _this.generateKey();
            _this.setState(__assign({}, DEFAULT_STATE, { fetching: true }));
            var api = new API_1.API(url, options);
            api
                .send()
                .then(function (data) {
                if (withCache) {
                    Cache_1.Cache.save([key, data]);
                }
                _this.setData(data);
            })
                .catch(function (error) {
                onFailure && onFailure(error);
                _this.setState(__assign({}, DEFAULT_STATE, { error: error }));
            });
        };
        _this.state = {
            error: null,
            success: false,
            fetching: false,
            data: null,
            resetCache: _this.resetCache,
        };
        _this.timeoutId = null;
        return _this;
    }
    Fetch.prototype.componentDidMount = function () {
        var delay = this.props.delay;
        if (delay) {
            this.timeoutId = setTimeout(this.fetchData, delay);
            return;
        }
        this.fetchData();
    };
    Fetch.prototype.componentWillUnmount = function () {
        if (this.timeoutId !== null) {
            clearTimeout(this.timeoutId);
        }
    };
    Fetch.prototype.render = function () {
        return (React.createElement(context_1.HttpContext.Provider, { value: this.state }, typeof this.props.children === 'function'
            ? this.props.children(this.state)
            : this.props.children));
    };
    Fetch.Error = context_1.consumerCreator('error');
    Fetch.Fetching = context_1.consumerCreator('fetching');
    Fetch.Success = context_1.consumerCreator('success');
    return Fetch;
}(React.Component));
exports.Fetch = Fetch;
