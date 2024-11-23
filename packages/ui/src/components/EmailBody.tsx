import { Box, TextField } from "@mui/material";
import { Dispatch, SetStateAction } from "react";

export type EmailBodyProps = {
  emailBodyValue: string;
  setEmailBody: Dispatch<SetStateAction<string>>;
};

export function EmailBody(props: EmailBodyProps) {
  return (
    <Box>
      <TextField
        label={"Email Body"}
        multiline
        fullWidth
        placeholder="Write your email..."
        rows={15}
        sx={{ width: "100%" }}
        value={props.emailBodyValue}
        onChange={(e) => props.setEmailBody(e.target.value)}
      ></TextField>
    </Box>
  );
}
