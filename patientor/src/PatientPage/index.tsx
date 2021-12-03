import React, { useEffect } from "react";
import {
    useParams
  } from "react-router-dom";
import { PatientParams, Patient, Diagnosis, Entry } from "../types";
import { useStateValue, setPatient, setDiagnoses, addEntry } from "../state";
import axios from "axios";
import { apiBaseUrl } from "../constants";
import GenderIcon from "../components/GenderIcon";
import EntryDetails from "../components/EntryDetails";
import AddEntryModal from "../AddEntryModal";
import { Button } from "semantic-ui-react";
import { HospitalEntryValues } from "../AddEntryModal/AddHospitalEntry";

//import { Icon } from 'semantic-ui-react';

const PatientPage = () => {
    const { id } = useParams<PatientParams>();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [ {patient, diagnoses}, dispatch] = useStateValue();
    
    const [ modalOpen, setModalOpen] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string | undefined>();


    const openModal = (): void => setModalOpen(true);
    const closeModal = (): void => {
        setModalOpen(false);
        setError(undefined);
    };

    const submitNewEntry = async (values: HospitalEntryValues) => {
        try {
            const { data: newEntry } = await axios.post<Entry>(`${apiBaseUrl}/patients/${id}/entries`,values);
            console.log('entry ksajkasjd', newEntry);
            dispatch(addEntry(newEntry));
            closeModal();
        } catch(e) {
            console.error("ERROR! ", e);
            setError(e.response?.data?.error || "Unknown error");
        }

    };

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
                loading...
            </div>
        );
    }

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
            <AddEntryModal
                modalOpen={modalOpen}
                onSubmit={submitNewEntry}
                onClose={closeModal}
                error={error}
            />
            <Button onClick={() => openModal()}>Add New Entry</Button>
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