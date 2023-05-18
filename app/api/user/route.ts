import getCurrentUser from "@/components/actions/getCurrentUser";
import bcrypt from "bcrypt";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function getSession() {
  return await getServerSession(authOptions);
}

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();
  const { image, name, description, password } = body;

  if (!image && !name && !description && !password) {
    return NextResponse.error();
  }

  const dataToUpdate: any = {};

  if (image) {
    dataToUpdate.image = image;
  }

  if (name) {
    dataToUpdate.name = name;
  }

  if (description) {
    dataToUpdate.description = description;
  }

  if (password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    dataToUpdate.hashedPassword = hashedPassword;
  }

  const user = await prisma.user.update({
    where: {
      id: currentUser.id,
    },
    data: dataToUpdate,
  });

  return NextResponse.json(user);
}
