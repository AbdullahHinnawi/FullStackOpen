import React from 'react';
import { Box, Typography } from '@material-ui/core';
import { Entry, EntryType } from '../types';

const OccupationalHealthcareEntry: React.FC<{ entry: Entry }> = ({ entry }) => {
  if (entry.type === EntryType.OccupationalHealthcare)
    return (
      <Box style={divStyles}>
        <Typography variant="body1">
          {entry.date}. Entry type: {entry.type}
        </Typography>
        <Typography variant="body1">{entry.description}</Typography>
        <Typography variant="body1">Diagnose by {entry.specialist}</Typography>
      </Box>
    );

  return <></>;
};

const divStyles = {
  marginBottom: '10px',
  border: '1px solid black',
  padding: '10px 5px',
  borderRadius: '5px',
};

export default OccupationalHealthcareEntry;
