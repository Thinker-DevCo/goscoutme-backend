import { Route } from "../../decorators/module.decorator";
import { SportsController } from "./sports.controller";

@Route([SportsController])
export class SportsRoutes {
  // Add route logic here if needed
}
