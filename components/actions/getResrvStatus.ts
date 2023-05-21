import prisma from "@/libs/prisma";
interface IParams {
  listingId?: string;
  userId?: string;
  authorId?: string;
}

export default async function getResrvStatus(params: IParams) {
  const { listingId, userId, authorId } = params;

  const query: any = {};

  if (listingId) {
    query.listingId = listingId;
  }

  if (userId) {
    query.status = "pending";
    query.userId = userId;
  }

  if (authorId) {
    await prisma.user.updateMany({
      where: {
        id: authorId,
      },
      data: {
        notification: false,
      },
    });
    query.status = "success";
    query.listing = { userId: authorId };
  }
  try {
    const reservations = await prisma.reservation.findMany({
      where: query,
      include: {
        listing: true,
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

    return safeReservations;
  } catch (error: any) {
    throw new Error(error);
  }
}
