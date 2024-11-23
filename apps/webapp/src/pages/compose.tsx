import {
  EmailBody,
  EmailComposeWrapper,
  EmailSubject,
  SendEmailButton,
  ToEmailAddress,
} from "@repo/ui";
import { useState } from "react";

export default function ComposeMail() {
  const [toEmailAddress, setToEmailAddress] = useState("");
  const [emailSubject, setEmailSubject] = useState("");
  const [emailBody, setEmailBody] = useState("");

  return (
    <div>
      <EmailComposeWrapper>
        <ToEmailAddress
          setToEmailAddress={setToEmailAddress}
          emailValue={toEmailAddress}
        ></ToEmailAddress>
        <EmailSubject
          emailSubjectValue={emailSubject}
          setEmailSubject={setEmailSubject}
        ></EmailSubject>
        <EmailBody
          emailBodyValue={emailBody}
          setEmailBody={setEmailBody}
        ></EmailBody>
        <SendEmailButton></SendEmailButton>
      </EmailComposeWrapper>
    </div>
  );
}
