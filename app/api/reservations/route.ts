import { NextRequest, NextResponse } from "next/server";

import prisma from "@/libs/prisma";

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
    !userId
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
        },
      },
    },
  });
  return NextResponse.json(listingAndReservation);
}

export const PUT = async (request: Request) => {
  const body = await request.json();
  const { status, reservationId } = body;
  if (!status || reservationId) {
    return NextResponse.json({ message: "Tidak ada status" });
  }

  try {
    await prisma.reservation.update({
      where: {
        id: reservationId,
      },
      data: {
        status,
      },
    });

    return NextResponse.json({ message: "success" });
  } catch (err: any) {
    return NextResponse.error();
  }
};
