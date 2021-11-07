import patientsData from '../../data/patients.json';
import { PatientsEntry} from '../types';

const patients:  Array<PatientsEntry> = patientsData as Array<PatientsEntry>;

const getPatients = (): Pick<PatientsEntry, 'id' | 'name' | 'dateOfBirth' | 'gender' | 'occupation'>[] => {
    return patients.map( ({id, name, dateOfBirth, gender, occupation}) => ({ id, name, dateOfBirth, gender, occupation}));
};

export default {
    getPatients
};