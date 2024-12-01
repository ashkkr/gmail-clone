import { handleMarkAsReadApiCall } from "@/utils/axios_services";
import prisma from "@repo/db";
import { MailList, MailListProps } from "@repo/ui";
import { notFound } from "next/navigation";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function SentMail({ emails }: { emails: MailListProps[] }) {
  const router = useRouter();
  const [sentEmails, setSentEmails] =
    useState<readonly MailListProps[]>(emails);
  const userId = router.query.userid;
  const handleMarkAsRead = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    emailIds: readonly number[],
  ) => {
    try {
      const data = await handleMarkAsReadApiCall(emailIds, Number(userId));
      let updatedEmails: readonly MailListProps[] = sentEmails.map((email) => {
        if (emailIds.includes(email.id)) {
          return {
            ...email,
            isRead: true,
          };
        } else
          return {
            ...email,
          };
      });
      setSentEmails(updatedEmails);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <MailList
      emails={sentEmails}
      handleMarkAsRead={handleMarkAsRead}
      isSentBox={true}
    ></MailList>
  );
}

export async function getServerSideProps(context: any) {
  try {
    const { userid } = context.params;

    if (!userid) throw new Error("User Id not received");

    const sentMail = await prisma.email.findMany({
      where: {
        fromUserId: Number(userid),
      },
    });

    const mailListProps = sentMail.map((mail): MailListProps => {
      return {
        id: mail.id,
        subject: mail.subject,
        body: mail.body,
        createdAt: mail.createdAt.toString(),
        isRead: true,
      };
    });

    return {
      props: { emails: mailListProps },
    };
  } catch (e) {
    console.error(e);
    return {
      props: {
        notFound: true,
      },
    };
  }
}
