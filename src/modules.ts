import { Express } from "express";
import { GlobalRoutes } from "./decorators";
import { AuthController } from "./useCases/Auth/auth.controller";
import { AuthRoutes } from "./useCases/Auth/auth.route";

@GlobalRoutes([AuthRoutes])
export class AppGlobalRoutes {
  startModule(app: Express): void {}
}


