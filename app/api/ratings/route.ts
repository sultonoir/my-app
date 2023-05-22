import getCurrentUser from "@/components/actions/getCurrentUser";
import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return NextResponse.error();
  }
  const body = await request.json();
  const { listingId, value, description } = body;
  try {
    await prisma.listing.update({
      where: {
        id: listingId,
      },
      data: {
        rating: {
          create: {
            value,
            message: description,
          },
        },
        notifi: {
          create: {
            message: "Memberikan rating",
            guestImage: currentUser.image,
            guestName: currentUser.name,
          },
        },
      },
    });
    return NextResponse.json({ message: "berhasil membuat rating" });
  } catch (err) {
    return NextResponse.error();
  }
}
