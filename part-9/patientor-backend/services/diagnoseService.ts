import diagnoses from '../data/diagnoses.json'

import { Diagnose } from '../types/types';


const getDiagnoses = (): Array<Diagnose> => {
    return diagnoses;
}


export default {
    getDiagnoses,
}