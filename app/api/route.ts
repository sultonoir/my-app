import { stripe } from "@/libs/stripe";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const paymentMethod = await stripe.paymentMethods.list({
      customer: "sulton",
    });
    return NextResponse.json({ paymentMethod });
  } catch (error) {
    console.error(error);
  }
};
