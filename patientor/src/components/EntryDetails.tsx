import React from 'react';
import { Entry, Diagnosis } from '../types';
import axios from 'axios';
import { setDiagnoses, useStateValue } from '../state';
import HospitalEntryInfo from './HospitalEntryInfo';
import { apiBaseUrl } from '../constants';
import OccupationalHealthcareInfo from './OccupationalHealthCareInfo';
import HealthCheckInfo from './HealthCheckInfo';

const EntryDetails: React.FC<{entry: Entry}> = ({ entry }) => {

    const [ {diagnoses}, dispatch] = useStateValue();

    const assertNever = (value: never): never => {
        throw new Error(
          `Unhandled discriminated union member: ${JSON.stringify(value)}`
        );
      };

      React.useEffect( () => {
        
        const fetchDiagnoses = async () => {
            try {
                const { data: diagnosesFromApi } = await axios.get<Diagnosis[]>(`${apiBaseUrl}/diagnoses`);
                dispatch(setDiagnoses(diagnosesFromApi));
            } catch(error) {
                console.error(error);
            }
        };
        void fetchDiagnoses();

    }, [dispatch]);

    if(Object.keys(diagnoses).length === 0) return null;
    
    switch(entry.type) {
        case "Hospital":
            return <HospitalEntryInfo entry={entry} diagnoses={diagnoses} />;
        case "OccupationalHealthcare":
            return <OccupationalHealthcareInfo entry={entry} diagnoses={diagnoses} />;
        case "HealthCheck":
            return <HealthCheckInfo entry={entry} diagnoses={diagnoses} />;
        default:
            return assertNever(entry);
    }
};

export default EntryDetails;