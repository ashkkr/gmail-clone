import { Box, TextField } from "@mui/material";
import { forwardRef, Ref } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";

type ToEmailAddressProps = {
  emailAddressRegister: UseFormRegisterReturn<string>;
};

export const ToEmailAddress = (props: ToEmailAddressProps) => {
  const { emailAddressRegister } = props;
  return (
    <Box>
      <TextField
        label={"Recipient Email Address"}
        sx={{ width: "100%" }}
        {...emailAddressRegister}
      ></TextField>
    </Box>
  );
};
