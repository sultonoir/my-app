import prisma from "@/libs/prisma";
import { NextRequest, NextResponse } from "next/server";

export interface IListingsParams {
  userId?: string;
  guestCount?: number;
  roomCount?: number;
  bathroomCount?: number;
  startDate?: string;
  endDate?: string;
  locationValue?: string;
  category?: string;
}

export const GET = async (
  req: NextRequest,
  { params }: { params: IListingsParams }
) => {
  try {
    const {
      userId,
      roomCount,
      guestCount,
      bathroomCount,
      locationValue,
      startDate,
      endDate,
      category,
    } = params;

    const prismaQuery: any = {};

    if (userId) {
      prismaQuery.userId = userId;
    }

    if (category) {
      prismaQuery.category = category;
    }

    if (roomCount) {
      prismaQuery.roomCount = {
        gte: +roomCount,
      };
    }

    if (guestCount) {
      prismaQuery.guestCount = {
        gte: +guestCount,
      };
    }

    if (bathroomCount) {
      prismaQuery.bathroomCount = {
        gte: +bathroomCount,
      };
    }

    if (locationValue) {
      prismaQuery.locationValue = locationValue;
    }

    if (startDate && endDate) {
      prismaQuery.NOT = {
        reservations: {
          some: {
            OR: [
              {
                endDate: { gte: startDate },
                startDate: { lte: startDate },
              },
              {
                startDate: { lte: endDate },
                endDate: { gte: endDate },
              },
            ],
          },
        },
      };
    }

    const listings = await prisma.listing.findMany({
      where: prismaQuery,
      orderBy: {
        createdAt: "desc",
      },
    });

    const safeListings = listings
      .filter((listing) => listing.status !== "break")
      .map((listing) => ({
        ...listing,
        createdAt: listing.createdAt.toISOString(),
      }));

    return NextResponse.json(safeListings);
  } catch (error) {
    return NextResponse.error();
  }
};
