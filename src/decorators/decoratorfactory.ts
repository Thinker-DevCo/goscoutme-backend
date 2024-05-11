import { Methods } from ".";
import { MetadataKeys } from "./metadata.keys";
import { IRouter } from "./types";


export const methodDecoratorFactory = (method: Methods) => {
  return (path: string): MethodDecorator => {
    return (target, propertyKey) => {
      const controllerClass = target.constructor;
      const routers: IRouter[] =   Reflect.hasMetadata(MetadataKeys.ROUTERS, controllerClass) ?
        Reflect.getMetadata(MetadataKeys.ROUTERS, controllerClass) : [];
      routers.push({
        method,
        path,
        handlerName: propertyKey,
      });
      Reflect.defineMetadata(MetadataKeys.ROUTERS, routers, controllerClass);
    }
  }
}

