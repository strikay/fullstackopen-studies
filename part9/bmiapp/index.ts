import express from "express"
const app = express()
import url from 'url';
import bmiCalculator from "./bmiCalculator";
import exerciseCalculator from "./exerciseCalculator";

interface BmiResponse {
    height: string,
    weight: string,
    bmi: string
}

app.use(express.json())
app.get("/bmi", (req, res) => {
    const q = url.parse(req.url, true).query;
    let bmi: string = "";

    if(!q.height || !q.weight){
        res.status(400).json({
            error: "malformatted parameters"
        })
    } 

    try {
        const {height, weight} = bmiCalculator.parseArguments([q.height as string, q.weight as string])
        bmi = bmiCalculator.calculateBmi(height, weight)
    } catch (error: unknown) {
        if(error instanceof Error) console.log(error.message)
        res.status(400).json({
            error: "malformatted parameters"
        })
    }

    const response: BmiResponse = {
        height: q.height as string,
        weight: q.weight as string,
        bmi
    }

    res.json(response)
})

app.post("/exercises", (req, res) => {
    const { daily_exercises, target }  = req.body

    try {
        
        const {exerciseValues, targetValue} = exerciseCalculator.parseArguments([target, ...daily_exercises])
        const exerciseResults =  exerciseCalculator.calculateExercises(exerciseValues, targetValue)
        console.log(exerciseResults)
        res.json(exerciseResults)

    } catch (error: unknown) {
        if (error instanceof Error ) {
            res.status(400).json({
                error: "maformatted paramters"
            })
        }
    }
})

const PORT = 3002
app.listen(PORT, ()=>{
    console.log(`Server started at ${PORT}`)
})