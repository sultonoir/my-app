import getCurrentUser from "@/components/actions/getCurrentUser";
import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return NextResponse.error();
  }
  const body = await request.json();
  const { status, listingId } = body;
  if (!status) {
    return NextResponse.error();
  }
  try {
    const properties = await prisma.listing.update({
      where: {
        id: listingId,
      },
      data: {
        status: status,
      },
    });
    return NextResponse.json(properties);
  } catch (error) {
    console.log(error);
  }
}
