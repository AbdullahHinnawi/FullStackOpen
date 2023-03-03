import diagnoses from '../data/diagnoses.json'

import { Diagnosis } from '../types/types';


const getDiagnoses = (): Array<Diagnosis> => {
    return diagnoses;
}


export default {
    getDiagnoses,
}