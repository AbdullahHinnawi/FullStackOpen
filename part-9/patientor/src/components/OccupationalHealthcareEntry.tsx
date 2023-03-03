import React from 'react';
import { Box, Typography } from '@material-ui/core';
import { Diagnosis, Entry, EntryType } from '../types';
import { useStateValue } from '../state';

const OccupationalHealthcareEntry: React.FC<{ entry: Entry }> = ({ entry }) => {
  const [{ diagnoses }] = useStateValue();
  console.log('entry', entry);
  if (entry.type === EntryType.OccupationalHealthcare)
    return (
      <Box style={divStyles}>
        <Typography variant="body1">
          {entry.date}. Entry type: {entry.type}
        </Typography>
        <Typography variant="body1">{entry.description}</Typography>
        <Typography variant="body1">Diagnoses: </Typography>
        {entry.diagnosisCodes &&
          entry.diagnosisCodes.length &&
          diagnoses.map((dc: Diagnosis) => {
            if (entry.diagnosisCodes?.includes(dc.code.toString())) {
              return (
                <Typography key={dc.code} variant="body2">
                  {dc.code}: {dc.name}
                </Typography>
              );
            }
          })}
        {entry.diagnosisCodes && entry.diagnosisCodes.length < 1 && <Typography variant="body2">Not found.</Typography>}
        {(!entry.diagnosisCodes || entry.diagnosisCodes === undefined || entry.diagnosisCodes === null) && (
          <Typography variant="body2">Not found.</Typography>
        )}
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
