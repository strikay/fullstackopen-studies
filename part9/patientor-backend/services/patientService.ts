import patients from "../data/patients-full";
import { Entry, NewEntry, NewPatient, NonSensitivePatient, Patient } from "../types";
import {v1 as uuid} from 'uuid';

const getPatients = (): Patient[] => {
    return patients;
};

const getNonSensitivePatients = (): NonSensitivePatient[] => {
    return patients;
};

const getPatientbyId = (id: string): Patient | undefined => {
    return patients.find(p => p.id === id);
};

const addPatient = (entry: NewPatient ): Patient =>{
    const patient = {
        id: uuid(),
        ...entry,
        entries: []
    };
    patients.push(patient);
    return patient;
};

const addEntry = (patientId: string, newEntry: NewEntry): Entry => {
    const patient = getPatientbyId(patientId);
    const entry = {
        id: uuid(),
        ...newEntry
    };
    patient?.entries.push(entry);
    return entry;
};

export default {
    getPatients,
    getNonSensitivePatients,
    addPatient,
    getPatientbyId,
    addEntry
};