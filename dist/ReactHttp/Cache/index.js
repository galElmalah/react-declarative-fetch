"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _a;
exports.Cache = (_a = (function () {
        function Cache() {
        }
        Cache.getPairs = function () {
            return Array.from(Cache.cache.entries());
        };
        Cache.save = function (_a) {
            var key = _a[0], value = _a[1];
            Cache.cache.set(key, value);
        };
        Cache.delete = function (key) {
            Cache.cache.delete(key);
        };
        Cache.get = function (key) {
            return Cache.cache.get(key);
        };
        Cache.has = function (key) {
            return Cache.cache.has(key);
        };
        Cache.resetCache = function () {
            Cache.cache = new Map();
        };
        return Cache;
    }()),
    _a.cache = new Map(),
    _a);
