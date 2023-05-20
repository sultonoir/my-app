import { NextResponse } from "next/server";

import prisma from "@/libs/prisma";
import getCurrentUser from "@/components/actions/getCurrentUser";
import { stripe } from "@/libs/stripe";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();
  const {
    title,
    description,
    img,
    category,
    roomCount,
    bathroomCount,
    location,
    price,
    kids,
    adult,
    baby,
    fasilitas,
    NearestTour,
  } = body;
  const { value } = location;

  const listing = await prisma.listing.create({
    data: {
      title,
      NearestTour,
      kids,
      adult,
      baby,
      description,
      imageSrc: img,
      category,
      roomCount,
      bathroomCount,
      guestCount: adult + baby + kids,
      locationValue: value,
      price: parseInt(price, 10),
      userId: currentUser.id,
      fasilitas,
    },
  });

  await stripe.products.create({
    name: title,
    images: img,
    metadata: {
      userId: currentUser.id,
    },
    default_price_data: price,
  });

  return NextResponse.json(listing);
}
