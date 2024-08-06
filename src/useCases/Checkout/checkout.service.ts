import { BaseError, HttpStatusCode } from "../../providers/errorProvider";
import { PrismaService } from "../../providers/prisma/prismaClient";
import { stripeClient } from "../../providers/stripe/client";

interface IRequest {
  plan_id: number
}

class CheckoutUseCase {
  private readonly prisma: PrismaService
  constructor(){
    this.prisma = new PrismaService();
  }
  async executeCreateCheckout({ plan_id }: IRequest, userId: string) {
    const plan = await this.prisma.client.plan.findUnique({
      where: {
        id: +plan_id
      }
    })
    if(!plan) throw new BaseError(
      "NOT_FOUND",
      HttpStatusCode.NOT_FOUND,
      true,
      "The provided plan does not exist"
    );
    const session = await stripeClient.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price: plan.price_id,
          quantity: 1,
        },
      ],
      metadata: {
        plan_id: plan_id,
        user_id: userId,
      },
      mode: "subscription",
      success_url: process.env.STRIPE_SUCCESS_URL,
      cancel_url: process.env.STRIPE_CANCEL_URL,
    });

    if (!session){
      throw new BaseError(
        "FORBIDDEN",
        HttpStatusCode.FORBIDDEN,
        true,
        "could not create session"
      );
    }

    return {
      session: session.url,
    };
    
  }

  async executeCheckoutWebhook(plan_id: number, end_date: string,user_id: string) {
    try{
      const checkout = await this.prisma.client.subscription.create({
        data: {
          plan_id,
          end_date,
          public_id: user_id
        }
      })
      return checkout
    }catch(err){
      console.log(err);
    }
  }
}

export { CheckoutUseCase };
