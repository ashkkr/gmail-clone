import {
  Paper,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from '@mui/material';

type EmailPreview = {
  senderName: string;
  contentPreview: string;
  isRead: boolean;
};

const dummyEmails: EmailPreview[] = [
  {
    senderName: 'Ram Singh',
    contentPreview: 'Hey this is an invitation for my wedding',
    isRead: false,
  },
  {
    senderName: 'Samuel',
    contentPreview:
      'Hey what about the meeting that was happening yesterday evening',
    isRead: false,
  },
];

export function MailList() {
  return (
    <TableContainer component={Paper}>
      <TableBody>
        {dummyEmails.map((email) => {
          return (
            <TableRow>
              <TableCell>{email.senderName}</TableCell>
              <TableCell>{email.contentPreview}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </TableContainer>
  );
}
