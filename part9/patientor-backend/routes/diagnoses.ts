import express from 'express';
import diagnosisService from '../services/diagnosisService';

const diagnosisRouter =  express.Router();

diagnosisRouter.get("/", (_req, res) => {
    res.json(diagnosisService.getEntries());
});

export default diagnosisRouter;