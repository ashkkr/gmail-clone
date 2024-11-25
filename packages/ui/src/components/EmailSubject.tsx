import { Box, TextField } from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

export type EmailSubjectProps = {
  emailSubjectRegister: UseFormRegisterReturn<string>;
  isError: boolean;
  errorMessage?: string;
};

export function EmailSubject(props: EmailSubjectProps) {
  const { emailSubjectRegister, isError, errorMessage } = props;
  return (
    <Box>
      <TextField
        label={"Email Subject"}
        placeholder="Enter your subject here"
        sx={{ width: "100%" }}
        {...emailSubjectRegister}
        error={isError}
        helperText={errorMessage}
      ></TextField>
    </Box>
  );
}
