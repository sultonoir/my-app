import { NextResponse } from "next/server";

import prisma from "@/libs/prisma";
import getCurrentUser from "@/components/actions/getCurrentUser";

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
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return NextResponse.error();
    }
    const { status, reservationId } = await request.json();

    if (!status || !reservationId) {
      return NextResponse.json({ message: "Tidak ada status" });
    }

    await prisma.reservation.update({
      where: {
        id: reservationId,
      },
      data: {
        status,
        notifi: {
          create: {
            message: "Membuat Reservasi",
          },
        },
        listing: {
          update: {
            user: {
              update: {
                notification: true,
              },
            },
          },
        },
      },
    });

    return NextResponse.json({ message: "success" });
  } catch (err: any) {
    return NextResponse.error();
  }
};
