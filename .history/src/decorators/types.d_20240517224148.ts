export interface IRouter {
  method: Methods;
  path: string;
  handlerName: string | symbol;
  requestBodyDto?: Type<any>;
  responseBodyDto?: Type<any>;
}