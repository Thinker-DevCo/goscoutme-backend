export interface IRouter {
  method: Methods;
  path: string;
  handlerName: string | symbol;
  requestBodyDto?: Type<any> | any;
  responseBodyDto?: Type<any> | any;
}