import { Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { blue } from "@mui/material/colors";

export function BackToInboxButton({ children }: { children: React.ReactNode }) {
  return (
    <Button
      variant="outlined"
      type="button"
      startIcon={<ArrowBackIcon />}
      sx={{
        borderRadius: "3",
        textTransform: "none",
        padding: "8px 16px",
        fontSize: "1rem",
        color: blue[500],
        "&:hover": {
          backgroundColor: blue[50],
        },
      }}
    >
      {children}
    </Button>
  );
}
