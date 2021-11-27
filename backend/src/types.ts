
export enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other'
}
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Entry {
}

export interface PatientsEntry {
    id: string,
    name: string,
    dateOfBirth: string,
    ssn: string,
    gender: Gender,
    occupation: string,
    entries: Array<Entry>
}


export type PublicPatient = Omit<PatientsEntry, 'ssn' | 'entries' >;

export type NewPatientEntry = Omit<PatientsEntry, | 'id'>;

export interface DiagnosisEntry {
    code: string,
    name: string,
    latin?: string
}

