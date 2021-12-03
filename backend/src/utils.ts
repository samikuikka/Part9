import {  Entry, Gender, HealthCheckEntry, HospitalEntry, NewPatientEntry, OccupationalHealthcareEntry} from './types';

export const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const parseString = (str: unknown): string => {
    if(!str || !isString(str)) {
        throw new Error('Incorrect or missing string');
    }

    return str;
};

const isName = (name: unknown): name is string => {
    if(!name || !isString(name) ||  name.length < 1) return false;

    if(name[0].toUpperCase() !== name[0]) return false;
    return true;
};

const parseName = (name: unknown): string => {
    if(!name || !isString(name) || !isName(name) ) {
        throw new Error('Incorrect or missing name');
    }
    return name;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};
  
const parseDateOfBirth = (date: unknown): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date: ' + date);
    }
    return date;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Object.values(Gender).includes(param);
};

const parseGender = (gender: unknown): Gender => {
    if(!gender || !isGender(gender)) {
        throw new Error('Incorrect or missing gender ' + gender);
    }
    return gender;
};

const parseEntry = (entries: Array<Entry>): Array<Entry> => {
    if(!entries.some( entry => ['Hospital', 'OccupationalHealthcare', 'HealthCheck'].includes(entry.type))) {
        throw new Error('Wrong entry type');
    }
    return entries;
};

type Fields = { name : unknown, dateOfBirth: unknown, ssn: unknown, gender: unknown, occupation: unknown, entries: Array<Entry>};

const toNewPatientEntry = ({name, dateOfBirth, ssn, gender, occupation, entries } : Fields): NewPatientEntry => {
    const newEntry: NewPatientEntry = {
        name: parseName(name),
        dateOfBirth: parseDateOfBirth(dateOfBirth),
        ssn: parseString(ssn),
        gender: parseGender(gender),
        occupation: parseString(occupation),
        entries: parseEntry(entries)
    };

    return newEntry;
};

export type hospitalFields = Omit<HospitalEntry, 'id'>;
export type healthCheckFields = Omit<HealthCheckEntry, 'id'>;
export type occupationalFields = Omit<OccupationalHealthcareEntry, 'id'>;

export type entryFields = hospitalFields | healthCheckFields | occupationalFields;

export const toNewHospitalEntry = ({description, date, specialist, diagnosisCodes, type, discharge}: hospitalFields) => {
  const newEntry: hospitalFields = {
    description: parseString(description),
    date: parseString(date),
    specialist: parseString(specialist),
    diagnosisCodes: diagnosisCodes,
    type: type,
    discharge: discharge
  } ;
  return newEntry;
};

export const toNewOccupationalEntry = ({description, date, specialist, diagnosisCodes, type, employerName, sickLeave}: occupationalFields) => {
    const newEntry: occupationalFields = {
        description: parseString(description),
        date: parseString(date),
        specialist: parseString(specialist),
        diagnosisCodes: diagnosisCodes,
        type: type,
        employerName: parseString(employerName),
        sickLeave: sickLeave
    };
    return newEntry;
};

export const toNewHealthCheckEntry = ({description, date, specialist, diagnosisCodes, type, healthCheckRating}: healthCheckFields) => {
    const newEntry: healthCheckFields = {
        description: parseString(description),
        date: parseString(date),
        specialist: parseString(specialist),
        diagnosisCodes: diagnosisCodes,
        type: type,
        healthCheckRating: healthCheckRating
    };
    return newEntry;
};



export default toNewPatientEntry;