import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";

export type MailListProps = {
  id: number | string;
  subject: string;
  body: string;
  createdAt: string;
};

export function MailList({ emails }: { emails: MailListProps[] }) {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableBody>
          {emails.map((email) => {
            return (
              <TableRow key={email.id}>
                <TableCell>{email.subject}</TableCell>
                <TableCell>{email.body}</TableCell>
                <TableCell>{email.createdAt}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
