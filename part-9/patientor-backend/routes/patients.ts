
import express, { Request, Response } from 'express'
import patientService from '../services/patientService';
import { toNewPatient } from '../utils/utils';

const patientRouter = express.Router()

patientRouter.get('/', (_req: Request, res: Response) => {

    res.status(200).send(patientService.getPatientsSsnExcluded())
})

patientRouter.get('/:id', (req: Request, res: Response) => {

    const { id } = req.params;

    const result = patientService.getPatientById(id)

    res.status(200).send(result[0])
})


patientRouter.post('/', (req: Request, res: Response) => {

    try {
        const newPatient: any = toNewPatient(req.body)
        const addedPatient = patientService.addPatient(newPatient)
        res.status(201).json(addedPatient)
    } catch (error: unknown) {
        let errorMessage = "Something went wrong."
        if (error instanceof Error) {
            errorMessage += ' Error: ' + error.message;
        }
        res.status(400).send(errorMessage);
    }
})


// Works without proofing requests or validating body properties
/*
patientRouter.post('/', (req: Request, res: Response) => {
    // eslint-disable @typescript-eslint/no-unsafe-assignment
    const { name, dateOfBirth, ssn, gender, occupation } = req.body;
    const newPatient = patientService.addPatient({ name, dateOfBirth, ssn, gender, occupation });
    res.json(newPatient);

})
*/

export default patientRouter;