import {
  EmailBody,
  EmailComposeWrapper,
  EmailSubject,
  SendEmailButton,
  ToEmailAddress,
} from "@repo/ui";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface IComposeEmail {
  toEmailAddress: string;
  emailSubject: string;
  emailBody: string;
}

export default function ComposeMail() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<IComposeEmail>();

  const emailAddressRegister = register("toEmailAddress", {
    required: true,
    pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  });
  const emailSubjectRegiser = register("emailSubject");
  const emailBodyRegister = register("emailBody");
  const onSubmit: SubmitHandler<IComposeEmail> = (data) => {
    console.log(data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <EmailComposeWrapper>
          <ToEmailAddress
            emailAddressRegister={emailAddressRegister}
          ></ToEmailAddress>
          <EmailSubject
            emailSubjectRegister={emailSubjectRegiser}
          ></EmailSubject>
          <EmailBody emailBodyRegister={emailBodyRegister}></EmailBody>
          <SendEmailButton></SendEmailButton>
        </EmailComposeWrapper>
      </form>
    </div>
  );
}
