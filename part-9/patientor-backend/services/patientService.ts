import patientsData from '../data/patients'

import { Patient, NewPatient, PaitentSsnExcluded } from '../types/types';
import { v4 as uuidv4 } from 'uuid';

const patients: Array<Patient> = patientsData as Array<Patient>


// you can use Array<Patient> OR Patient[]
const getPatients = (): Array<Patient> => {
    return patients;
}

const getPatientsSsnExcluded = (): Array<PaitentSsnExcluded> => {

    /* The long way
    return patients.map(({id, name, dateOfBirth, gender, occupation}) => ({id, name, dateOfBirth, gender, occupation}))
    */

    // Exclued ssn property and return the rest properties of patient objects
    return patients.map(({ ssn, ...rest }) => rest)

}

const getPatientById = (id: string): Array<Patient> => {

    return patients.filter((p: Patient) => p.id === id.toString())
}

const getPatientByIdSsnExcluded = (id: string): Array<PaitentSsnExcluded> => {

    return patients.filter((p: Patient) => p.id === id.toString())
}

const addPatient = (newPatientEntry: NewPatient): Patient => {

    const uniqueId = uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'

    const newPatient = {
        id: uniqueId,
        ...newPatientEntry
    }
    //patientsData.push(newPatient)
    //console.log(patientsData)
    patients.push(newPatient)
    return newPatient;
}






export default {
    getPatients,
    getPatientById,
    getPatientsSsnExcluded,
    getPatientByIdSsnExcluded,
    addPatient
}