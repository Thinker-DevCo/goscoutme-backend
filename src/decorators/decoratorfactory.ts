import { Methods } from ".";
import { MetadataKeys } from "./metadata.keys";
import { Type } from "./service.decorator";
import { IRouter } from "./types";


interface MethodDecoratorOptions {
  path: string;
  requestBodyDto?: Type<any> | any;
  responseBodyDto?: Type<any> | any;
}

export const methodDecoratorFactory = (method: Methods) => {
  return (
    pathOrOptions: string | MethodDecoratorOptions,
    requestBodyDto?: Type<any> | any,
    responseBodyDto?: Type<any> | any
  ): MethodDecorator => {
    return (target, propertyKey) => {
      let path: string;
      let requestBodyDtoOption: Type<any> | any | undefined;
      let responseBodyDtoOption: Type<any> | any | undefined;

      if (typeof pathOrOptions === "string") {
        path = pathOrOptions;
        requestBodyDtoOption = requestBodyDto;
        responseBodyDtoOption = responseBodyDto;
      } else {
        path = pathOrOptions.path;
        requestBodyDtoOption = pathOrOptions.requestBodyDto;
        responseBodyDtoOption = pathOrOptions.responseBodyDto;
      }

      const controllerClass = target.constructor;
      const routers: IRouter[] =
        Reflect.hasMetadata(MetadataKeys.ROUTERS, controllerClass)
          ? Reflect.getMetadata(MetadataKeys.ROUTERS, controllerClass)
          : [];
      routers.push({
        method,
        path,
        handlerName: propertyKey,
        requestBodyDto: requestBodyDtoOption,
        responseBodyDto: responseBodyDtoOption,
      });
      Reflect.defineMetadata(MetadataKeys.ROUTERS, routers, controllerClass);
    };
  };
};