interface BmiValues {
    height:number
    weight:number
}

export const parseArguments = (args: string[]): BmiValues => {

    const height = Number(args[0])
    const weight = Number(args[1])

    if(isNaN(height) || isNaN(weight)) {
        throw new Error("Only number values must be passed")
    }

    return {
        height, weight
    }

}
export const calculateBmi = (height:number, weight:number) => {
    const heightInMetres = height/100

    const bodyMassIndex = (weight/(heightInMetres**2))

    switch (true) {
        case (bodyMassIndex < 25):
            return "Normal (Healthy Weight)"

        case (bodyMassIndex > 25 && bodyMassIndex < 29):
            return "Overweight (Unhealthy Weight)"

        case (bodyMassIndex >= 30):
                return "Obese (Unhealthy Weight)"
    
        default:
                return "Something went wrong"
    }
}


/* export const bmiCalculator = (height: number, weight: number): string => {
    //const bmiArgs = [height, weight]
    let bmiResult = ""

    try {
        //const {height, weight} = parseArguments(bmiArgs)
        bmiResult = calculateBmi(height,weight)
    } catch (error: unknown) {
        if (error instanceof Error) {
        return "Error has occurred"+error.message
        }
    }

    return bmiResult
} */

export default {
    parseArguments,
    calculateBmi
}