"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
exports.HttpContext = React.createContext(null);
var HttpContextConsumer = exports.HttpContext.Consumer;
exports.throwIfNoContext = function (contextValue) {
    if (!contextValue) {
        throw new Error('ReactHttp compound components must be rendered insisde a provider i.e ReactHttp');
    }
};
exports.consumerCreator = function (prop) {
    var Phase = function (_a) {
        var children = _a.children;
        return (React.createElement(HttpContextConsumer, null, function (contextValue) {
            exports.throwIfNoContext(contextValue);
            if (!contextValue[prop]) {
                return null;
            }
            return typeof children === 'function'
                ? children(contextValue)
                : children;
        }));
    };
    Phase.displayName = "Fetch(" + prop + "Phase)";
    return Phase;
};
