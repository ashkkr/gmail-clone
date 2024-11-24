import { Box, TextField } from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

export type EmailBodyProps = {
  emailBodyRegister: UseFormRegisterReturn<string>;
};

export function EmailBody(props: EmailBodyProps) {
  const { emailBodyRegister } = props;
  return (
    <Box>
      <TextField
        label={"Email Body"}
        multiline
        fullWidth
        placeholder="Write your email..."
        rows={15}
        sx={{ width: "100%" }}
        {...emailBodyRegister}
      ></TextField>
    </Box>
  );
}
