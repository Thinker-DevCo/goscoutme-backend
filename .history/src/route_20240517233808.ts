import { Express } from "express";
import { GlobalRoutes } from "./decorators";


@GlobalRoutes([])
export class AppGlobalRoutes {
  startModule(app: Express): void {}
}


