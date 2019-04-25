interface Api {
    send(): void;
}
export declare class API implements Api {
    private url;
    private options;
    constructor(url: string, options: any);
    send(): Promise<any>;
}
export {};
