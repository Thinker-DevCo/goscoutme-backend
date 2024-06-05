import { Route } from "../../decorators/module.decorator";
import { AuthController } from "./auth.controller";

@Route([AuthController])
export class AuthRoutes {
  // Add route logic here if needed
}
