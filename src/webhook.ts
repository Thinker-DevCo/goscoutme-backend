import { Router } from "express";
import express from "express";
import { CheckoutController } from "./useCases/Checkout/checkout.controller";
const webhookrouter = Router();
const storeTransactionController = new CheckoutController();
webhookrouter.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  storeTransactionController.handleChcckoutWebhook
);

export { webhookrouter };