export interface Result {
    periodlength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}

export interface DailyExercises {
    target: number,
    dailyExerciseHours: Array<number>
}

const parseArguments = (args: Array<string>): DailyExercises => {

    let dailyExerciseHoursArray: Array<number> = [];

    if (args.length < 4) throw new Error('Not enough arguments');

    if (isNaN(Number(args[2]))) {
        throw new Error(`Provided target is not a number!`);
    }

    for (let i = 3; i < args.length; i++) {

        if (isNaN(Number(args[i]))) {
            throw new Error(`Provided argument ${args[i]} is not a number!`);
        } else {
            dailyExerciseHoursArray = [...dailyExerciseHoursArray, Number(args[i])];
        }
    }

    return {
        target: Number(args[2]),
        dailyExerciseHours: dailyExerciseHoursArray,

    };
};


export const calculateExercises = (target: number, dailyExerciseHours: Array<number>): Result => {

    const average: number = dailyExerciseHours.reduce((a, b) => a + b) / dailyExerciseHours.length;
    const nonTrainingDays: number = dailyExerciseHours.filter((item: number) => item === 0).length;
    const trainingDays: number = dailyExerciseHours.length - nonTrainingDays;
    let rating: number;
    let ratingDesc: string;

    if (average / target >= 1) {
        rating = 3;
        ratingDesc = "Great!";
    } else if (average / target > 0.8) {
        rating = 2;
        ratingDesc = "Very Good!";
    } else if (average / target > 0.5) {
        rating = 2;
        ratingDesc = "Good!";
    } else {
        rating = 1;
        ratingDesc = "Bad! Try to do better.";
    }

    return {
        periodlength: dailyExerciseHours.length,
        trainingDays: trainingDays,
        success: average < target ? false : true,
        rating: rating,
        ratingDescription: ratingDesc,
        target: target,
        average: average
    };
};

try {
    const { target, dailyExerciseHours } = parseArguments(process.argv);

    console.log("target: ", target);
    console.log("dailyExerciseHours: ", dailyExerciseHours);
    console.log(calculateExercises(target, dailyExerciseHours));
} catch (error: unknown) {
    let errorMessage = 'Something bad happened.';
    if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
}