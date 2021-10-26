import express from 'express';
const app = express();
import { calculateBmi } from './bmiCalculator'

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack');
});

app.get('/bmi', (req, res) => {
    const args = req.query

    if(!args.height || !args.weight || isNaN(Number(args.height)) || isNaN(Number(args.weight))) {
       res.json({ error: "malformatted parameters"})
       return
    }

    const bmi = calculateBmi(Number(args.height), Number(args.weight))

    const result = {
        weight: Number(args.weight),
        height: Number(args.height),
        bmi: bmi
    }

    res.json(result)
})

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});