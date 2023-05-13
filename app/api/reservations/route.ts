import { NextResponse } from "next/server";

import prisma from "@/libs/prisma";
import getCurrentUser from "@/components/actions/getCurrentUser";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();
  const { listingId, startDate, endDate, totalPrice, status } = body;

  if (!listingId || !startDate || !endDate || !totalPrice || !status) {
    return NextResponse.error();
  }

  const listingAndReservation = await prisma.listing.update({
    where: {
      id: listingId,
    },
    data: {
      reservations: {
        create: {
          userId: currentUser.id,
          startDate,
          endDate,
          totalPrice,
          status,
        },
      },
    },
  });
  return NextResponse.json(listingAndReservation);
}
