import { getServerSession } from "next-auth/next";

import { authOptions } from "@/pages/api/auth/[...nextauth]";
import prisma from "@/libs/prisma";
import { NextRequest, NextResponse } from "next/server";
export async function getSession() {
  return await getServerSession(authOptions);
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
