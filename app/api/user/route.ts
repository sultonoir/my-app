import getCurrentUser from "@/components/actions/getCurrentUser";
import bcrypt from "bcrypt";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import prisma from "@/libs/prisma";
import { NextRequest, NextResponse } from "next/server";

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

export const GET = async (req: NextRequest) => {
  try {
    const session = await getSession();

    if (!session?.user?.email) {
      return null;
    }

    const currentUser = await prisma.user.findUnique({
      where: {
        email: session.user.email as string,
      },
    });

    if (!currentUser) {
      return null;
    }
    const safeUser = {
      ...currentUser,
      createdAt: currentUser.createdAt.toISOString(),
      updatedAt: currentUser.updatedAt.toISOString(),
      emailVerified: currentUser.emailVerified?.toISOString() || null,
    };

    return NextResponse.json(safeUser);
  } catch (error) {}
};
