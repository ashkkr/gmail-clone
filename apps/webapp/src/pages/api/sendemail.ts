import prisma from "@repo/db";
import { NextApiRequest, NextApiResponse } from "next";

type SendEmailResponse = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SendEmailResponse>,
) {
  const { toEmailAddress, emailSubject, emailBody } = req.body;

  try {
    const missingFieldArray = [
      !toEmailAddress && "Recipient Email address not received",
      !emailSubject && "Email Subject not received",
      !emailBody && "Email body not received",
      typeof toEmailAddress != "string" &&
        "Recipient Email address is not string",
      typeof emailSubject != "string" && "Email subject is not string",
      typeof emailBody != "string" && "Email body is not string",
    ].filter(Boolean);
    if (missingFieldArray.length > 0) {
      throw new Error(
        `Missing fields in request body - ${missingFieldArray.join(", ")}`,
      );
    }

    const toUser = await prisma.user.findFirst({
      where: {
        email: toEmailAddress,
      },
    });

    if (!toUser) throw new Error("Invalid email id");

    await prisma.email.create({
      data: {
        body: emailBody,
        subject: emailSubject,
        toUserId: toUser.id,
        fromUserId: 5,
      },
    });

    res.status(200).json({
      message: "Email sent successfully",
    });
  } catch (e) {
    console.error(e);
    res.status(400).json({
      message: "Unexpected or incomplete request",
    });
  }
}
