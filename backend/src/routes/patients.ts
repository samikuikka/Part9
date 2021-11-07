import express from 'express';
import patientsService from '../services/patientsServices';

const router = express.Router();

router.get('/', (_req, res) => {
    res.send(patientsService.getPatients());
});

export default router;