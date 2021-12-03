import patientsData from '../../data/patients';
import { PatientsEntry, NewPatientEntry} from '../types';
import {v1 as uuid} from 'uuid';
import { healthCheckFields, hospitalFields, occupationalFields } from '../utils';

const patients:  Array<PatientsEntry> = patientsData ;

const getPatients = (): Pick<PatientsEntry, 'id' | 'name' | 'dateOfBirth' | 'gender' | 'occupation' | 'entries'>[] => {
    return patients.map( ({id, name, dateOfBirth, gender, occupation, entries}) => ({ id, name, dateOfBirth, gender, occupation, entries}));
};

const getPatient = (id: string): PatientsEntry | undefined => {
  const patient = patients.find(p => p.id  === id);
  return patient;
};

const addHospitalEntry = (entry: hospitalFields, patient: PatientsEntry) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  const id = uuid();
  const newEntry = {
    id: id,
    ...entry
  };
  patient.entries.push(newEntry);
  patients.map(p => {
    if(p.id === patient.id) {
      return patient;
    }
    return p;
  });
  return patient;
};

const addEntry = (entry: hospitalFields | occupationalFields | healthCheckFields, patient: PatientsEntry) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  const id = uuid();
  const newEntry = {
    id: id,
    ...entry
  };
  patient.entries.push(newEntry);
  patients.map(p => {
    if(p.id === patient.id) {
      return patient;
    }
    return p;
  });
  return newEntry;
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
    addHospitalEntry,
    addEntry,
    addPatient
};