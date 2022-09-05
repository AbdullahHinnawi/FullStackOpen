import express, { Request, Response } from 'express'
import diagnoseService from '../services/diagnoseService';


const diagnoseRouter = express.Router()

diagnoseRouter.get('/', (_req: Request, res: Response) => {

    res.status(200).send(diagnoseService.getDiagnoses())
})

export default diagnoseRouter;