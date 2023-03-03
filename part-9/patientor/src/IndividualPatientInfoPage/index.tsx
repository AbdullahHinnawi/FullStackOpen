import { Box, Button, Typography } from '@material-ui/core';
import axios from 'axios';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import IndividualEntry from '../components/EntryDetails';
import { apiBaseUrl } from '../constants';
import { setPatient, useStateValue } from '../state';
import { Entry, EntryFormValues, Gender, Patient } from '../types';
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import TransgenderIcon from '@mui/icons-material/Transgender';
import AddEntryModal from './AddEntryModal';

const index = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patient }, dispatch] = useStateValue();

  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>();

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

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewEntry = async (values: EntryFormValues) => {
    try {
      if (id) {
        const { data: newEntry } = await axios.post<Entry>(
          `${apiBaseUrl}/patients/${id}/entries`,
          values
        );
        const updatedPatient: Patient = {
          ...patient,
          entries: [...patient.entries, newEntry],
        };
        dispatch(setPatient(updatedPatient));
        closeModal();
      }
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        console.error(e?.response?.data || 'Unrecognized axios error');
        setError(
          String(e?.response?.data?.error) || 'Unrecognized axios error'
        );
      } else {
        console.error('Unknown error', e);
        setError('Unknown error');
      }
    }
  };

  return (
    <Box style={{ marginTop: '32px' }}>
      <Typography style={{ marginBottom: '16px' }} variant="h3">
        {patient.name}{' '}
        {patient.gender === Gender.Male ? (
          <MaleIcon />
        ) : patient.gender === Gender.Female ? (
          <FemaleIcon />
        ) : (
          <TransgenderIcon />
        )}
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
      <Box sx={{ mb: 4 }}>
        <AddEntryModal
          modalOpen={modalOpen}
          onSubmit={submitNewEntry}
          error={error}
          onClose={closeModal}
        />
        <Button variant="contained" onClick={() => openModal()}>
          Add New Entry
        </Button>
      </Box>
      <Box>
        {patient.entries?.map((e: Entry) => (
          <IndividualEntry key={e.id} entry={e} />
        ))}
      </Box>
    </Box>
  );
};

export default index;
