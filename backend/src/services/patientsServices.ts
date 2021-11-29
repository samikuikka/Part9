import patientsData from '../../data/patients';
import { PatientsEntry, NewPatientEntry} from '../types';
import {v1 as uuid} from 'uuid';

const patients:  Array<PatientsEntry> = patientsData as Array<PatientsEntry>;

const getPatients = (): Pick<PatientsEntry, 'id' | 'name' | 'dateOfBirth' | 'gender' | 'occupation' | 'entries'>[] => {
    return patients.map( ({id, name, dateOfBirth, gender, occupation, entries}) => ({ id, name, dateOfBirth, gender, occupation, entries}));
};

const getPatient = (id: string): PatientsEntry | undefined => {
  const patient = patients.find(p => p.id  === id);
  return patient;
};

const addPatient = ( entry: NewPatientEntry ): PatientsEntry => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    const id = uuid();
    const newEntry = {
      id: id,
      ...entry
    };
  
    patients.push(newEntry);
    return newEntry;
  };

export default {
    getPatients,
    getPatient,
    addPatient
};