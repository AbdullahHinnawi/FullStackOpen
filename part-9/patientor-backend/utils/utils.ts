import { HealthCheckRating, SickLeave } from './../../patientor/src/types';
import { Diagnosis, Discharge, EntryType, EntryWithoutId } from './../types/types';
import { NewPatient, Gender } from '../types/types';

export const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
}

export const parseNameOrOccupation = (userInput: unknown): string => {
    if (!userInput || !isString(userInput)) {
        throw new Error('Incorrect of missing name/occupation');
    }
    return userInput;
}

export const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
}

export const parseDateOfBirth = (dateOfBirth: unknown): string => {
    if (!dateOfBirth || !isString(dateOfBirth) || !isDate(dateOfBirth)) {
        throw new Error('Incorrect or missing date of birth: ' + dateOfBirth);
    }
    return dateOfBirth;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isGender = (param: any): param is Gender => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Object.values(Gender).includes(param)
}

export const parseGender = (gender: unknown): Gender => {
    if (!gender || !isGender(gender)) {
        throw new Error('Incorrect or missing gender: ' + gender);
    }
    return gender;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isEntryType = (param: any): param is EntryType => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Object.values(EntryType).includes(param)
}

export const parseEntryType = (entryType: unknown): EntryType => {
    if (!entryType || !isEntryType(entryType)) {
        throw new Error('Incorrect entry type: ' + entryType);
    }
    return entryType;
}

export const isSsnNumber = (ssn: string): boolean => {
    // Regex pattern for the finnish social security number ex. 123456-123X
    const regexPattern = /^(?!000000)[0-9]{6}-(?!0000)[0-9]{3}[A-Za-z0-9]{1}$/;
    return Boolean(regexPattern.test(ssn));
}

export const parseSsnNumber = (ssn: unknown): string => {
    if (!ssn || !isString(ssn) || !isSsnNumber(ssn)) {
        throw new Error('Incorrect or missing ssn of birth: ' + ssn);
    }
    return ssn;
}

type Fields = { name: unknown, dateOfBirth: unknown, ssn: unknown, occupation: unknown, gender: unknown, entries: [] };

export const toNewPatient = ({ name, dateOfBirth, ssn, occupation, gender, entries }: Fields): NewPatient => {

    const newPatient: NewPatient = {
        name: parseNameOrOccupation(name),
        dateOfBirth: parseDateOfBirth(dateOfBirth),
        ssn: parseSsnNumber(ssn),
        occupation: parseNameOrOccupation(occupation),
        gender: parseGender(gender),
        entries: entries
    }
    return newPatient;

}

// *** OR ***

/*
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const toNewPatient = (object:any): NewPatient => {

    const newPatient: NewPatient = {
        name: parseNameOrOccupation(object.name),
        dateOfBirth: parseDateOfBirth(object.dateOfBirth),
        ssn: parseSsnNumber(object.ssn),
        occupation: parseNameOrOccupation(object.occupation),
        gender: parseGender(object.gender)
    }
    return newPatient;
}
*/


const parseDiagnosisCodes = (diagnosisCodes: unknown): Array<Diagnosis['code']> => {
    if (!diagnosisCodes || !Array.isArray(diagnosisCodes)) {
        return [] as Array<Diagnosis['code']>;
    }
    return diagnosisCodes as Array<Diagnosis['code']>;
};

const parseDischarge = (discharge: any): Discharge => {
    if (!discharge || typeof discharge !== 'object') {
        throw new Error('Discharge property is missing or not an object ' + discharge);
    }
    if (!discharge.date || !isString(discharge.date) || !discharge.criteria || !isString(discharge.criteria)) {
        throw new Error('Date/criteria of discharge is incorrect of missing');
    }
    return discharge as Discharge;
};

export const parseEntryStringValue = (userInput: unknown, objPorperty: string): string => {
    if (!userInput || !isString(userInput)) {
        throw new Error('Incorrect of missing ' + objPorperty);
    }
    return userInput;
}


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isHealthCheckRating = (param: any): param is HealthCheckRating => {
    console.log(Object.values(HealthCheckRating))
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    //console.log('Object.values(HealthCheckRating).includes(Number(param))', Object.values(HealthCheckRating).includes(Number(param)))
    return Object.values(HealthCheckRating).includes(param)
}

export const parseHealthCheckRating = (healthCheckRating: unknown): HealthCheckRating => {
    if (healthCheckRating === undefined || !isHealthCheckRating(healthCheckRating)) {
        throw new Error('Incorrect or missing healthCheckRating: ' + healthCheckRating);
    }
    return healthCheckRating
}

const parseSickLeave = (sickLeave: any): SickLeave | undefined => {
    if (!sickLeave || typeof sickLeave !== 'object') {
        return undefined
    }
    /*
    if (sickLeave && (!sickLeave.startDate || !isString(sickLeave.startDate) || !sickLeave.endDate || !isString(sickLeave.endDate))) {
        throw new Error('Start/end date of sickLeave is incorrect of missing');
    }
    */
    return sickLeave as SickLeave;
};


type NewEntryFields = {
    description: unknown,
    date: unknown,
    specialist: unknown,
    diagnosisCodes?: [],
    type: unknown,
    discharge?: unknown,
    healthCheckRating?: unknown,
    employerName?: unknown,
    sickLeave?: unknown
};

export const toNewEntry = (newEntryFields: NewEntryFields): EntryWithoutId => {

    const { description, date, specialist, type, diagnosisCodes, discharge, healthCheckRating, employerName, sickLeave } = newEntryFields

    let newEntry: any = {
        description: parseEntryStringValue(description, "description"),
        date: parseEntryStringValue(date, "date"),
        specialist: parseEntryStringValue(specialist, "specialist"),
        diagnosisCodes: parseDiagnosisCodes(diagnosisCodes),
        type: parseEntryType(type)
    }
    switch (newEntry.type) {
        case EntryType.Hospital:
            newEntry = {
                ...newEntry,
                discharge: parseDischarge(discharge)
            }
            break;
        case EntryType.HealthCheck:
            newEntry = {
                ...newEntry,
                healthCheckRating: parseHealthCheckRating(healthCheckRating)
            }
            break;
        case EntryType.OccupationalHealthcare:
            newEntry = {
                ...newEntry,
                employerName: parseEntryStringValue(employerName, "employerName"),
                sickLeave: parseSickLeave(sickLeave)
            }
            break;
        default:
            newEntry
            break;
    }
    console.log("toNewEntry: NewEntry:", newEntry)
    return newEntry as EntryWithoutId;
}