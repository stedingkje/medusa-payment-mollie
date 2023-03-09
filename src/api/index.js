import { Router } from "express";

export default (rootDirectory, options) => {
  const router = Router();
  const { createMollieClient } = require("@mollie/api-client");
  const mollieClient = createMollieClient({
    apiKey: options.apiKey,
  });

  router.get("/mollie-payment-methods", async (req, res) => {
    const methods = await mollieClient.methods.list();
    res.json({
      "payment-methods": methods,
    });
  });

  router.get("/mollie-payment-method", async (req, res) => {
    const method = await mollieClient.methods.get(req.query.paymentMethod, {
      include: ["issuers", "pricing"],
    });
    res.json({
      "payment-method": method,
    });
  });

  router.post("/create-payment", async (req, res) => {
    const payment = await mollieClient.payments.create({
      amount: {
        currency: "EUR",
        value: "10.00",
      },
      description: "Order #12345",
      redirectUrl: "https://webshop.example.org/order/12345/",
      webhookUrl: "https://webshop.example.org/payments/webhook/",
      metadata: {
        order_id: "12345",
      },
    });
  });

  return router;
};
