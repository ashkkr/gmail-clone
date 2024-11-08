import { MailList, SearchMail } from '@repo/ui';

export default function Home() {
  return (
    <div>
      <div>
        <SearchMail></SearchMail>
      </div>
      <div>
        <MailList></MailList>
      </div>
    </div>
  );
}
