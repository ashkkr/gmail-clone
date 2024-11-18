import prisma, { Email } from "@repo/db";
import { MailList, SearchMail, MailListProps } from "@repo/ui";

export default function Home({ emails }: { emails: MailListProps[] }) {
  return (
    <div>
      <div>
        <SearchMail></SearchMail>
      </div>
      <div>
        <MailList emails={emails}></MailList>
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
