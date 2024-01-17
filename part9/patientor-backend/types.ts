export interface Diagnosis {
        "code": string,
        "name": string,
        "latin"?: string
}

interface BaseEntry {
    id: string;
    description: string,
    date: string;
    specialist: string;
    diagnosisCodes?: Array<Diagnosis['code']>;
  }
  
  export interface HospitalEntry extends BaseEntry{
    discharge: {
      date: string,
      criteria: string
    },
    type: "Hospital"
  }
  
  export interface OccupationalHealthCareEntry extends BaseEntry {
    employerName: string,
    sickLeave?: {
      startDate: string,
      endDate: string
    },
    type: "OccupationalHealthcare"
  }

  export enum HealthCheckRating {
    "Healthy" = 0,
    "LowRisk" = 1,
    "HighRisk" = 2,
    "CriticalRisk" = 3
  }
  
 export interface HealthCheckEntry extends BaseEntry {
    type: "HealthCheck";
    healthCheckRating: HealthCheckRating;
  }
  
export type Entry = HospitalEntry | OccupationalHealthCareEntry | HealthCheckEntry;
  

export interface Patient {
    "id": string,
    "name": string,
    "dateOfBirth": string,
    "ssn": string,
    "gender": Gender,
    "occupation": string,
    "entries": Entry[]
}

export enum Gender{
    Male = "male",
    Female = "female",
    Other = "other"
}

export type NonSensitivePatient = Omit<Patient, 'ssn' | 'entries'>;

export type NewPatient = Omit<Patient, 'id' >;
type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;
// Define Entry without the 'id' property
export type NewEntry = UnionOmit<Entry, 'id'>;