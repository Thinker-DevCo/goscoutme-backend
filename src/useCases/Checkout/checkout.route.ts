import { Route } from "../../decorators/module.decorator";
import { CheckoutController } from "./checkout.controller";

@Route([CheckoutController])
export class CheckoutRoutes {
  // Add route logic here if needed
}
