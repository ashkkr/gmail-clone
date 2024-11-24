import {
  EmailBody,
  EmailComposeWrapper,
  EmailStatusSnackbar,
  EmailSubject,
  SendEmailButton,
  ToEmailAddress,
} from "@repo/ui";
import axios, { AxiosError } from "axios";
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
  const [showMessage, setShowMessage] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const emailAddressRegister = register("toEmailAddress", {
    required: true,
    pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  });
  const emailSubjectRegiser = register("emailSubject");
  const emailBodyRegister = register("emailBody");
  const onSubmit: SubmitHandler<IComposeEmail> = async (emailContent) => {
    try {
      const response = await axios.post("/api/sendemail", emailContent, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = response.data;

      if (!("message" in data)) {
        throw new Error("Response did not contain message");
      }

      setSnackbarMessage(String(data.message));
      setShowMessage(true);
    } catch (e) {
      console.error(e);
      if (e instanceof AxiosError) {
        setSnackbarMessage(String(e.response?.data?.message) ?? e.message);
      } else {
        setSnackbarMessage("Something went wrong");
      }
      setShowMessage(true);
    }
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
      <EmailStatusSnackbar
        isOpen={showMessage}
        setIsOpen={setShowMessage}
        message={snackbarMessage}
      ></EmailStatusSnackbar>
    </div>
  );
}
