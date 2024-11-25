import {
  BackToInboxButton,
  EmailBody,
  EmailComposeWrapper,
  EmailStatusSnackbar,
  EmailSubject,
  SendEmailButton,
  TestText,
  ToEmailAddress,
} from "@repo/ui";
import axios, { AxiosError } from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface IComposeEmail {
  toEmailAddress: string;
  emailSubject: string;
  emailBody: string;
}

type SnackBarMessageType = {
  message: string;
  showSnackbar: boolean;
  isError: boolean;
};

export default function ComposeMail() {
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<IComposeEmail>();
  const [enableSendButton, setEnableSendButton] = useState(true);
  const [snackbarMessage, setSnackbarMessage] = useState<SnackBarMessageType>({
    message: "",
    showSnackbar: false,
    isError: false,
  });

  const emailAddressRegister = register("toEmailAddress", {
    required: "Recipient Email address is required",
    pattern: {
      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      message: "Incorrect recipient Email address",
    },
  });
  const emailSubjectRegiser = register("emailSubject", {
    required: "Email subject is required",
  });
  const emailBodyRegister = register("emailBody", {
    required: "Email body is required",
  });

  const delay = (ms: number) => new Promise((res) => setTimeout(res, 5000));

  const onSubmit: SubmitHandler<IComposeEmail> = async (emailContent) => {
    try {
      setEnableSendButton(false);
      // await delay(5000);
      const response = await axios.post("/api/sendemail", emailContent, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = response.data;

      if (!("message" in data)) {
        throw new Error("Response did not contain message");
      }

      setSnackbarMessage({
        message: String(data.message),
        isError: false,
        showSnackbar: true,
      });
    } catch (e) {
      console.error(e);
      if (e instanceof AxiosError) {
        setSnackbarMessage({
          message: String(e.response?.data?.message) ?? e.message,
          isError: true,
          showSnackbar: true,
        });
      } else {
        setSnackbarMessage({
          message: "Something went wrong",
          isError: true,
          showSnackbar: true,
        });
      }
      setEnableSendButton(true);
    }
  };

  const onCloseSnackBar = () => {
    if (!snackbarMessage.isError) {
      router.push("/home/6");
    }
    setSnackbarMessage({
      message: "",
      isError: false,
      showSnackbar: false,
    });
  };

  return (
    <div>
      <BackToInboxButton>
        <Link href={"/home/6"}>Back to home</Link>
      </BackToInboxButton>
      <form onSubmit={handleSubmit(onSubmit)}>
        <EmailComposeWrapper>
          <ToEmailAddress
            emailAddressRegister={emailAddressRegister}
            isError={errors.toEmailAddress != undefined}
            errorMessage={errors.toEmailAddress?.message}
          ></ToEmailAddress>
          <EmailSubject
            emailSubjectRegister={emailSubjectRegiser}
            isError={errors.emailSubject != undefined}
            errorMessage={errors.emailSubject?.message}
          ></EmailSubject>
          <EmailBody
            emailBodyRegister={emailBodyRegister}
            isError={errors.emailBody != undefined}
            errorMessage={errors.emailBody?.message}
          ></EmailBody>
          <SendEmailButton
            disableSendButton={!enableSendButton}
          ></SendEmailButton>
        </EmailComposeWrapper>
      </form>
      <EmailStatusSnackbar
        isOpen={snackbarMessage.showSnackbar}
        onClose={onCloseSnackBar}
        message={snackbarMessage.message}
      ></EmailStatusSnackbar>
    </div>
  );
}
