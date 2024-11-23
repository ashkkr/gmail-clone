import {
  Checkbox,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { useMemo, useState } from "react";

export type MailListProps = {
  id: number;
  subject: string;
  body: string;
  createdAt: string;
};

export function MailList({ emails }: { emails: MailListProps[] }) {
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [page, setPage] = useState(0);
  const rowsPerPage = 10;

  const visibleEmails = useMemo(() => {
    return [...emails].slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage,
    );
  }, [emails, page]);

  return (
    <Paper>
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>
                <Checkbox></Checkbox>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {visibleEmails.map((emailRow) => {
              const rowSelected = selectedRows.includes(emailRow.id);
              return (
                <TableRow
                  key={emailRow.id}
                  sx={{ cursor: "pointer" }}
                  selected={rowSelected}
                >
                  <TableCell>
                    <Checkbox size="small" checked={rowSelected}></Checkbox>
                  </TableCell>
                  <TableCell>Sender Name</TableCell>
                  <TableCell>{emailRow.subject}</TableCell>
                  <TableCell>{emailRow.body}</TableCell>
                  <TableCell>{emailRow.createdAt}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[rowsPerPage]}
        component="div"
        count={emails.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(event, page) => {
          setPage(page);
        }}
      />
    </Paper>
  );
}
