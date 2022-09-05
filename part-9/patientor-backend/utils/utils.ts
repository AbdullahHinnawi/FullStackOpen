import { EntryType } from './../types/types';
import { NewPatient, Gender } from '../types/types';

export const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
}

export const parseNameOrOccupation = (userInput: unknown): string => {
    if (!userInput || !isString(userInput)) {
        throw new Error('Incorrect of missing name');
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
        throw new Error('Incorrect or missing gender: ' + entryType);
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