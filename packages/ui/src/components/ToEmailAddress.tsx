import { Box, TextField } from "@mui/material";
import { Dispatch, SetStateAction } from "react";

export type ToEmailAddressProps = {
  emailValue: string;
  setToEmailAddress: Dispatch<SetStateAction<string>>;
};

export function ToEmailAddress(props: ToEmailAddressProps) {
  return (
    <Box>
      <TextField
        label={"Recipient Email Address"}
        sx={{ width: "100%" }}
        value={props.emailValue}
        onChange={(e) => props.setToEmailAddress(e.target.value)}
      ></TextField>
    </Box>
  );
}
