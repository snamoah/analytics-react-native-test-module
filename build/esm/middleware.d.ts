import { Context, Integrations, JsonMap } from './bridge';
import { NativeWrapper } from './wrapper';
export interface MiddlewarePayload<T extends string, D extends {}> {
    type: T;
    data: D;
    context: Context;
    next(context?: Partial<Context>): void;
    next(context?: Partial<Context>, data?: D): void;
}
export interface TrackPayload extends MiddlewarePayload<'track', {
    event: string;
    properties: JsonMap;
    integrations: Integrations;
}> {
}
export interface ScreenPayload extends MiddlewarePayload<'screen', {
    name: string;
    properties: JsonMap;
    integrations: Integrations;
}> {
}
export interface IdentifyPayload extends MiddlewarePayload<'identify', {
    user: string;
    traits: JsonMap;
    integrations: Integrations;
}> {
}
export interface GroupPayload extends MiddlewarePayload<'group', {
    groupId: string;
    traits: JsonMap;
    integrations: Integrations;
}> {
}
export interface AliasPayload extends MiddlewarePayload<'alias', {
    newId: string;
    integrations: Integrations;
}> {
}
export declare type Payload = TrackPayload | IdentifyPayload | ScreenPayload | GroupPayload | AliasPayload;
export declare type Middleware = (payload: Payload) => void | Promise<void>;
export declare type PayloadFromType<T> = Extract<Payload, {
    type: T;
}>;
export declare class MiddlewareChain {
    private readonly wrapper;
    private readonly middlewares;
    constructor(wrapper: NativeWrapper<any>);
    add(middleware: Middleware): void;
    run<T extends Payload['type'], P extends PayloadFromType<T>>(type: T, data: P['data']): Promise<void>;
    private exec;
}
