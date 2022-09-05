import React from 'react';
import { Box, Typography } from '@material-ui/core';
import { Entry, EntryType } from '../types';
import HealthRatingAsIcon from './HealthRatingAsIcon';

type HealthCheckEntryProps = {
  entry: Entry;
};

const HealthCheckEntry: React.FC<HealthCheckEntryProps> = ({ entry }) => {
  console.log('HealthCheckEntry', entry);

  if (entry.type === EntryType.HealthCheck)
    return (
      <Box style={divStyles}>
        <Typography variant="body1">
          {entry.date}. Entry type: {entry.type}
        </Typography>
        <Typography variant="body1">{entry.description}</Typography>
        <HealthRatingAsIcon healthRating={entry.healthCheckRating} />
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

export default HealthCheckEntry;