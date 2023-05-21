import prisma from "@/libs/prisma";

interface IParams {
  userId?: string;
}

export default async function getNotifications(params: IParams) {
  const { userId } = params;

  const notifications = await prisma.notification.findMany({
    where: {
      listing: {
        userId: userId,
      },
    },
    include: {
      reservation: {
        include: {
          user: true,
        },
      },
      listing: true,
    },
  });
  return notifications;
}
