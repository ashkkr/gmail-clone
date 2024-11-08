import {
  Autocomplete,
  AutocompleteRenderInputParams,
  Box,
  Icon,
  TextField,
} from '@mui/material';

export function SearchMail() {
  return (
    <Box>
      <Autocomplete
        sx={{ width: '20vw' }}
        filterOptions={(x) => x}
        renderInput={(params) => {
          return <TextField {...params} label="Search Mail"></TextField>;
        }}
        freeSolo
        options={['Mail1', 'Mail2', 'Mail3']}></Autocomplete>
    </Box>
  );
}
