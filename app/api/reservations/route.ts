import { NextRequest, NextResponse } from "next/server";

import prisma from "@/libs/prisma";

interface IParams {
  listingId?: string;
  userId?: string;
  authorId?: string;
}

export async function POST(request: Request) {
  const body = await request.json();
  const {
    listingId,
    startDate,
    endDate,
    totalPrice,
    status,
    userId,
    adminCost,
  } = body;

  if (
    !listingId ||
    !startDate ||
    !endDate ||
    !totalPrice ||
    !status ||
    !userId ||
    !adminCost
  ) {
    return NextResponse.error();
  }

  const listingAndReservation = await prisma.listing.update({
    where: {
      id: listingId,
    },
    data: {
      reservations: {
        create: {
          userId,
          startDate,
          endDate,
          totalPrice,
          status,
          adminCost,
        },
      },
    },
  });
  return NextResponse.json(listingAndReservation);
}
