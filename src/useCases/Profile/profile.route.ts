import { Route } from "../../decorators/module.decorator";
import { ProfileController } from "./profile.controller";

@Route([ProfileController])
export class ProfileRoutes {
  // Add route logic here if needed
}
