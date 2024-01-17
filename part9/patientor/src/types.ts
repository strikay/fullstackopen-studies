export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}

interface BaseEntry {
  id: string;
  description: string,
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis['code']> | undefined;
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

interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

export type Entry = HospitalEntry | OccupationalHealthCareEntry | HealthCheckEntry;

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries: Entry[]
}

export type PatientFormValues = Omit<Patient, "id" | "entries">;

export type HealthCheckEntryFormValues = Omit<HealthCheckEntry, 'id'>;

type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;
// Define Entry without the 'id' property
export type EntryFormValues = UnionOmit<Entry, 'id'>;