import React, { useEffect } from "react";
import {
    useParams
  } from "react-router-dom";
import { PatientParams, Patient, Diagnosis } from "../types";
import { useStateValue, setPatient, setDiagnoses } from "../state";
import axios from "axios";
import { apiBaseUrl } from "../constants";
import GenderIcon from "../components/GenderIcon";
import EntryDetails from "../components/EntryDetails";

//import { Icon } from 'semantic-ui-react';

const PatientPage = () => {
    const { id } = useParams<PatientParams>();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [ {patient, diagnoses}, dispatch] = useStateValue();
    
    useEffect( () => {
        async function getPatient() {
            if(!patient || patient.id !== id) {
                try {
                    const {data: newPatient } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
                    dispatch(setPatient(newPatient));
                    
                } catch(error) {
                    console.error("error");
                }
            }
        }
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        getPatient();
    }, [patient]
    );

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

    if(!patient) {
        return(
            <div>
                error
            </div>
        );
    }

    //if diagnoses not loaded use this format
    if(Object.keys(diagnoses).length === 0) {
        return (
            <div>
                <h1>{patient.name} 
                  <GenderIcon gender={patient.gender as string}/>
                </h1>
                <p>
                    ssn: {patient.ssn ? patient.ssn : "undefined"} <br/>
                    occupation: {patient.occupation} <br/>
                    date of birth: {patient.dateOfBirth} <br/>
                    id: {patient.id}
                </p>
                <h2>entries</h2>
                    {patient.entries.map( entry => {
                        return (
                            <div key={entry.id}>
                                {entry.date} {entry.description}
                                <ul>
                                    {entry.diagnosisCodes
                                        ? entry.diagnosisCodes.map( code => <li key={code}>{code} </li>)
                                        : null }
                                </ul>
                            </div>
                            
                        );
                    })}
            </div>
        );
    }

    /*
    <h2>entries</h2>
                {patient.entries.map( entry => {
                    return (
                        <div key={entry.id}>
                            {entry.date} {entry.description}
                            <ul>
                                {entry.diagnosisCodes
                                    ? entry.diagnosisCodes.map( code => <li key={code}>{code} {diagnoses[code].name}</li>)
                                    : null }
                            </ul>
                        </div>
                        
                    );
                })}
        </div>*/

    // diagnoses and patient info both loaded
    return (
        <div>
            <h1>{patient.name} 
              <GenderIcon gender={patient.gender as string}/>
            </h1>
            <p>
                ssn: {patient.ssn ? patient.ssn : "undefined"} <br/>
                occupation: {patient.occupation} <br/>
                date of birth: {patient.dateOfBirth} <br/>
                id: {patient.id}
            </p>
            <h2>entries</h2>
            { patient.entries.map( entry => {
                return (
                    <EntryDetails key={entry.id} entry={entry} />
                );
            })}
            
        </div>
    );
};

export default PatientPage;