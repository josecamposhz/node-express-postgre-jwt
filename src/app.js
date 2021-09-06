import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
require('dotenv').config();

const app = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('tiny'));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

import apiRouter from './routes';
app.use('/api/v1', apiRouter);

app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), () => {
  console.log(`Example app listening at http://localhost:${app.get('port')}`);
});
