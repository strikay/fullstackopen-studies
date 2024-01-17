import express from 'express';
import parseObject from '../utils';
import patientService from '../services/patientService';

const patientRouter = express.Router();

patientRouter.get("/", (_req, res) => {
    res.json(patientService.getNonSensitivePatients());
});

patientRouter.get("/:id", (req, res) => {
    const id = req.params.id;
    const patient = patientService.getPatientbyId(id);
    if (patient) {
        res.json(patient);
    }else{
        res.sendStatus(404);
    }
});

patientRouter.post("/", (req, res) => {

    try {
        const newPatient = parseObject.toNewPatient(req.body);
        console.log(newPatient);
        const addedPatient = patientService.addPatient(newPatient);
        res.json(addedPatient);
    } catch (error: unknown) {
        let errorMessage = "Something went wrong: ";
        if(error instanceof Error){
            errorMessage += error.message;
        }
        res.status(400).json(errorMessage);
    }
});

patientRouter.post('/:id/entries', (req,res) => {
   
    const id = req.params.id;

    try {
        const newEntry = parseObject.toNewEntry(req.body);
        console.log(newEntry);
        const addedPatient = patientService.addEntry(id, newEntry);
        res.json(addedPatient);
    } catch (error: unknown) {
        let errorMessage = "Something went wrong: ";
        if(error instanceof Error){
            errorMessage += error.message;
        }
        res.status(400).json(errorMessage);
    }

});

export default patientRouter;