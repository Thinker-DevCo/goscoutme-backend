import { Controller, Post, Get, Put, Delete } from "../../decorators";
import { NextFunction, Request, Response } from "express";
import { CreateCheckoutDto, UpdateCheckoutDto } from "./dto";
import { CheckoutUseCase } from "./checkout.service";
import { stripeClient } from "../../providers/stripe/client";
import { Authenticated } from "../../decorators/Security.decorator";

interface IRequest {
  plan_id: number
}
interface IWebhookRequest {
  plan_id: number;
  end_date: Date
}
@Controller('/checkout', '1')
export class CheckoutController {
  @Authenticated()
  @Post("")
  async handleCreatecheckout(request: Request<{}, {},IRequest, CreateCheckoutDto>, response: Response) {
    const user_id = request.user.data.user.id
    console.log(user_id)
    const session =  await new CheckoutUseCase().executeCreateCheckout(request.body, user_id)

    return response.json(session)
  }

 
  async handleChcckoutWebhook(request: Request<{}, {}>, response: Response, next: NextFunction) {
    const sig = request.headers["stripe-signature"];
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
    let event;

    try {
      event = stripeClient.webhooks.constructEvent(
        request.body,
        sig,
        endpointSecret
      );
    } catch (err) {
      console.error("Webhook error:", err.message);
      return response.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;

      const plan_id = session.metadata.plan_id;
      const user_id = session.metadata.user_id;
      const end_date = new Date();
      end_date.setDate(end_date.getDate() + 30);
      const end_date_str = end_date.toISOString(); 

      try {
        const transaction = await new CheckoutUseCase().executeCheckoutWebhook(+plan_id, end_date_str, user_id)
  

        return response.status(200).json(transaction);
      } catch (error) {
        console.error(error);
        next(error);
      }
    
  }
}


}
