import { Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

export function SendEmailButton() {
  return (
    <Button variant="contained" type="submit" endIcon={<SendIcon />}>
      Send
    </Button>
  );
}
