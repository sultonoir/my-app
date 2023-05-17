import prisma from "@/libs/prisma";
import { NextRequest, NextResponse } from "next/server";
export const GET = async (req: NextRequest) => {
  const posts = await prisma.reservation.findMany({});
  return NextResponse.json({ posts });
};
