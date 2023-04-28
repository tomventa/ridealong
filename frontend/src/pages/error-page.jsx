import React from 'react';
import { Box, Typography } from '@mui/material';
import { purple } from '@mui/material/colors';
import { useRouteError } from "react-router-dom";

const primary = purple[500]; // #f44336

export default function ErrorPage() {
    const error = useRouteError();
    console.error(error);

    return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        minHeight: '100vh',
        backgroundColor: primary,
      }}
    >
      <Typography variant="h1" style={{ color: 'white' }}>
        404
      </Typography>
      <Typography variant="h6" style={{ color: 'white' }}>
        La pagina che stai cercando non esiste.
      </Typography>
        <Typography variant="h6" style={{ color: 'white' }}>
            {error.statusText || error.message}
      </Typography>
    </Box>
  );
}
