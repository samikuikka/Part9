import patientsData from '../../data/patients.json';
import { PatientsEntry, NewPatientEntry} from '../types';
import {v1 as uuid} from 'uuid';

const patients:  Array<PatientsEntry> = patientsData as Array<PatientsEntry>;

const getPatients = (): Pick<PatientsEntry, 'id' | 'name' | 'dateOfBirth' | 'gender' | 'occupation'>[] => {
    return patients.map( ({id, name, dateOfBirth, gender, occupation}) => ({ id, name, dateOfBirth, gender, occupation}));
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
    addPatient
};