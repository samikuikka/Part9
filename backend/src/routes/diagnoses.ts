import express from 'express';
import diagnosesService from '../services/diagnosesServices';

const router = express.Router();

router.get('/', (_req, res) => {
    res.send(diagnosesService.getEntries());
});

export default router;
