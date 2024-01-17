import express from 'express';
import { calculator } from './calculator';
const app = express();
app.use(express.json());

app.get('/ping', (req, res) => {
  res.send('pong');
});

app.post('/calculate', (req, res) => {
    const { value1, value2, op } = req.body;
  
    const result = calculator(value1, value2, op);
    res.send({ result });
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});