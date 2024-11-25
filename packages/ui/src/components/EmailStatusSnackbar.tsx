import { Box, Snackbar } from "@mui/material";
import { Dispatch, SetStateAction } from "react";

type EmailStatusSnackbarProps = {
  message: string;
  isOpen: boolean;
  onClose: () => void;
};

export function EmailStatusSnackbar(props: EmailStatusSnackbarProps) {
  const { isOpen, message, onClose } = props;

  return (
    <Snackbar
      open={isOpen}
      autoHideDuration={4000}
      message={message}
      onClose={onClose}
    ></Snackbar>
  );
}
