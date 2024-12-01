import prisma, { Email } from "@repo/db";
import { MailList, SearchMail, MailListProps } from "@repo/ui";
import axios from "axios";
import { useRouter } from "next/router";

export default function Home({
  emails,
  params,
}: {
  emails: MailListProps[];
  params: Promise<{ userid: string }>;
}) {
  const router = useRouter();
  const userId = router.query.userid;
  const handleMarkAsRead = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    emailIds: readonly number[],
  ) => {
    try {
      const response = await axios.post(
        "/api/markemailsread",
        { emailIds, userId },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      const data = response.data;
      console.log(data.message);
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
          emails={emails}
          handleMarkAsRead={handleMarkAsRead}
        ></MailList>
      </div>
    </div>
  );
}

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
      return {
        id: e.id,
        subject: e.subject,
        body: e.body,
        createdAt: e.createdAt.toISOString(),
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
