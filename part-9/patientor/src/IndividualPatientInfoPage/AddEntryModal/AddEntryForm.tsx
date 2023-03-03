import { useState } from 'react';
import { Grid, Button, Typography, Box } from '@material-ui/core';
import { Field, Formik, Form } from 'formik';

import { Discharge, EntryFormValues, EntryType, HealthCheckRating } from '../../types';
import { DateField, DiagnosisSelection, SelectField, TextField } from '../../AddPatientModal/FormField';
import { useStateValue } from '../../state/state';

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

export type EntryTypeOption = {
  value: EntryType;
  label: string;
};

const entryTypeOptions: EntryTypeOption[] = [
  { value: EntryType.HealthCheck, label: 'Health Check' },
  { value: EntryType.Hospital, label: 'Hospital' },
  {
    value: EntryType.OccupationalHealthcare,
    label: 'Occupational Health Care',
  },
];

export type HealthCheckRatingOption = {
  value: HealthCheckRating;
  label: string;
};

const HealthCheckRatingOptions: HealthCheckRatingOption[] = [
  { value: HealthCheckRating.CriticalRisk, label: 'Critical Risk' },
  { value: HealthCheckRating.Healthy, label: 'Healthy' },
  { value: HealthCheckRating.HighRisk, label: 'High Risk' },
  { value: HealthCheckRating.LowRisk, label: 'Low Risk' },
];

const initialDischarge: Discharge = {
  date: '',
  criteria: '',
};

export const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
  const [currentEntryType, setCurrentEntryType] = useState(EntryType.HealthCheck);
  const [{ diagnoses }] = useStateValue();

  // console.log('diagnoses', diagnoses);
  const currentDateArray = new Date().toISOString().split('T');

  return (
    <Formik
      initialValues={{
        // basic fields
        description: '',
        date: currentDateArray[0],
        specialist: '',
        diagnosisCodes: [],
        type: EntryType.HealthCheck,
        // Health Check fields
        healthCheckRating: HealthCheckRating.Healthy,
        // Hospital fields
        discharge: initialDischarge,
        // Occupational Health Care fields
        employerName: '',
        // not required
        sickLeave: {
          startDate: '',
          endDate: '',
        },
      }}
      onSubmit={onSubmit}
      validate={(values) => {
        console.log('values', values);
        const requiredError = 'Field is required';
        const errors: { [field: string]: string } = {};
        // console.log('Errors');
        // console.log(errors);
        setCurrentEntryType(values.type);
        if (!values.date) {
          errors.date = 'Date is required';
        }
        if (!values.specialist) {
          errors.specialist = 'Specialist is required';
        }
        if (!values.description) {
          errors.description = 'Description is required';
        }
        // Hospital fields
        if (values.type === EntryType.Hospital && !values.discharge?.criteria) {
          errors['discharge.criteria'] = 'Discharge criteria is required';
        }
        if (values.type === EntryType.Hospital && !values.discharge?.date) {
          errors.dischargeDate = 'Discharge date is required';
        }
        // Occupational Health Care fields
        if (values.type === EntryType.OccupationalHealthcare && !values.employerName) {
          errors.employerName = requiredError;
        }
        return errors;
      }}
    >
      {({ isValid, dirty, values, touched, setFieldValue, setFieldTouched /*, errors*/ }) => {
        console.log('addEntryForm values: ', values);
        return (
          <Form className="form ui">
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
              style={{ mt: 3, mb: 3 }}
            />
            <Box sx={{ mt: 4 }}>
              <Field name="date" label="Date" component={DateField} style={{ mt: 3, mb: 3 }} />
            </Box>
            <Field
              label="Specialist"
              placeholder="Specialist name"
              name="specialist"
              component={TextField}
              style={{ mt: 3, mb: 3 }}
            />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />
            <SelectField label="Type" name="type" options={entryTypeOptions} />
            {currentEntryType === EntryType.HealthCheck && (
              <SelectField label="Health Check Rating" name="healthCheckRating" options={HealthCheckRatingOptions} />
            )}
            {currentEntryType === EntryType.Hospital && (
              <Grid container spacing={2}>
                <Grid item xs={8}>
                  {console.log('touched', touched)}
                  <Field
                    label="Discharge Criteria"
                    placeholder="Discharge csriteria"
                    name="discharge.criteria"
                    component={TextField}
                    style={{ mt: 3, mb: 3 }}
                  />
                  {touched.discharge?.criteria && !values.discharge.criteria && (
                    <Typography
                      variant="subtitle2"
                      style={{
                        color: 'red',
                        marginTop: '-16px',
                        marginBottom: '16px',
                      }}
                    >
                      Discharge criteria is required
                    </Typography>
                  )}
                </Grid>
                <Grid item xs={4}>
                  <Field label="Discharge date" name="discharge.date" component={DateField} style={{ mt: 3, mb: 3 }} />
                  {touched.discharge?.date && !values.discharge.date && (
                    <Typography
                      variant="subtitle2"
                      style={{
                        color: 'red',
                        marginTop: '-16px',
                        marginBottom: '16px',
                      }}
                    >
                      Discharge date is required
                    </Typography>
                  )}
                </Grid>
              </Grid>
            )}

            {currentEntryType === EntryType.OccupationalHealthcare && (
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Field
                    label="Employer Name"
                    placeholder="Employer name"
                    name="employerName"
                    component={TextField}
                    style={{ mt: 3, mb: 3 }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Field
                    label="Sick Leave Start Date"
                    name="sickLeave.startDate"
                    component={DateField}
                    style={{ mt: 3, mb: 3 }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Field
                    label="Sick Leave End Date"
                    name="sickLeave.endDate"
                    component={DateField}
                    style={{ mt: 3, mb: 3 }}
                  />
                </Grid>
              </Grid>
            )}

            <Grid style={{ marginTop: 3, marginBottom: 3 }}>
              <Grid item>
                <Button
                  color="secondary"
                  variant="contained"
                  style={{ float: 'left' }}
                  type="button"
                  onClick={onCancel}
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item>
                <Button
                  style={{
                    float: 'right',
                  }}
                  type="submit"
                  variant="contained"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEntryForm;
