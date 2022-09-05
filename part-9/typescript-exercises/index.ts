
/*
 A good rule of thumb is to try importing a module using the import statement first.
 If import does not work, try a combined method:
 import express = require('express');
*/

import express, { Request, Response } from 'express';
import { calculateBmi } from './bmiCalculator';
import { DailyExercises, calculateExercises, Result } from './exerciseCalculator';

const app = express();
app.use(express.json());



app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});


app.get('/bmi', (req, res) => {

    const height: number | undefined = Number(req.query.height);
    const weight: number | undefined = Number(req.query.weight);

    if (!height || !weight) {
        return res.status(400).send({ Error: 'Height or weight is missing!' });
    }

    if (isNaN(height) || isNaN(weight)) {
        return res.status(400).send({ Error: 'Provided height or weight was not a number!' });
    }

    const bmi: string = calculateBmi(height, weight);

    return res.status(200).send({ height: height, weight: weight, bmi: bmi });
});




app.post('/exercises', (req: Request, res: Response) => {

    const { body } = req;

    try {

        if (!body.target || !body.daily_exercises) {
            return res.status(400).json({ error: "parameters missing" });
        }

        if (isNaN(Number(body.target))) {
            return res.status(400).json({ error: "malformatted parameters" });
        }

        let dailyExerciseHoursArray: Array<number> = [];

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        body.daily_exercises.map((item: any) => {

            if (isNaN(Number(item))) {
                return res.status(400).json({
                    error: "malformatted parameters"
                });
            } else {
                dailyExerciseHoursArray = [...dailyExerciseHoursArray, Number(item)];
            }
            return;
        });

        const dailyExercises: DailyExercises = {
            target: body.target,
            dailyExerciseHours: dailyExerciseHoursArray
        };


        const result: Result = calculateExercises(dailyExercises.target, dailyExercises.dailyExerciseHours);

        return res.status(200).json(result);

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }

});




const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});