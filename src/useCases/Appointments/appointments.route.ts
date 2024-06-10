import { Route } from "../../decorators/module.decorator";
import { AppointmentsController } from "./appointments.controller";

@Route([AppointmentsController])
export class AppointmentsRoutes {
  // Add route logic here if needed
}
