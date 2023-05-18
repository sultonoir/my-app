import { NextRequest, NextResponse } from "next/server";

import prisma from "@/libs/prisma";
import getCurrentUser from "@/components/actions/getCurrentUser";
import { parse } from "url";

interface IParams {
  listingId?: string;
  userId?: string;
  authorId?: string;
}

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

export const GET = async (req: NextRequest) => {
  try {
    const { query } = parse(req.url || "", true);
    const { listingId, userId, authorId } = query as IParams;
    const prismaQuery: any = {};

    if (listingId) {
      prismaQuery.listingId = listingId;
    }

    if (userId) {
      prismaQuery.userId = userId;
    }

    if (authorId) {
      prismaQuery.listing = { userId: authorId };
    }

    const reservations = await prisma.reservation.findMany({
      where: prismaQuery,
      include: {
        listing: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const safeReservations = reservations.map((reservation) => ({
      ...reservation,
      createdAt: reservation.createdAt.toISOString(),
      startDate: reservation.startDate.toISOString(),
      endDate: reservation.endDate.toISOString(),
      listing: {
        ...reservation.listing,
        createdAt: reservation.listing.createdAt.toISOString(),
      },
    }));

    return NextResponse.json(safeReservations);
  } catch (error) {}
};
