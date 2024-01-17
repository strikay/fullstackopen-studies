interface ExerciseResults { 
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number | null,
    ratingDescription: string | null,
    target: number,
    average: number
}

interface ExerciseCalculatorInput {
    exerciseValues: Array<number>,
    targetValue: number
}

const parseArguments = (args: string[]): ExerciseCalculatorInput => {

    const targetValue = Number(args.shift())
    console.log(targetValue)
    if (isNaN(targetValue)) throw new Error("Numeric value is expected");
    
    let exerciseValues: number[] =[]

    for (const duration of args) {
        const exerciseTime = Number(duration)

        if(isNaN(exerciseTime)) throw new Error("Numeric value is expected");
        exerciseValues.push(exerciseTime)  
    }

    return {
        exerciseValues, targetValue
    }
}

const calculateExercises = (exerciseValues: Array<number>, target: number): ExerciseResults => {

    const periodLength = exerciseValues.length
    const trainingDays = (exerciseValues.filter(duration => duration > 0))
    const average = (exerciseValues.reduce((sum, currentValue) => sum+currentValue))/exerciseValues.length
    const success = (average >= target)
    type rating = 1 | 2 | 3 | null
    type ratingDescription = "bad" | "okay" | "great" | null

    let rating : rating = null
    let ratingDescription : ratingDescription = null


    switch (true) {
        case (average<target):
            rating = 1
            ratingDescription = "bad"
            break;
        case (average==target):
            rating = 2
            ratingDescription = "okay"
            break;
        case (average>target):
            rating = 3
            ratingDescription = "great"
            break;
    
        default:
            break;
    }


    return{
        periodLength,
        trainingDays: trainingDays.length,
        success,
        rating,
        ratingDescription,
        target,
        average
    }
}

/* try {
    const {exerciseValues, targetValue} = parseArguments(process.argv)
    console.log(calculateExercises(exerciseValues, targetValue))
    //console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))
} catch (error: unknown) {
    if (error instanceof Error) {
        console.log("Error has occurred"+error.message)
    }
}
 */
export default {
    parseArguments,
    calculateExercises
}