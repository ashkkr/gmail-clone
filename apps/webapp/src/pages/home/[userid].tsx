import { handleMarkAsReadApiCall } from "@/utils/axios_services";
import { getTimeSince } from "@/utils/general";
import prisma, { Email } from "@repo/db";
import { MailList, SearchMail, MailListProps } from "@repo/ui";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Home({ emails }: { emails: MailListProps[] }) {
  const router = useRouter();
  const userId = router.query.userid;
  const [emailsState, setEmailsState] =
    useState<readonly MailListProps[]>(emails);

  const handleMarkAsRead = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    emailIds: readonly number[],
  ) => {
    try {
      const data = await handleMarkAsReadApiCall(emailIds, Number(userId));

      let updatedEmails: readonly MailListProps[] = emailsState.map((email) => {
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
      console.log(updatedEmails.length);
      setEmailsState(updatedEmails);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <div>
        <SearchMail></SearchMail>
      </div>
      <div>
        <MailList
          emails={emailsState}
          handleMarkAsRead={handleMarkAsRead}
        ></MailList>
      </div>
    </div>
  );
}
Home.Auth = true;

export async function getServerSideProps(context: any) {
  try {
    const { userid } = context.params;
    if (!userid || typeof userid != "string")
      throw new Error("Incorrect user id");

    const emails = await prisma.email.findMany({
      where: {
        toUserId: Number(userid),
      },
    });

    const emailProps = emails.map((e): MailListProps => {
      const createdSince = getTimeSince(new Date(e.createdAt));
      return {
        id: e.id,
        subject: e.subject,
        body: e.body,
        createdAt: createdSince,
        isRead: e.isRead,
      };
    });
    return {
      props: {
        emails: emailProps,
      },
    };
  } catch (e) {
    const caughtError = e as Error;
    console.log(e);
    return {
      props: {
        notFound: true,
      },
    };
  }
}
