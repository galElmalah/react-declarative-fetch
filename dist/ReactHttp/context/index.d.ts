import * as React from 'react';
import { FetchState } from '../index';
export declare const HttpContext: React.Context<any>;
declare type requestPhases = 'error' | 'success' | 'fetching';
export declare const throwIfNoContext: (contextValue: FetchState) => void;
export declare const consumerCreator: (prop: requestPhases) => {
    ({ children }: any): JSX.Element;
    displayName: string;
};
export {};
