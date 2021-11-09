
export enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other'
}

export interface PatientsEntry {
    id: string,
    name: string,
    dateOfBirth: string,
    ssn: string,
    gender: Gender,
    occupation: string
}

export type NewPatientEntry = Omit<PatientsEntry, | 'id'>;

export interface DiagnosisEntry {
    code: string,
    name: string,
    latin?: string
}

