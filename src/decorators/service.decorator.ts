import { uid } from "uid";


export interface Type<T = any> extends Function {
  new (...args: any[]): T;
}
export enum Scope {
  DEFAULT,
  TRANSIENT,
  REQUEST,
}
export interface ScopeOptions {
  scope?: Scope;
  durable?: boolean;
}
export type InjectableOptions = ScopeOptions;
export const INJECTABLE_WATERMARK = '__injectable__';
export const SCOPE_OPTIONS_METADATA = 'scope:options';
export function Injectable(options?: InjectableOptions): ClassDecorator {
  return (target: object) => {
    Reflect.defineMetadata(INJECTABLE_WATERMARK, true, target);
    Reflect.defineMetadata(SCOPE_OPTIONS_METADATA,options, target);
  };
}

export function mixin<T>(mixinClass: Type<T>) {
  Object.defineProperty(mixinClass, 'name', {
    value: uid(21),
  });
  Injectable()(mixinClass);
  return mixinClass;
}