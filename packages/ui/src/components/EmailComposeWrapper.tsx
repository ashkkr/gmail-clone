import { Box } from "@mui/material";

type EmailComposeWrapperProps = {
  children: React.ReactNode;
};

export function EmailComposeWrapper({ children }: EmailComposeWrapperProps) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        width: "75vw",
        height: "75vh",
        margin: "auto",
        top: "10vh",
        position: "relative",
      }}
    >
      {children}
    </Box>
  );
}
