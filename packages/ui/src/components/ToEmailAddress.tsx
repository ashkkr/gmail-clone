import { Box, TextField } from "@mui/material";
import { forwardRef, Ref } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";

type ToEmailAddressProps = {
  emailAddressRegister: UseFormRegisterReturn<string>;
  isError: boolean;
  errorMessage?: string;
};

export const ToEmailAddress = (props: ToEmailAddressProps) => {
  const { emailAddressRegister, isError, errorMessage } = props;
  return (
    <Box>
      <TextField
        label={"Recipient Email Address"}
        sx={{ width: "100%" }}
        {...emailAddressRegister}
        error={isError}
        helperText={errorMessage}
      ></TextField>
    </Box>
  );
};
