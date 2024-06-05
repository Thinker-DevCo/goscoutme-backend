import { Express } from "express";
import { GlobalRoutes } from "./decorators";
import { userRoutes } from "./useCases/user/user.route";

@GlobalRoutes([userRoutes])
export class AppGlobalRoutes {
  startModule(app: Express): void {}
}


