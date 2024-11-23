import { Box, TextField } from "@mui/material";
import { Dispatch, SetStateAction } from "react";

export type EmailSubjectProps = {
  emailSubjectValue: string;
  setEmailSubject: Dispatch<SetStateAction<string>>;
};

export function EmailSubject(props: EmailSubjectProps) {
  return (
    <Box>
      <TextField
        label={"Email Subject"}
        placeholder="Enter your subject here"
        sx={{ width: "100%" }}
        value={props.emailSubjectValue}
        onChange={(e) => props.setEmailSubject(e.target.value)}
      ></TextField>
    </Box>
  );
}
