import { methodDecoratorFactory } from "./decoratorfactory";

import Controller from "./controller.decorator";
import { GlobalRoutes } from "./module.decorator";
import { Injectable} from "./service.decorator";
export enum Methods {
  GET = 'get',
  POST = 'post',
  PUT= 'put',
  PATCH = "patch",
  DELETE = "delete"
}
export {Controller, GlobalRoutes, Injectable};
export const Get = methodDecoratorFactory(Methods.GET);
export const Post = methodDecoratorFactory(Methods.POST);
export const Put = methodDecoratorFactory(Methods.PUT);
export const Patch = methodDecoratorFactory(Methods.PATCH);
export const Delete = methodDecoratorFactory(Methods.DELETE);