import { stripe } from "@/libs/stripe";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { totalPrice, title, image, adminCost, userId, reservationId } = body;
  try {
    const successUrl = `http://localhost:3000/`;
    const cancelUrl = `http://localhost:3000/payment`;

    const checkoutSession = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: "idr",
            product_data: {
              name: title,
              images: image,
            },
            unit_amount: totalPrice * 100,
          },
          quantity: 1,
        },
        {
          price_data: {
            currency: "idr",
            product_data: {
              name: "Biaya admin",
            },
            unit_amount: adminCost * 100,
          },
          quantity: 1,
        },
      ],
      metadata: {
        userId,
        reservationId,
      },
      mode: "payment",
      success_url: successUrl,
      cancel_url: cancelUrl,
    });

    return NextResponse.json({ url: checkoutSession.url });
  } catch (error) {
    console.log(error);
    throw new Error();
  }
}
