import getAdm from "@/components/actions/getAdm";
import prisma from "@/libs/prisma";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { email, name, password } = body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const currentAdmin = await getAdm();
  const user = await prisma.user.create({
    data: {
      email,
      name,
      hashedPassword,
      adminId: currentAdmin.id,
    },
  });
  return NextResponse.json(user);
}
