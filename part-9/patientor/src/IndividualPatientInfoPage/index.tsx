import { Box, Typography } from '@material-ui/core';
import axios from 'axios';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import IndividualEntry from '../components/EntryDetails';
import { apiBaseUrl } from '../constants';
import { setPatient, useStateValue } from '../state';
import { Entry, Patient } from '../types';

const index = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patient }, dispatch] = useStateValue();

  useEffect(() => {
    const fetchPatientById = async (id: string) => {
      try {
        const { data: patient } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );
        dispatch(setPatient(patient));
        console.log('patient', patient);
      } catch (error: unknown) {
        let errorMessage = 'Something went wrong.';
        if (axios.isAxiosError(error) && error.response) {
          // eslint-disable-next-line
          errorMessage += ' Error: ' + error.response.data.message;
        }
        console.error(errorMessage);
      }
    };

    id && fetchPatientById(id);
  }, [id]);

  return (
    <Box style={{ marginTop: '32px' }}>
      <Typography style={{ marginBottom: '16px' }} variant="h3">
        {patient.name}
      </Typography>
      <Typography variant="body1">Gender: {patient.gender}</Typography>
      <Typography variant="body1">SSN: {patient.ssn}</Typography>
      <Typography variant="body1">Occupation: {patient.occupation}</Typography>
      <Typography
        variant="h4"
        style={{ marginTop: '16px', marginBottom: '16px' }}
      >
        Entries
      </Typography>
      <Box>
        {patient.entries.map((e: Entry) => (
          <IndividualEntry key={e.id} entry={e} />
        ))}
      </Box>
    </Box>
  );
};

export default index;
