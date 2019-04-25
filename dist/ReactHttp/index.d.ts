import * as React from 'react';
interface FetchProps {
    onSuccess?: (data: any) => {};
    onFailure?: (error: any) => {};
    url: string;
    options?: any;
    withCache?: boolean;
    delay?: number;
}
export interface FetchState {
    error: boolean;
    success: boolean;
    fetching: boolean;
    data: any;
    resetCache(): void;
}
export declare class Fetch extends React.Component<FetchProps, FetchState> {
    static Error: {
        ({ children }: any): JSX.Element;
        displayName: string;
    };
    static Fetching: {
        ({ children }: any): JSX.Element;
        displayName: string;
    };
    static Success: {
        ({ children }: any): JSX.Element;
        displayName: string;
    };
    private timeoutId;
    constructor(props: FetchProps);
    componentDidMount(): void;
    componentWillUnmount(): void;
    generateKey: () => string;
    resetCache: () => void;
    setData: (data: any) => void;
    setDataFromCache: (key: string) => void;
    fetchData: () => void;
    fetchFromApi: () => void;
    render(): JSX.Element;
}
export {};
