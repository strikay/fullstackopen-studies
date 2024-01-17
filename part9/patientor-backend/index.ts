import express from 'express';
import cors = require('cors');

import patientRouter from './routes/patients';
import diagnosisRouter from './routes/diagnoses';

const app = express();
app.use(express.json());
app.use(cors());
app.get('/api/ping', (_req, res) => {
    res.send('pong');
});

app.use('/api/diagnoses', diagnosisRouter);
app.use('/api/patients', patientRouter);

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Started server on port ${PORT}`);
});