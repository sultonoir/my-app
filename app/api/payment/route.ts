import getCurrentUser from "@/components/actions/getCurrentUser";
import getReservations from "@/components/actions/getReservations";
import { stripe } from "@/libs/stripe";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return NextResponse.error();
  }
  const [reservations] = await getReservations({ authorId: currentUser.id });
  const body = await request.json();
  const { totalPrice, title, image, status } = body;
  try {
    const successUrl = `http://localhost:3000/api/success`;
    const cancelUrl = `http://localhost:3000/api/cancel`;

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
              name: title,
              images: image,
            },
            unit_amount: totalPrice * 100,
          },
          quantity: 1,
        },
      ],
      metadata: {
        userId: currentUser.id,
        reservationId: reservations.id,
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
