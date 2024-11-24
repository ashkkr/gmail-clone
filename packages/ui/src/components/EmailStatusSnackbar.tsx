import { Box, Snackbar } from "@mui/material";
import { Dispatch, SetStateAction } from "react";

type EmailStatusSnackbarProps = {
  message: string;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

export function EmailStatusSnackbar(props: EmailStatusSnackbarProps) {
  const { isOpen, message, setIsOpen } = props;

  const closeSnackbar = () => {
    setIsOpen(false);
  };

  return (
    <Snackbar
      open={isOpen}
      autoHideDuration={6000}
      message={message}
      onClose={closeSnackbar}
    ></Snackbar>
  );
}
