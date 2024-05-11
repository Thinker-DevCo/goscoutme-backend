import { Express } from "express";
import { MetadataKeys } from "./metadata.keys";
import { IRouter } from "./types";



export function Route(controllers: any[]): ClassDecorator {
    return function (target: any) {
        target.prototype.startModule = (app: Express) => {

            setupRoutes(app, controllers);
        };
    };
}

export function GlobalRoutes(modules: any[]): ClassDecorator {
  return function (target: any) {
      // Define a startModule method on the target class
      target.prototype.startModule = (app: Express) => {
          // Initialize each provided module
          modules.forEach(moduleClass => {
              const moduleInstance = new moduleClass();
              // Check if the module instance has a `startModule` method
              if (typeof moduleInstance.startModule === 'function') {
                  // Initialize the module, passing the Express app instance
                  moduleInstance.startModule(app);
              }
          });
      };
  };
}
export function setupRoutes(app: Express, controllers: any[]) {
  controllers.forEach(controllerClass => {

      const basePath = Reflect.getMetadata(MetadataKeys.BASE_PATH, controllerClass) || '';
      const version = Reflect.getMetadata(MetadataKeys.VERSION, controllerClass);


      const processedBasePath = basePath.startsWith('/') ? basePath : `/${basePath}`;


      let fullBasePath = processedBasePath;
      if (version) {
          fullBasePath = `/api/v${version}${processedBasePath}`;
      }


      const instance = new controllerClass();

      const routers: IRouter[] = Reflect.getMetadata(MetadataKeys.ROUTERS, controllerClass) || [];


      routers.forEach(({ method, path, handlerName }) => {

          const processedPath = path.startsWith('/') ? path : `/${path}`;

          const routePath = `${fullBasePath}${processedPath}`;

          const handler = instance[handlerName].bind(instance);

          app[method.toLowerCase()](routePath, handler);
      });
  });
}