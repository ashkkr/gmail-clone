import { Box, TextField } from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

export type EmailBodyProps = {
  emailBodyRegister: UseFormRegisterReturn<string>;
  isError: boolean;
  errorMessage?: string;
};

export function EmailBody(props: EmailBodyProps) {
  const { emailBodyRegister, isError, errorMessage } = props;

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key == "Tab") {
      e.preventDefault();
      const target = e.target as HTMLTextAreaElement;
      const start = target.selectionStart;
      const end = target.selectionEnd;

      target.value =
        target.value.substring(0, start) + "\t" + target.value.substring(end);
      target.selectionStart = target.selectionEnd = start + 1;
    }
  };

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
        error={isError}
        helperText={errorMessage}
        slotProps={{
          input: {
            onKeyDown: handleKeyDown,
          },
        }}
      ></TextField>
    </Box>
  );
}
