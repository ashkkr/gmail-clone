import prisma from "@repo/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ message: string }>,
) {
  try {
    const { userId, emailIds } = req.body;

    if (!userId || !emailIds)
      throw new Error("userId or List of email ids not received");

    const user = await prisma.user.findFirst({
      where: {
        id: Number(userId),
      },
    });

    if (!user) {
      throw new Error(`No user with Id ${userId}`);
    }

    const emailsIdsParsed = emailIds.map((e: any) => Number(e));

    await prisma.email.updateMany({
      where: {
        toUserId: Number(userId),
        id: {
          in: emailsIdsParsed,
        },
      },
      data: {
        isRead: true,
      },
    });

    res.json({
      message: "Marked as read",
    });
  } catch (e) {
    res.status(400).json({
      message: "Something went wrong",
    });
  }
}
