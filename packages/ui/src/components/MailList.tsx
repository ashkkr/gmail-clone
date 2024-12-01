import {
  Checkbox,
  IconButton,
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
import MarkEmailReadIcon from "@mui/icons-material/MarkEmailRead";

export type MailListProps = {
  id: number;
  subject: string;
  body: string;
  createdAt: string;
};

export function MailList({
  emails,
  handleMarkAsRead,
}: {
  emails: MailListProps[];
  handleMarkAsRead: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    emailIds: readonly number[],
  ) => void;
}) {
  const [selectedRows, setSelectedRows] = useState<readonly number[]>([]);
  const [page, setPage] = useState(0);
  const rowsPerPage = 10;

  const visibleEmails = useMemo(() => {
    return [...emails].slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage,
    );
  }, [emails, page]);

  const handleRowClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    rowId: number,
  ) => {
    let newSelected: readonly number[];
    const selectedIndex = selectedRows.indexOf(rowId);

    if (selectedIndex == -1) {
      newSelected = ([] as readonly number[]).concat(selectedRows, rowId);
    } else {
      newSelected = selectedRows.filter((i) => i != rowId);
    }
    setSelectedRows(newSelected);
  };

  const handleAllSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedRows(emails.map((e) => e.id));
    } else {
      setSelectedRows([]);
    }
  };

  return (
    <Paper>
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>
                <Checkbox
                  onChange={(e) => {
                    handleAllSelected(e);
                  }}
                ></Checkbox>
              </TableCell>
              <TableCell>
                <IconButton onClick={(e) => handleMarkAsRead(e, selectedRows)}>
                  <MarkEmailReadIcon />
                </IconButton>
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
                    <Checkbox
                      size="small"
                      checked={rowSelected}
                      onClick={(e) => handleRowClick(e, emailRow.id)}
                    ></Checkbox>
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
