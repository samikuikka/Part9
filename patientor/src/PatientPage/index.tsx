import React, { useEffect } from "react";
import {
    useParams
  } from "react-router-dom";
import { PatientParams, Patient } from "../types";
import { useStateValue, setPatient } from "../state";
import axios from "axios";
import { apiBaseUrl } from "../constants";
import GenderIcon from "../components/GenderIcon";

//import { Icon } from 'semantic-ui-react';

const PatientPage = () => {
    const { id } = useParams<PatientParams>();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [ {patient}, dispatch] = useStateValue();
    
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

    if(!patient) {
        return(
            <div>
                error
            </div>
        );
    }


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
            
            
            
        </div>
    );
};

export default PatientPage;