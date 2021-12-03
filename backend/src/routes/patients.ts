/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from 'express';
import patientsService from '../services/patientsServices';
import toNewPatientEntry, { assertNever, entryFields } from '../utils';
import {  toNewHospitalEntry, toNewHealthCheckEntry, toNewOccupationalEntry } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
    res.send(patientsService.getPatients());
});

router.get('/:id', (req, res) => {
    const id = req.params.id;
    const patient = patientsService.getPatient(id);
    if(!patient) {
        res.status(400).send('Did not found patient');
    }
    res.send(patient);
});

router.post('/:id/entries', (req, res) => {
    const id = req.params.id;
    const patient = patientsService.getPatient(id);
    if(!patient) {
        res.status(400).send('Did not found patient');
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const entry: entryFields = req.body;
    try {
        if(patient) {
            switch(entry.type) {
                case "Hospital": 
                        const hospitalEntry = toNewHospitalEntry(entry);
                        const addedEntry = patientsService.addEntry(hospitalEntry, patient);
                        res.json(addedEntry);
                        return;
                case "OccupationalHealthcare":
                    const occupationalEntry = toNewOccupationalEntry(entry);
                    const addedEntry2 = patientsService.addEntry(occupationalEntry, patient);
                    res.json(addedEntry2);
                    return;
                case "HealthCheck":
                    const healthCheckEntry = toNewHealthCheckEntry(entry);
                    const addedEntry3 = patientsService.addEntry(healthCheckEntry, patient);
                    res.json(addedEntry3);
                    return;
                default: assertNever(entry);
            }
        }
        res.status(400).send("Did not found patient");
    } catch (error: unknown) {
        let errorMessage = 'Something went wrong.';
        if(error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
        }
        res.status(400).send(errorMessage);
    }
    
});

router.post('/', (req, res) => {
    try {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        const newPatient = toNewPatientEntry(req.body);
        const addedEntry = patientsService.addPatient(newPatient);
        res.json(addedEntry);
    } catch (error: unknown) {
        let errorMessage = 'Something went wrong.';
        if(error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
        }
        res.status(400).send(errorMessage);
    }
});

export default router;