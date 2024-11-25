import { Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

export function SendEmailButton({
  disableSendButton,
}: {
  disableSendButton: boolean;
}) {
  return (
    <Button
      variant="contained"
      type="submit"
      endIcon={<SendIcon />}
      disabled={disableSendButton}
    >
      Send
    </Button>
  );
}
