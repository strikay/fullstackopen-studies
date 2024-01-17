import { Diagnosis, Gender, HealthCheckEntry, HealthCheckRating, HospitalEntry, NewEntry, NewPatient, OccupationalHealthCareEntry } from "./types";

const isString = (text: unknown): text is string => {
    return text instanceof String || typeof text === 'string' ;
};

const isNumber = (num: unknown): num is number => {
    const number = Number(num);
    return !isNaN(number) ;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

const isGender = (params: string): params is Gender => {
    return Object.values(Gender).map(g => g.toString()).includes(params);
};

const isHealthCheckRating = (params: number): params is HealthCheckRating => {
    return Object.values(HealthCheckRating).map(g => Number(g)).includes(params);
};

const parseString = (text: unknown): string => {
    if(!text || !isString(text)){
        throw new Error(`Incorrect type. Must be of type string: ${text}`);
    }
    return text;
};

const parseGender = (text: unknown): Gender => {
    if(!text || !isString(text) || !isGender(text)){
        throw new Error("Incorrect data type. Must be of type string");
    }

    return text;
};

const parseHealthCheckRating = (num: unknown): HealthCheckRating => {
    
    if(num === undefined || !isNumber(num) || !isHealthCheckRating(num)){
        throw new Error(`Incorrect healthRatingValue. Must be a number between 1 and 4: ${num}}`);
    }
    return num;
};

const parseDate = (date: unknown): string => {
    if(!date || !isString(date) || !isDate(date)){
        throw new Error(`Incorrect value. Must be a date or date formmatted string: ${date}`);
    }
    return date;
};

const parseDischarge = (discharge: unknown): {date: string, criteria: string} => {
    if(!discharge || typeof discharge !== 'object'){
        throw new Error(`Wrong discharge Information. Must containe both date and criteria`);
    }

    
    if('date' in discharge && 'criteria' in discharge){
        if(!discharge.date){
            throw new Error(`Wrong discharge dates`);
        }
        if(!discharge.criteria){
            throw new Error(`Wrong discharge criteria`);
        }

        try {
            return {
                date: parseDate(discharge.date), 
                criteria: parseString(discharge.criteria)
            };
        } catch (error) {
            if (error instanceof Error) {
                const errorMessage = error.message;
                throw new Error("On discharge information " + errorMessage);
            }
        }
    }

    throw new Error("Wrong Data");
};

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis['code']> =>  {
    if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
      // we will just trust the data to be in correct form
      return [] as Array<Diagnosis['code']>;
    }
  
    return object.diagnosisCodes as Array<Diagnosis['code']>;
  };

const toNewPatient = (object: unknown): NewPatient => {
    console.log(object);
    if(!object || typeof object !== 'object'){
        throw new Error("Incorrect or missing data");
    }
    if ('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object){
        const newPatient: NewPatient = {
            name: parseString(object.name),
            dateOfBirth: parseDate(object.dateOfBirth),
            ssn: parseString(object.ssn),
            gender: parseGender(object.gender),
            occupation: parseString(object.occupation),
            entries: []
        };

        return newPatient;
    }
    throw new Error ("Incorrect data: Some fields are missing");
};

const toNewEntry = (object: unknown): NewEntry => {
    console.log(object);
    if(!object || typeof object !== 'object') {
        throw new Error('Error, missing data');
    }
    if('description' in object && 'date' in object && 'specialist' in object && 'diagnosisCodes' in object && 'type' in object){
        const generalEntry = {
            description: parseString(object.description),
            date: parseDate(object.date),
            specialist: parseString(object.specialist),
            diagnosisCodes: parseDiagnosisCodes(object),
        };

        if('discharge' in object) {
            const newEntry: Omit<HospitalEntry, 'id'> = {
                ...generalEntry,
                type: "Hospital",
                discharge: parseDischarge(object.discharge)
            };
            return newEntry;
        }

        if('healthCheckRating' in object) {
            const newEntry: Omit<HealthCheckEntry, 'id'> = {
                ...generalEntry,
                type: "HealthCheck",
                healthCheckRating: parseHealthCheckRating(object.healthCheckRating)
            };
            return newEntry;
        }

        if('employerName' in object) {
            const newEntry: Omit<OccupationalHealthCareEntry, 'id'> = {
                ...generalEntry,
                type: "OccupationalHealthcare",
                employerName: parseString(object.employerName)
            };
            if('sickLeave' in object) {
                const sickLeave:unknown = object.sickLeave;
                if(!sickLeave || typeof sickLeave !== 'object' || (!('startDate' in sickLeave) || !('endDate' in sickLeave))){
                    throw new Error('Wrong SickLeave information');
                }
                
                
                try{
                    newEntry.sickLeave = {
                        startDate: parseDate(sickLeave.startDate),
                        endDate: parseDate(sickLeave.endDate)
                    };
                } catch (error) {
                    if(error instanceof Error){
                        throw new Error("On SickLeave information " + error.message);
                    }
                }

            }
            return newEntry;
        }
        
    }
    throw new Error ("Incorrect data: Some fields are missing");
};

export default {toNewPatient, toNewEntry};