import { Bridge } from './bridge';
export interface NativeDelegate {
    ready: boolean;
}
export declare type ErrorHandler = (err: Error) => void;
export declare class NativeWrapper<T extends NativeDelegate> {
    private readonly delegate;
    private readonly handler;
    private readonly queue;
    constructor(delegate: T, handler: ErrorHandler, queue?: Array<() => void>);
    /**
     * Run a bridge method.
     * It first waits for `.setup()` or `.useNativeConfiguration()` to be
     * called and redirects exceptions to `handler`.
     * @param method Name of the method to call.
     * @param caller Function with the bridge function as first argument.
     */
    run<M extends keyof Bridge>(method: M, caller: (fn: Bridge[M]) => Promise<void>): Promise<void>;
    /** Waits for `.setup()` or `.useNativeConfiguration()` to be called. */
    wait(): Promise<{} | undefined>;
    ready(): void;
}
