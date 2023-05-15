import getCurrentUser from "@/components/actions/getCurrentUser";
import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();
  const { password } = body;
  if (!password) {
    return NextResponse.error();
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const userPass = await prisma.user.update({
    where: {
      id: currentUser.id,
    },
    data: {
      hashedPassword,
    },
  });

  return NextResponse.json(userPass);
}
