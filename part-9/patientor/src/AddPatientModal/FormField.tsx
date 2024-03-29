import { useState } from 'react';
import { ErrorMessage, Field, FieldProps, FormikProps } from 'formik';
import { Select, FormControl, MenuItem, TextField as TextFieldMUI, Typography, Box } from '@material-ui/core';
import { Diagnosis, Gender } from '../types';
import { InputLabel } from '@material-ui/core';
import Input from '@material-ui/core/Input';
import { EntryTypeOption, HealthCheckRatingOption } from '../IndividualPatientInfoPage/AddEntryModal/AddEntryForm';

// structure of a single option
export type GenderOption = {
  value: Gender;
  label: string;
};

// props for select field component
type SelectFieldProps = {
  name: string;
  label: string;
  options: GenderOption[] | EntryTypeOption[] | HealthCheckRatingOption[];
};

const FormikSelect = ({ field, ...props }: FieldProps) => <Select {...field} {...props} />;

export const SelectField = ({ name, label, options }: SelectFieldProps) => (
  <Box sx={{ mt: 3, mb: 3 }}>
    <InputLabel>{label}</InputLabel>
    <Field fullWidth style={{ marginBottom: '0.5em' }} label={label} component={FormikSelect} name={name}>
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label || option.value}
        </MenuItem>
      ))}
    </Field>
  </Box>
);

interface TextProps extends FieldProps {
  label: string;
  placeholder: string;
}

export const TextField = ({ field, label, placeholder }: TextProps) => (
  <div style={{ marginBottom: '1em' }}>
    <TextFieldMUI fullWidth label={label} placeholder={placeholder} {...field} />
    <Typography variant="subtitle2" style={{ color: 'red' }}>
      <ErrorMessage name={field.name} />
    </Typography>
  </div>
);

/*
  for exercises 9.24.-
*/
interface NumberProps extends FieldProps {
  label: string;
  min: number;
  max: number;
}

export const NumberField = ({ field, label, min, max }: NumberProps) => {
  const [value, setValue] = useState<number>();

  return (
    <div style={{ marginBottom: '1em' }}>
      <TextFieldMUI
        fullWidth
        label={label}
        placeholder={String(min)}
        type="number"
        {...field}
        value={value}
        onChange={(e) => {
          const value = parseInt(e.target.value);
          if (value === undefined) return;
          if (value > max) setValue(max);
          else if (value <= min) setValue(min);
          else setValue(Math.floor(value));
        }}
      />
      <Typography variant="subtitle2" style={{ color: 'red' }}>
        <ErrorMessage name={field.name} />
      </Typography>
    </div>
  );
};

export const DiagnosisSelection = ({
  diagnoses,
  setFieldValue,
  setFieldTouched,
}: {
  diagnoses: Diagnosis[];
  setFieldValue: FormikProps<{ diagnosisCodes: string[] }>['setFieldValue'];
  setFieldTouched: FormikProps<{ diagnosisCodes: string[] }>['setFieldTouched'];
}) => {
  const [selectedDiagnoses, setDiagnoses] = useState<string[]>([]);
  const field = 'diagnosisCodes';
  const onChange = (data: string[]) => {
    setDiagnoses([...data]);
    setFieldTouched(field, true);
    setFieldValue(field, [...data]);
  };

  const stateOptions = diagnoses.map((diagnosis) => ({
    key: diagnosis.code,
    text: `${diagnosis.name} (${diagnosis.code})`,
    value: diagnosis.code,
  }));

  return (
    <FormControl style={{ width: 552, marginBottom: '30px' }}>
      <InputLabel>Diagnoses</InputLabel>
      <Select
        multiple
        value={selectedDiagnoses}
        onChange={(e) => onChange(e.target.value as string[])}
        input={<Input />}
      >
        {stateOptions.map((option) => (
          <MenuItem key={option.key} value={option.value}>
            {option.text}
          </MenuItem>
        ))}
      </Select>
      <ErrorMessage name={field} />
    </FormControl>
  );
};
interface DateProps extends FieldProps {
  label: string;
}

export const DateField = ({ label, field }: DateProps) => {
  return (
    <div style={{ marginBottom: '1em' }}>
      <TextFieldMUI
        fullWidth
        label={label}
        type="date"
        {...field}
        variant="outlined"
        InputLabelProps={{ shrink: true }}
      />
    </div>
  );
};
