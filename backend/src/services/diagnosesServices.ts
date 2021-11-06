import diagnosesData from '../../data/diagnoses.json';
import { DiagnosisEntry } from '../types';

const diagnoses: Array<DiagnosisEntry> = diagnosesData as Array<DiagnosisEntry>;

const getEntries = (): DiagnosisEntry[] => {
    return diagnoses;
};

export default {
    getEntries
};